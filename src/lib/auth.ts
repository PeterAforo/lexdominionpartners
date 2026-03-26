import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import prisma from './db'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error('[AUTH] Missing email or password')
            throw new Error('Invalid credentials')
          }

          console.log('[AUTH] Login attempt for:', credentials.email)

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user) {
            console.error('[AUTH] No user found for:', credentials.email)
            throw new Error('Invalid credentials')
          }

          if (!user.password) {
            console.error('[AUTH] User has no password:', credentials.email)
            throw new Error('Invalid credentials')
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isCorrectPassword) {
            console.error('[AUTH] Password mismatch for:', credentials.email)
            throw new Error('Invalid credentials')
          }

          console.log('[AUTH] Login successful for:', credentials.email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error: any) {
          console.error('[AUTH] Authorize error:', error.message)
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
        ;(session.user as any).id = token.id
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

// Auto-detect NEXTAUTH_URL on Vercel
if (process.env.VERCEL_URL && !process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`
}
