'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Dict } from '@/content/fr'
import type { Locale } from '@/lib/i18n'
import Logo from './Logo'
import { IconClose, IconGlobe, IconMenu } from './Icons'

const LANGS: { code: Locale; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'ع' },
  { code: 'en', label: 'EN' },
]

export default function Header({ lang, t }: { lang: Locale; t: Dict }) {
  const pathname = usePathname() ?? `/${lang}`
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const links = [
    { href: '/sites-web', label: t.nav.websites },
    { href: '/automatisations-ia', label: t.nav.automations, soon: true },
    { href: '/applications', label: t.nav.apps, soon: true },
    { href: '/aios', label: t.nav.aios, soon: true, boss: true },
    { href: '/realisations', label: t.nav.work },
    { href: '/a-propos', label: t.nav.about },
  ]

  const rest = pathname.replace(/^\/(fr|ar|en)(?=\/|$)/, '')
  const switchTo = (code: Locale) => {
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000; samesite=lax`
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-white/8 bg-ink-950/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-18">
        <Link href={`/${lang}`} aria-label="Menassa" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation">
          {links.map((l) => {
            const active = rest.startsWith(l.href)
            return (
              <Link
                key={l.href}
                href={`/${lang}${l.href}`}
                className={`relative rounded-full px-3 py-2 text-sm transition-colors ${
                  active ? 'text-white' : 'text-ink-300 hover:text-white'
                }`}
              >
                {l.label}
                {l.boss && (
                  <span className="ms-1.5 rounded-full bg-mint-400/15 px-1.5 py-0.5 text-[0.65rem] font-semibold text-mint-300">
                    {t.nav.soon}
                  </span>
                )}
                {active && <span className="absolute inset-x-3 -bottom-0.5 h-px bg-mint-400" />}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-white/10 p-0.5 sm:flex" role="group" aria-label={t.nav.language}>
            {LANGS.map((l) => (
              <Link
                key={l.code}
                href={`/${l.code}${rest}`}
                onClick={() => switchTo(l.code)}
                hrefLang={l.code}
                aria-current={l.code === lang ? 'true' : undefined}
                className={`min-w-9 rounded-full px-2.5 py-1 text-center text-xs font-semibold transition-colors ${
                  l.code === lang ? 'bg-white text-ink-900' : 'text-ink-300 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link href={`/${lang}/demarrer`} className="btn btn-primary hidden !px-4 !py-2.5 md:inline-flex">
            {t.nav.start}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/8 bg-ink-950 lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-6" aria-label="Navigation">
            {links.map((l) => (
              <Link
                key={l.href}
                href={`/${lang}${l.href}`}
                className="flex items-center justify-between rounded-2xl px-4 py-4 text-lg text-white hover:bg-white/5"
              >
                {l.label}
                {l.soon && <span className="rounded-full bg-mint-400/15 px-2 py-0.5 text-xs text-mint-300">{t.nav.soon}</span>}
              </Link>
            ))}
            <Link href={`/${lang}/contact`} className="rounded-2xl px-4 py-4 text-lg text-white hover:bg-white/5">
              {t.nav.contact}
            </Link>
            <div className="mt-4 flex items-center gap-2 px-4">
              <IconGlobe className="text-ink-400" />
              {LANGS.map((l) => (
                <Link
                  key={l.code}
                  href={`/${l.code}${rest}`}
                  onClick={() => switchTo(l.code)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${l.code === lang ? 'bg-white text-ink-900' : 'border border-white/15 text-white'}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Link href={`/${lang}/demarrer`} className="btn btn-primary mx-4 mt-6">
              {t.nav.start}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
