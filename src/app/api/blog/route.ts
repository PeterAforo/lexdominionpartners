import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAdmin } from '@/lib/api-auth'
import { createBlogSchema } from '@/lib/validations'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const all = searchParams.get('all') === 'true'

    const posts = await prisma.blogPost.findMany({
      where: all ? {} : { published: true },
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true, email: true } } },
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = await req.json()
    const parsed = createBlogSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const { title, slug, excerpt, content, image, category, tags, published, authorId } = parsed.data

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        image: image || null,
        category: category || null,
        tags: tags || [],
        published: published ?? false,
        authorId,
      },
    })
    return NextResponse.json(post)
  } catch (error) {
    console.error('Blog post creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
