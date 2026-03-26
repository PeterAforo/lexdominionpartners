import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAdmin } from '@/lib/api-auth'
import { updateSettingsSchema } from '@/lib/validations'

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany()
    const settingsMap: Record<string, string> = {}
    settings.forEach((s: { key: string; value: string }) => {
      settingsMap[s.key] = s.value
    })
    return NextResponse.json(settingsMap)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = await req.json()
    const parsed = updateSettingsSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const updates = Object.entries(parsed.data).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    )

    await Promise.all(updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Settings save error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
