import { PrismaClient, SourceType, RightType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding RightFlow database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('rightflow2025', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rightflow.ma' },
    update: {},
    create: {
      email: 'admin@rightflow.ma',
      name: 'Ismail Abounajma',
      password: adminPassword,
      role: 'RIGHTFLOW_ADMIN',
    }
  })

  // Create BMDA admin
  const bmda = await prisma.user.upsert({
    where: { email: 'admin@bmda.ma' },
    update: {},
    create: {
      email: 'admin@bmda.ma',
      name: 'Admin BMDA',
      password: adminPassword,
      role: 'ADMIN_BMDA',
    }
  })

  // Create artists
  const artists = await Promise.all([
    prisma.user.upsert({
      where: { email: 'saad@rightflow.ma' },
      update: {},
      create: {
        email: 'saad@rightflow.ma',
        name: 'Saad Lamjarred',
        password: adminPassword,
        role: 'ARTIST',
        artist: { create: { stageName: 'Saad Lamjarred', country: 'MA' } }
      },
      include: { artist: true }
    }),
    prisma.user.upsert({
      where: { email: 'douzi@rightflow.ma' },
      update: {},
      create: {
        email: 'douzi@rightflow.ma',
        name: 'Douzi',
        password: adminPassword,
        role: 'ARTIST',
        artist: { create: { stageName: 'Douzi', country: 'MA' } }
      },
      include: { artist: true }
    }),
    prisma.user.upsert({
      where: { email: 'maher@rightflow.ma' },
      update: {},
      create: {
        email: 'maher@rightflow.ma',
        name: 'Maher Zain',
        password: adminPassword,
        role: 'ARTIST',
        artist: { create: { stageName: 'Maher Zain', country: 'MA' } }
      },
      include: { artist: true }
    }),
  ])

  // Create label
  const labelUser = await prisma.user.upsert({
    where: { email: 'umg@rightflow.ma' },
    update: {},
    create: {
      email: 'umg@rightflow.ma',
      name: 'Universal Music Morocco',
      password: adminPassword,
      role: 'LABEL',
      label: { create: { name: 'Universal Music Morocco', country: 'MA' } }
    },
    include: { label: true }
  })

  // Create sources
  const sources = await Promise.all([
    prisma.source.upsert({
      where: { id: 'src-hitradio' },
      update: {},
      create: { id: 'src-hitradio', name: 'Hit Radio', type: 'RADIO', country: 'MA', city: 'Casablanca', streamUrl: 'https://stream.hitradio.ma/hitradio.mp3', isActive: true }
    }),
    prisma.source.upsert({
      where: { id: 'src-medi1' },
      update: {},
      create: { id: 'src-medi1', name: 'Medi1 Radio', type: 'RADIO', country: 'MA', city: 'Tanger', isActive: true }
    }),
    prisma.source.upsert({
      where: { id: 'src-2m' },
      update: {},
      create: { id: 'src-2m', name: 'Radio 2M', type: 'RADIO', country: 'MA', city: 'Casablanca', isActive: true }
    }),
    prisma.source.upsert({
      where: { id: 'src-morocco-mall' },
      update: {},
      create: { id: 'src-morocco-mall', name: 'Morocco Mall', type: 'ESPACE_PUBLIC', country: 'MA', city: 'Casablanca', isActive: true }
    }),
    prisma.source.upsert({
      where: { id: 'src-twin' },
      update: {},
      create: { id: 'src-twin', name: 'Twin Center', type: 'ESPACE_PUBLIC', country: 'MA', city: 'Casablanca', isActive: true }
    }),
    prisma.source.upsert({
      where: { id: 'src-spotify' },
      update: {},
      create: { id: 'src-spotify', name: 'Spotify MENA', type: 'STREAMING', country: 'MA', isActive: true }
    }),
    prisma.source.upsert({
      where: { id: 'src-anghami' },
      update: {},
      create: { id: 'src-anghami', name: 'Anghami', type: 'STREAMING', country: 'MA', isActive: true }
    }),
  ])

  console.log(`Created ${sources.length} sources`)

  // Create works
  const saadArtistId = artists[0].artist?.id
  const labelId = labelUser.label?.id

  const works = await Promise.all([
    prisma.work.upsert({
      where: { isrc: 'MA-Z03-24-00142' },
      update: {},
      create: {
        title: 'Ila Meta',
        isrc: 'MA-Z03-24-00142',
        rightType: 'BOTH',
        territories: ['MA', 'DZ', 'TN'],
        artistId: saadArtistId,
        labelId,
        blockchainHash: '0x3f8a9c2b1d4e7f6a3c8b2d1e4f7a6c3b2d1e4f7a6c3b',
        splits: {
          create: [
            { recipientType: 'artist', recipientName: 'Saad Lamjarred', percentage: 45, rightType: 'DROIT_AUTEUR' },
            { recipientType: 'label', recipientName: 'Universal Music Morocco', percentage: 35, rightType: 'BOTH' },
            { recipientType: 'publisher', recipientName: 'Éditeur', percentage: 15, rightType: 'DROIT_AUTEUR' },
            { recipientType: 'platform', recipientName: 'RightFlow', percentage: 5, rightType: 'BOTH' },
          ]
        }
      }
    }),
    prisma.work.upsert({
      where: { isrc: 'MA-Z03-21-00220' },
      update: {},
      create: {
        title: 'Bghit Nebki',
        isrc: 'MA-Z03-21-00220',
        rightType: 'BOTH',
        territories: ['MA'],
        artistId: artists[1].artist?.id,
        labelId,
        blockchainHash: '0x2a5c9d8e7f6a3b2c1d4e7f6a3b2c1d4e7f6a3b2c',
        splits: {
          create: [
            { recipientType: 'artist', recipientName: 'Douzi', percentage: 55, rightType: 'DROIT_AUTEUR' },
            { recipientType: 'label', recipientName: 'Universal Music Morocco', percentage: 40, rightType: 'DROIT_VOISIN' },
            { recipientType: 'platform', recipientName: 'RightFlow', percentage: 5, rightType: 'BOTH' },
          ]
        }
      }
    }),
    prisma.work.upsert({
      where: { isrc: 'MA-Z03-20-00091' },
      update: {},
      create: {
        title: 'Zina',
        isrc: 'MA-Z03-20-00091',
        rightType: 'BOTH',
        territories: ['MA', 'DZ', 'TN'],
        artistId: artists[2].artist?.id,
        labelId,
        blockchainHash: '0x6e9a1f5c3b2d4e7a9f6c3b2d1e4f7a9f6c3b2d1e',
        splits: {
          create: [
            { recipientType: 'artist', recipientName: 'Maher Zain', percentage: 40, rightType: 'DROIT_AUTEUR' },
            { recipientType: 'artist', recipientName: 'Ismail Abounajma', percentage: 20, rightType: 'DROIT_VOISIN' },
            { recipientType: 'label', recipientName: 'Universal Music Morocco', percentage: 30, rightType: 'BOTH' },
            { recipientType: 'platform', recipientName: 'RightFlow', percentage: 5, rightType: 'BOTH' },
          ]
        }
      }
    }),
  ])

  console.log(`Created ${works.length} works`)

  // Create current payment cycle (Q3 2025)
  await prisma.paymentCycle.upsert({
    where: { id: 'cycle-q3-2025' },
    update: {},
    create: {
      id: 'cycle-q3-2025',
      name: 'Q3 2025',
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-09-30'),
      paymentDate: new Date('2025-10-01'),
      status: 'ACTIVE',
      totalAmount: 31740,
    }
  })

  // Create previous cycle (Q2 2025)
  await prisma.paymentCycle.upsert({
    where: { id: 'cycle-q2-2025' },
    update: {},
    create: {
      id: 'cycle-q2-2025',
      name: 'Q2 2025',
      startDate: new Date('2025-04-01'),
      endDate: new Date('2025-06-30'),
      paymentDate: new Date('2025-07-01'),
      status: 'COMPLETED',
      totalAmount: 24820,
    }
  })

  // Next cycle (Q4 2025)
  await prisma.paymentCycle.upsert({
    where: { id: 'cycle-q4-2025' },
    update: {},
    create: {
      id: 'cycle-q4-2025',
      name: 'Q4 2025',
      startDate: new Date('2025-10-01'),
      endDate: new Date('2025-12-31'),
      paymentDate: new Date('2026-01-01'),
      status: 'UPCOMING',
      totalAmount: 0,
    }
  })

  console.log('Seed completed successfully ✓')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
