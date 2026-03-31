import { ethers } from 'ethers'

// ABIs (simplified — use full ABI in production from artifacts)
const FACTORY_ABI = [
  'function registerWork(string,string,string,uint8,address[],string[],uint8[],uint8[]) returns (address)',
  'function distributeMultiple(string[],uint256[],string) payable',
  'function workByISRC(string) view returns (address)',
  'function getWorkCount() view returns (uint256)',
  'event WorkRegistered(string indexed,address indexed,string,address,uint256)',
]

const WORK_ABI = [
  'function distribute(string) payable',
  'function getRecipients() view returns (tuple(address,string,uint8,uint8)[])',
  'function metadata() view returns (string,string,string,uint8,uint256,bool)',
  'function totalDistributed() view returns (uint256)',
  'event RightsDistributed(address indexed,uint256,uint256,string)',
  'event RecipientPaid(address indexed,string,uint256,uint8)',
]

const FACTORY_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS!
const RPC_URL = process.env.POLYGON_RPC_URL!
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY!

// MAD to MATIC conversion rate (update via oracle in production)
const MAD_TO_MATIC = 0.00082 // approximate

function getProvider() {
  return new ethers.JsonRpcProvider(RPC_URL)
}

function getSigner() {
  const provider = getProvider()
  return new ethers.Wallet(PRIVATE_KEY, provider)
}

function getFactory(signer?: ethers.Signer) {
  return new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer ?? getProvider())
}

// ── Register a work on-chain ──────────────────────────────────────────────────

export interface WorkRegistrationParams {
  title: string
  isrc: string
  iswc?: string
  territory: number // 0=MA, 1=DZ, 2=TN, 255=GLOBAL
  splits: Array<{
    wallet: string
    name: string
    percentage: number
    rightType: 0 | 1 | 2 // DA=0, DV=1, BOTH=2
  }>
}

export async function registerWorkOnChain(params: WorkRegistrationParams): Promise<{
  contractAddress: string
  txHash: string
}> {
  const signer = getSigner()
  const factory = getFactory(signer)

  const wallets = params.splits.map(s => s.wallet)
  const names = params.splits.map(s => s.name)
  const percentages = params.splits.map(s => s.percentage)
  const rightTypes = params.splits.map(s => s.rightType)

  const tx = await factory.registerWork(
    params.title,
    params.isrc,
    params.iswc ?? '',
    params.territory,
    wallets,
    names,
    percentages,
    rightTypes
  )

  const receipt = await tx.wait()

  // Parse WorkRegistered event to get contract address
  const event = receipt.logs
    .map((log: any) => {
      try { return factory.interface.parseLog(log) } catch { return null }
    })
    .find((e: any) => e?.name === 'WorkRegistered')

  const contractAddress = event?.args[1] ?? ''

  return { contractAddress, txHash: receipt.hash }
}

// ── Distribute rights for a single work ──────────────────────────────────────

export async function distributeRights(
  isrc: string,
  amountMAD: number,
  sourceType: string
): Promise<string> {
  const signer = getSigner()
  const factory = getFactory(signer)

  const workAddress = await factory.workByISRC(isrc)
  if (workAddress === ethers.ZeroAddress) {
    throw new Error(`Work not found on chain for ISRC: ${isrc}`)
  }

  const amountMATIC = amountMAD * MAD_TO_MATIC
  const amountWei = ethers.parseEther(amountMATIC.toFixed(18))

  const work = new ethers.Contract(workAddress, WORK_ABI, signer)
  const tx = await work.distribute(sourceType, { value: amountWei })
  const receipt = await tx.wait()

  return receipt.hash
}

// ── Bulk quarterly distribution ───────────────────────────────────────────────

export async function processCycleDistribution(
  payments: Array<{ isrc: string; amountMAD: number }>,
  sourceType: string = 'QUARTERLY'
): Promise<string> {
  const signer = getSigner()
  const factory = getFactory(signer)

  const isrcs = payments.map(p => p.isrc)
  const amounts = payments.map(p => {
    const matic = p.amountMAD * MAD_TO_MATIC
    return ethers.parseEther(matic.toFixed(18))
  })

  const totalWei = amounts.reduce((sum, a) => sum + a, 0n)

  const tx = await factory.distributeMultiple(isrcs, amounts, sourceType, {
    value: totalWei,
  })

  const receipt = await tx.wait()
  return receipt.hash
}

// ── Get work info from chain ──────────────────────────────────────────────────

export async function getWorkOnChain(isrc: string) {
  const factory = getFactory()
  const workAddress = await factory.workByISRC(isrc)

  if (workAddress === ethers.ZeroAddress) return null

  const work = new ethers.Contract(workAddress, WORK_ABI, getProvider())
  const [metadata, recipients, totalDistributed] = await Promise.all([
    work.metadata(),
    work.getRecipients(),
    work.totalDistributed(),
  ])

  return {
    address: workAddress,
    title: metadata[0],
    isrc: metadata[1],
    active: metadata[5],
    totalDistributed: ethers.formatEther(totalDistributed),
    recipients: recipients.map((r: any) => ({
      wallet: r[0],
      name: r[1],
      percentage: r[2],
      rightType: ['DA', 'DV', 'BOTH'][r[3]],
    })),
  }
}
