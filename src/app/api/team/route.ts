import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAdmin } from '@/lib/api-auth'
import { createTeamSchema } from '@/lib/validations'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const all = searchParams.get('all') === 'true'

    const members = await prisma.teamMember.findMany({
      where: all ? {} : { isActive: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = await req.json()
    const parsed = createTeamSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const member = await prisma.teamMember.create({ data: parsed.data })
    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
