const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export function isRateLimited(
  ip: string,
  limit: number = 10,
  windowMs: number = 60 * 1000
): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return false
  }
  entry.count++
  return entry.count > limit
}

export function getClientIp(headers: Headers): string {
  return headers.get('x-forwarded-for') || headers.get('x-real-ip') || 'unknown'
}
