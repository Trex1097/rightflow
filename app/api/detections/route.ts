import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateRight } from '@/lib/rightsEngine'

export const dynamic = 'force-dynamic'

// POST /api/detections — called by IoT devices or ACRCloud webhook
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sourceId, isrc, rawTitle, rawArtist, durationSeconds, confidence } = body

    if (!sourceId) {
      return NextResponse.json({ error: 'sourceId required' }, { status: 400 })
    }

    const source = await prisma.source.findUnique({ where: { id: sourceId } })
    if (!source) {
      return NextResponse.json({ error: 'Source not found' }, { status: 404 })
    }

    // Try to match to a work
    let work = null
    if (isrc) {
      work = await prisma.work.findUnique({ where: { isrc } })
    }

    if (!work && rawTitle) {
      work = await prisma.work.findFirst({
        where: { title: { contains: rawTitle, mode: 'insensitive' } }
      })
    }

    const detection = await prisma.detection.create({
      data: {
        sourceId,
        workId: work?.id ?? null,
        status: work ? 'MATCHED' : 'UNMATCHED',
        rawTitle: rawTitle ?? null,
        rawArtist: rawArtist ?? null,
        duration: durationSeconds ?? null,
        confidence: confidence ?? null,
        detectedAt: new Date(),
      }
    })

    // If matched, calculate and store rights
    if (work) {
      const calc = calculateRight(source.type, source.country, 1, durationSeconds)

      await prisma.right.create({
        data: {
          workId: work.id,
          detectionId: detection.id,
          sourceType: source.type,
          rightType: 'BOTH',
          amount: calc.netAmount,
          currency: 'MAD',
          period: new Date(),
        }
      })
    } else {
      // Unmatched — goes to reserve fund
      await handleReserveFund(rawTitle, rawArtist, source, durationSeconds)
    }

    return NextResponse.json({ success: true, detectionId: detection.id, matched: !!work })
  } catch (error) {
    console.error('Detection error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handleReserveFund(
  rawTitle: string | null,
  rawArtist: string | null,
  source: any,
  durationSeconds?: number
) {
  if (!rawTitle) return

  const calc = calculateRight(source.type, source.country, 1, durationSeconds)
  const key = `${rawTitle}|${rawArtist ?? 'unknown'}`
  const expiresAt = new Date(Date.now() + 18 * 30 * 24 * 60 * 60 * 1000) // 18 months

  // Find existing reserve entry or create new one
  const existing = await prisma.reserveFund.findFirst({
    where: {
      unregisteredName: key,
    }
  })

  if (existing) {
    await prisma.reserveFund.update({
      where: { id: existing.id },
      data: {
        amount: { increment: calc.netAmount },
        passageCount: { increment: 1 },
      }
    })
  } else {
    // We need a dummy work reference — in production, create an unregistered work
    // For now, skip if no work reference available
    console.log(`Reserve fund entry for unregistered: ${key} — ${calc.netAmount} MAD`)
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sourceId = searchParams.get('sourceId')
  const limit = parseInt(searchParams.get('limit') ?? '20')

  const detections = await prisma.detection.findMany({
    where: sourceId ? { sourceId } : {},
    include: {
      work: { select: { title: true, isrc: true } },
      source: { select: { name: true, type: true } },
    },
    orderBy: { detectedAt: 'desc' },
    take: limit,
  })

  return NextResponse.json(detections)
}
