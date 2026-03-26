import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

// This endpoint fetches live content from the database to build
// a dynamic knowledge context for the chatbot. Called by the chat
// API route to ensure the chatbot always has the latest website content.

export async function GET() {
  try {
    // Fetch all active services
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: { title: true, slug: true, description: true, content: true },
    })

    // Fetch all active team members
    const teamMembers = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: { name: true, title: true, slug: true, bio: true, email: true },
      take: 20,
    })

    // Fetch recent published blog posts
    const blogPosts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      select: { title: true, slug: true, excerpt: true, category: true },
      take: 10,
    })

    // Fetch active testimonials
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: { name: true, title: true, company: true, content: true },
      take: 5,
    })

    // Fetch site settings
    const siteSettings = await prisma.siteSetting.findMany({
      select: { key: true, value: true },
    })

    // Build the dynamic knowledge context
    let dynamicKnowledge = ''

    if (services.length > 0) {
      dynamicKnowledge += '\n\nLIVE SERVICES FROM DATABASE:\n'
      services.forEach((s: { title: string; slug: string; description: string; content: string | null }) => {
        dynamicKnowledge += `- ${s.title} (/services/${s.slug}): ${s.description}\n`
      })
    }

    if (teamMembers.length > 0) {
      dynamicKnowledge += '\n\nLIVE TEAM MEMBERS FROM DATABASE:\n'
      teamMembers.forEach((t: { name: string; title: string; slug: string; bio: string | null; email: string | null }) => {
        dynamicKnowledge += `- ${t.name} — ${t.title}${t.email ? ` (${t.email})` : ''} — /team/${t.slug}\n`
      })
    }

    if (blogPosts.length > 0) {
      dynamicKnowledge += '\n\nLATEST BLOG POSTS:\n'
      blogPosts.forEach((b: { title: string; slug: string; excerpt: string | null; category: string | null }) => {
        dynamicKnowledge += `- "${b.title}" (${b.category || 'General'}) — /blog/${b.slug}${b.excerpt ? `: ${b.excerpt}` : ''}\n`
      })
    }

    if (testimonials.length > 0) {
      dynamicKnowledge += '\n\nCLIENT TESTIMONIALS:\n'
      testimonials.forEach((t: { name: string; title: string | null; company: string | null; content: string }) => {
        dynamicKnowledge += `- ${t.name}${t.company ? ` (${t.company})` : ''}: "${t.content.slice(0, 150)}${t.content.length > 150 ? '...' : ''}"\n`
      })
    }

    if (siteSettings.length > 0) {
      dynamicKnowledge += '\n\nSITE SETTINGS:\n'
      siteSettings.forEach((s: { key: string; value: string }) => {
        dynamicKnowledge += `- ${s.key}: ${s.value}\n`
      })
    }

    return NextResponse.json({
      dynamicKnowledge,
      stats: {
        services: services.length,
        teamMembers: teamMembers.length,
        blogPosts: blogPosts.length,
        testimonials: testimonials.length,
        siteSettings: siteSettings.length,
      },
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Knowledge sync error:', error)
    return NextResponse.json({ dynamicKnowledge: '', stats: {}, error: 'Failed to sync' }, { status: 500 })
  }
}
