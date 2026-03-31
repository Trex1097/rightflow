import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['ARTIST', 'LABEL']),
  stageName: z.string().optional(),
  labelName: z.string().optional(),
  country: z.string().default('MA'),
  iban: z.string().optional(),
  mobileMoneyNumber: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing) {
      return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(data.password, 12)

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
        role: data.role,
        ...(data.role === 'ARTIST' && {
          artist: {
            create: {
              stageName: data.stageName || data.name,
              country: data.country,
              iban: data.iban,
              mobileMoneyNumber: data.mobileMoneyNumber,
            }
          }
        }),
        ...(data.role === 'LABEL' && {
          label: {
            create: {
              name: data.labelName || data.name,
              country: data.country,
            }
          }
        }),
      },
    })

    return NextResponse.json({ success: true, userId: user.id }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Données invalides', details: err.errors }, { status: 400 })
    }
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
