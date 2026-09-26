import Link from 'next/link'
import type { Dict } from '@/content/fr'
import type { Locale } from '@/lib/i18n'
import { whatsappLink } from '@/lib/site'
import { IconArrow, IconWhatsApp } from './Icons'
import Reveal from './Reveal'

export default function CtaBand({ lang, t, title, subtitle, whatsappMessage }: { lang: Locale; t: Dict; title: string; subtitle: string; whatsappMessage?: string }) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-mint-400/25 bg-gradient-to-br from-ink-700 via-ink-850 to-ink-900 px-6 py-16 text-center sm:px-12">
          <div aria-hidden className="absolute -top-24 start-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-mint-400/25 blur-3xl rtl:translate-x-1/2" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/menassa-wordmark.svg" alt="" aria-hidden className="pointer-events-none absolute -bottom-16 -end-10 w-[34rem] opacity-[0.05]" />
          <h2 className="relative mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-pretty text-lg text-ink-300">{subtitle}</p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <Link href={`/${lang}/demarrer`} className="btn btn-primary">
              {t.common.start} <IconArrow className="h-4 w-4" />
            </Link>
            <a href={whatsappLink(whatsappMessage ?? t.common.whatsappHello)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <IconWhatsApp className="h-4 w-4 text-[#25D366]" /> {t.common.whatsapp}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
