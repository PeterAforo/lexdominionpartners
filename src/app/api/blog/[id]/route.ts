import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAdmin } from '@/lib/api-auth'
import { updateBlogSchema } from '@/lib/validations'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
      include: { author: { select: { name: true, email: true } } },
    })
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = await req.json()
    const parsed = updateBlogSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: parsed.data,
    })
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    await prisma.blogPost.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
