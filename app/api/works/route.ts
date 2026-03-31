import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') ?? ''
  const territory = searchParams.get('territory')
  const status = searchParams.get('status')

  const works = await prisma.work.findMany({
    where: {
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { isrc: { contains: search, mode: 'insensitive' } },
        ]
      }),
      ...(territory && { territories: { has: territory } }),
      ...(status === 'active' && { isActive: true }),
    },
    include: {
      artist: { include: { user: { select: { name: true } } } },
      label: { select: { name: true } },
      splits: true,
      rights: {
        orderBy: { calculatedAt: 'desc' },
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(works)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      title, isrc, iswc, rightType, territories,
      artistId, composerId, labelId,
      splits, blockchainHash, smartContractAddress
    } = body

    if (!title || !isrc) {
      return NextResponse.json({ error: 'title and isrc required' }, { status: 400 })
    }

    const work = await prisma.work.create({
      data: {
        title,
        isrc,
        iswc,
        rightType: rightType ?? 'BOTH',
        territories: territories ?? ['MA'],
        artistId,
        composerId,
        labelId,
        blockchainHash,
        smartContractAddress,
        splits: splits ? {
          create: splits.map((s: any) => ({
            recipientType: s.recipientType,
            recipientId: s.recipientId,
            recipientName: s.recipientName,
            percentage: s.percentage,
            rightType: s.rightType ?? 'BOTH',
          }))
        } : undefined
      },
      include: { splits: true }
    })

    return NextResponse.json(work, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'ISRC already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
