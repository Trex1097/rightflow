import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: { artist: true, label: true },
          })
          if (!user) return null
          const valid = await bcrypt.compare(credentials.password, user.password)
          if (!valid) return null
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            artistId: user.artist?.id ?? null,
            labelId: user.label?.id ?? null,
          }
        } catch (err) {
          console.error('Auth error:', err)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.artistId = (user as any).artistId
        token.labelId = (user as any).labelId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
        ;(session.user as any).artistId = token.artistId
        ;(session.user as any).labelId = token.labelId
      }
      return session
    },
  },
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }