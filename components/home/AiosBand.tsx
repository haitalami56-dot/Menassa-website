import Link from 'next/link'
import type { Dict } from '@/content/fr'
import type { Locale } from '@/lib/i18n'
import { IconArrow } from '../Icons'
import AiosOrbit from '../AiosOrbit'
import Reveal from '../Reveal'

export default function AiosBand({ lang, t }: { lang: Locale; t: Dict }) {
  const a = t.home.aios
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_40%,rgba(52,211,153,0.16),transparent_60%)]" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">{a.eyebrow}</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">{a.title}</h2>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink-300">{a.text}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href={`/${lang}/aios`} className="btn btn-primary">
              {a.cta} <IconArrow className="h-4 w-4" />
            </Link>
            <span className="rounded-full border border-mint-400/30 px-3 py-1.5 text-xs font-semibold text-mint-300">{a.spots}</span>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <AiosOrbit t={t} />
        </Reveal>
      </div>
    </section>
  )
}
