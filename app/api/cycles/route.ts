import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/cycles — list all payment cycles
export async function GET() {
  const cycles = await prisma.paymentCycle.findMany({
    include: {
      payments: {
        include: {
          artist: { include: { user: { select: { name: true } } } },
          label: { select: { name: true } },
        }
      }
    },
    orderBy: { startDate: 'desc' },
  })
  return NextResponse.json(cycles)
}

// POST /api/cycles/process — trigger processing of active cycle
export async function POST(req: NextRequest) {
  const { cycleId } = await req.json()

  const cycle = await prisma.paymentCycle.findUnique({
    where: { id: cycleId },
    include: { payments: true }
  })

  if (!cycle) return NextResponse.json({ error: 'Cycle not found' }, { status: 404 })
  if (cycle.status === 'COMPLETED') return NextResponse.json({ error: 'Cycle already completed' }, { status: 400 })

  // Aggregate rights for this period
  const rights = await prisma.right.findMany({
    where: {
      period: {
        gte: cycle.startDate,
        lte: cycle.endDate,
      },
      payments: { none: {} }, // not yet paid
    },
    include: {
      work: {
        include: {
          splits: true,
          artist: true,
          label: true,
        }
      }
    }
  })

  // Group by artist/label
  const paymentMap = new Map<string, { artistId?: string; labelId?: string; amountDA: number; amountDV: number }>()

  for (const right of rights) {
    for (const split of right.work.splits) {
      const key = split.recipientId ?? split.recipientName
      const existing = paymentMap.get(key) ?? { amountDA: 0, amountDV: 0 }

      const splitAmount = right.amount * (split.percentage / 100)

      if (split.rightType === 'DROIT_AUTEUR') {
        existing.amountDA += splitAmount
      } else if (split.rightType === 'DROIT_VOISIN') {
        existing.amountDV += splitAmount
      } else {
        existing.amountDA += splitAmount * 0.5
        existing.amountDV += splitAmount * 0.5
      }

      if (right.work.artistId) existing.artistId = right.work.artistId
      if (right.work.labelId) existing.labelId = right.work.labelId

      paymentMap.set(key, existing)
    }
  }

  // Create payment records
  const payments = []
  for (const [, data] of paymentMap) {
    const total = data.amountDA + data.amountDV
    const payment = await prisma.payment.create({
      data: {
        cycleId,
        artistId: data.artistId,
        labelId: data.labelId,
        amountDA: Math.round(data.amountDA * 100) / 100,
        amountDV: Math.round(data.amountDV * 100) / 100,
        totalAmount: Math.round(total * 100) / 100,
        currency: 'MAD',
        status: 'SCHEDULED',
      }
    })
    payments.push(payment)
  }

  // Update cycle total
  const totalAmount = payments.reduce((sum, p) => sum + p.totalAmount, 0)
  await prisma.paymentCycle.update({
    where: { id: cycleId },
    data: { totalAmount, status: 'ACTIVE' }
  })

  return NextResponse.json({ success: true, paymentsCreated: payments.length, totalAmount })
}
