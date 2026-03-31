import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateReserveRedistribution } from '@/lib/rightsEngine'

export const dynamic = 'force-dynamic'

// GET /api/reserve — list reserve fund entries
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  const entries = await prisma.reserveFund.findMany({
    where: status ? { status: status as any } : {},
    include: { work: { select: { title: true, isrc: true } } },
    orderBy: { amount: 'desc' },
  })

  const total = entries.reduce((sum, e) => sum + e.amount, 0)

  return NextResponse.json({ entries, total, count: entries.length })
}

// POST /api/reserve/notify — send notifications to unregistered artists
export async function POST(req: NextRequest) {
  const { action } = await req.json()

  if (action === 'notify') {
    const pending = await prisma.reserveFund.findMany({
      where: { status: 'WAITING' },
    })

    // In production: send SMS/email to artists found via name search
    const notified = []
    for (const entry of pending) {
      // TODO: lookup artist contact info, send notification
      await prisma.reserveFund.update({
        where: { id: entry.id },
        data: { status: 'NOTIFIED', notifiedAt: new Date() }
      })
      notified.push(entry.id)
    }

    return NextResponse.json({ notified: notified.length })
  }

  if (action === 'redistribute') {
    // Redistribute expired entries (> 18 months) to active artists
    const expired = await prisma.reserveFund.findMany({
      where: {
        status: { in: ['WAITING', 'NOTIFIED'] },
        expiresAt: { lte: new Date() },
      }
    })

    if (expired.length === 0) {
      return NextResponse.json({ message: 'No expired entries to redistribute' })
    }

    const totalToRedistribute = expired.reduce((sum, e) => sum + e.amount, 0)

    // Get active artists with their detection counts for this period
    const activeArtists = await prisma.artist.findMany({
      where: {
        works: {
          some: {
            detections: {
              some: {
                detectedAt: { gte: new Date(Date.now() - 18 * 30 * 24 * 60 * 60 * 1000) }
              }
            }
          }
        }
      },
      include: {
        user: { select: { name: true } },
        works: {
          include: {
            detections: {
              where: {
                detectedAt: { gte: new Date(Date.now() - 18 * 30 * 24 * 60 * 60 * 1000) }
              }
            }
          }
        }
      }
    })

    const artistsWithCounts = activeArtists.map(a => ({
      id: a.id,
      name: a.user.name,
      detectionCount: a.works.reduce((sum, w) => sum + w.detections.length, 0),
    }))

    const redistribution = calculateReserveRedistribution(totalToRedistribute, artistsWithCounts)

    // Mark as redistributed
    for (const entry of expired) {
      await prisma.reserveFund.update({
        where: { id: entry.id },
        data: { status: 'REDISTRIBUTED', redistributedAt: new Date() }
      })
    }

    return NextResponse.json({
      success: true,
      totalRedistributed: totalToRedistribute,
      artistsCount: redistribution.length,
      redistribution,
    })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
