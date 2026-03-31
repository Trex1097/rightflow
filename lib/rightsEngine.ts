import { SourceType, RightType } from '@prisma/client'

// Taux en MAD par unité selon la source et le territoire
export const RATES: Record<SourceType, Record<string, number>> = {
  STREAMING: {
    MA: 0.0085,  // MAD par stream
    DZ: 0.0070,
    TN: 0.0075,
    DEFAULT: 0.0060,
  },
  RADIO: {
    MA: 18.0,    // MAD par passage (durée standard ~3.5min)
    DZ: 14.0,
    TN: 12.0,
    DEFAULT: 10.0,
  },
  ESPACE_PUBLIC: {
    MA: 9.0,     // MAD par détection
    DZ: 7.0,
    TN: 6.0,
    DEFAULT: 5.0,
  },
  SYNCHRONISATION: {
    MA: 450.0,   // MAD par synchro
    DZ: 380.0,
    TN: 350.0,
    DEFAULT: 300.0,
  },
}

// Répartition DA / DV selon la source
export const RIGHT_SPLIT: Record<SourceType, { da: number; dv: number }> = {
  STREAMING:      { da: 0.50, dv: 0.50 },
  RADIO:          { da: 0.45, dv: 0.55 },
  ESPACE_PUBLIC:  { da: 0.40, dv: 0.60 },
  SYNCHRONISATION: { da: 0.60, dv: 0.40 },
}

// Commission RightFlow
export const PLATFORM_FEE = 0.05 // 5%

export interface RightCalculation {
  totalAmount: number
  daAmount: number
  dvAmount: number
  platformFee: number
  netAmount: number
  currency: string
}

export function calculateRight(
  sourceType: SourceType,
  country: string,
  quantity: number = 1,
  durationSeconds?: number
): RightCalculation {
  const rate = RATES[sourceType][country] ?? RATES[sourceType].DEFAULT
  const split = RIGHT_SPLIT[sourceType]

  // Pour la radio, ajuster selon la durée réelle vs standard (210s = 3.5min)
  let multiplier = quantity
  if (sourceType === 'RADIO' && durationSeconds) {
    multiplier = quantity * (durationSeconds / 210)
  }

  const totalAmount = rate * multiplier
  const daAmount = totalAmount * split.da
  const dvAmount = totalAmount * split.dv
  const platformFee = totalAmount * PLATFORM_FEE
  const netAmount = totalAmount - platformFee

  return {
    totalAmount: Math.round(totalAmount * 100) / 100,
    daAmount: Math.round(daAmount * 100) / 100,
    dvAmount: Math.round(dvAmount * 100) / 100,
    platformFee: Math.round(platformFee * 100) / 100,
    netAmount: Math.round(netAmount * 100) / 100,
    currency: 'MAD',
  }
}

export function applyWorkSplits(
  totalDA: number,
  totalDV: number,
  splits: Array<{ recipientName: string; percentage: number; rightType: RightType }>
): Array<{ recipient: string; amount: number; rightType: string }> {
  return splits.map(split => {
    const base = split.rightType === 'DROIT_AUTEUR' ? totalDA
      : split.rightType === 'DROIT_VOISIN' ? totalDV
      : (totalDA + totalDV) / 2

    return {
      recipient: split.recipientName,
      amount: Math.round(base * (split.percentage / 100) * 100) / 100,
      rightType: split.rightType,
    }
  })
}

// Calcul du Fonds de Réserve — redistribution au prorata après 18 mois
export function calculateReserveRedistribution(
  totalReserve: number,
  activeArtists: Array<{ id: string; name: string; detectionCount: number }>
): Array<{ artistId: string; artistName: string; amount: number; share: number }> {
  const totalDetections = activeArtists.reduce((sum, a) => sum + a.detectionCount, 0)
  if (totalDetections === 0) return []

  return activeArtists.map(artist => {
    const share = artist.detectionCount / totalDetections
    return {
      artistId: artist.id,
      artistName: artist.name,
      amount: Math.round(totalReserve * share * 100) / 100,
      share: Math.round(share * 10000) / 100, // percentage
    }
  })
}
