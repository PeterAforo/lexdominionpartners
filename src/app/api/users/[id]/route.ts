import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'
import { requireAdmin } from '@/lib/api-auth'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = await req.json()
    const data: Record<string, any> = {}

    if (body.name) data.name = body.name
    if (body.email) data.email = body.email
    if (body.role) data.role = body.role
    if (body.password) data.password = await bcrypt.hash(body.password, 12)

    const user = await prisma.user.update({
      where: { id: params.id },
      data,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    const userCount = await prisma.user.count()
    if (userCount <= 1) {
      return NextResponse.json({ error: 'Cannot delete the last admin user' }, { status: 400 })
    }

    await prisma.user.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
