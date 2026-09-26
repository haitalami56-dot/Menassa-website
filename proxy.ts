import { NextResponse, type NextRequest } from 'next/server'

const locales = ['fr', 'ar', 'en']

function preferredLocale(request: NextRequest) {
  const saved = request.cookies.get('NEXT_LOCALE')?.value
  if (saved && locales.includes(saved)) return saved
  const header = request.headers.get('accept-language') ?? ''
  for (const part of header.split(',')) {
    const code = part.trim().slice(0, 2).toLowerCase()
    if (locales.includes(code)) return code
  }
  return 'fr'
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, icons, sitemap...)
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
