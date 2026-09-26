import Image from 'next/image'
import Link from 'next/link'
import type { Dict } from '@/content/fr'
import type { Locale } from '@/lib/i18n'
import { IconArrow, IconCheck, IconStar } from '../Icons'
import Reveal from '../Reveal'

export default function Featured({ lang, t }: { lang: Locale; t: Dict }) {
  const f = t.home.featured
  return (
    <section className="relative py-16 lg:py-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-ink-850">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[22rem] lg:min-h-full">
              <Image src="/img/asmaa-hero.webp" alt="Riad Asmaa, vue aérienne" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent lg:bg-gradient-to-r rtl:lg:bg-gradient-to-l" />
              <div className="absolute bottom-5 start-5 end-5 flex items-end justify-between gap-4">
                <div className="glass rounded-2xl px-4 py-3">
                  <p className="flex items-center gap-1 text-mint-300">
                    {[0, 1, 2, 3, 4].map((i) => <IconStar key={i} className="h-3.5 w-3.5" />)}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white" dir="ltr">9,7/10 · Booking.com</p>
                </div>
                <div className="hidden w-28 overflow-hidden rounded-2xl border border-white/15 shadow-2xl sm:block">
                  <Image src="/img/asmaa-site-mobile.webp" alt="" width={780} height={1688} sizes="112px" className="h-auto w-full" />
                </div>
              </div>
            </div>
            <Reveal className="flex flex-col justify-center p-8 sm:p-12">
              <p className="eyebrow">{f.eyebrow}</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">{f.title}</h2>
              <p className="mt-4 text-pretty leading-relaxed text-ink-300">{f.text}</p>
              <ul className="mt-7 grid grid-cols-2 gap-3">
                {f.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-ink-200">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-400/15 text-mint-300"><IconCheck className="h-3 w-3" /></span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={`/${lang}/realisations/riad-asmaa`} className="btn btn-primary">
                  {t.common.readCase} <IconArrow className="h-4 w-4" />
                </Link>
                <a href="https://riadasmaa-agadir.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  {t.common.visitSite}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
