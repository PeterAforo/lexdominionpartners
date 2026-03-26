import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAdmin } from '@/lib/api-auth'
import { updateTeamSchema } from '@/lib/validations'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const member = await prisma.teamMember.findUnique({ where: { id: params.id } })
    if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = await req.json()
    const parsed = updateTeamSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const member = await prisma.teamMember.update({
      where: { id: params.id },
      data: parsed.data,
    })
    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    await prisma.teamMember.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
