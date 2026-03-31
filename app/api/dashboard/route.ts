import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfQuarter = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1)

  const [
    totalDetections,
    monthDetections,
    activeSources,
    activeWorks,
    quarterRights,
    reserveTotal,
    reserveCount,
  ] = await Promise.all([
    prisma.detection.count(),
    prisma.detection.count({ where: { detectedAt: { gte: startOfMonth } } }),
    prisma.source.count({ where: { isActive: true } }),
    prisma.work.count({ where: { isActive: true } }),
    prisma.right.aggregate({
      where: { period: { gte: startOfQuarter } },
      _sum: { amount: true },
    }),
    prisma.reserveFund.aggregate({
      where: { status: { in: ['WAITING', 'NOTIFIED'] } },
      _sum: { amount: true },
    }),
    prisma.reserveFund.count({
      where: { status: { in: ['WAITING', 'NOTIFIED'] } }
    }),
  ])

  // Source breakdown
  const sourceBreakdown = await prisma.right.groupBy({
    by: ['sourceType'],
    where: { period: { gte: startOfQuarter } },
    _sum: { amount: true },
  })

  // DA vs DV breakdown
  const rightTypeBreakdown = await prisma.right.groupBy({
    by: ['rightType'],
    where: { period: { gte: startOfQuarter } },
    _sum: { amount: true },
  })

  return NextResponse.json({
    detections: {
      total: totalDetections,
      thisMonth: monthDetections,
    },
    sources: { active: activeSources },
    works: { active: activeWorks },
    rights: {
      quarterTotal: quarterRights._sum.amount ?? 0,
      bySource: sourceBreakdown,
      byType: rightTypeBreakdown,
    },
    reserve: {
      total: reserveTotal._sum.amount ?? 0,
      count: reserveCount,
    },
  })
}
