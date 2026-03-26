import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  const checks: Record<string, any> = {
    env: {
      DATABASE_URL: !!process.env.DATABASE_URL,
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
    },
  }

  try {
    const userCount = await prisma.user.count()
    checks.database = { connected: true, userCount }

    const admin = await prisma.user.findUnique({
      where: { email: 'admin@lexdominion.com' },
      select: { id: true, email: true, name: true, role: true },
    })
    checks.adminUser = admin ? { exists: true, ...admin } : { exists: false }
  } catch (error: any) {
    checks.database = { connected: false, error: error.message }
  }

  return NextResponse.json(checks)
}
