import Link from 'next/link'
import type { Dict } from '@/content/fr'
import type { Locale } from '@/lib/i18n'
import { IconArrow, IconBot, IconCpu, IconGlobe, IconPhone } from '../Icons'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'

const META = {
  websites: { href: '/sites-web', Icon: IconGlobe, live: true },
  automations: { href: '/automatisations-ia', Icon: IconBot, live: false },
  apps: { href: '/applications', Icon: IconPhone, live: false },
  aios: { href: '/aios', Icon: IconCpu, live: false },
} as const

export default function Offers({ lang, t }: { lang: Locale; t: Dict }) {
  const o = t.home.offers
  return (
    <section className="relative py-16 lg:py-24" id="offres">
      <div className="container-x">
        <SectionHeading eyebrow={o.eyebrow} title={o.title} subtitle={o.subtitle} align="center" />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {o.items.map((item, i) => {
            const m = META[item.key as keyof typeof META]
            const boss = item.key === 'aios'
            return (
              <Reveal key={item.key} delay={i * 80}>
                <Link
                  href={`/${lang}${m.href}`}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                    boss
                      ? 'border-mint-400/40 bg-gradient-to-b from-ink-700 to-ink-850 shadow-[0_30px_60px_-30px_rgba(52,211,153,0.5)]'
                      : m.live
                        ? 'border-mint-400/30 bg-ink-850 hover:border-mint-400/60'
                        : 'border-white/8 bg-ink-850/70 hover:border-white/20'
                  }`}
                >
                  {boss && <div aria-hidden className="absolute -end-16 -top-16 h-40 w-40 rounded-full bg-mint-400/20 blur-3xl" />}
                  <div className="flex items-center justify-between">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${m.live || boss ? 'bg-mint-400 text-ink-950' : 'bg-white/8 text-mint-300'}`}>
                      <m.Icon />
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ${
                        m.live ? 'bg-mint-400/15 text-mint-300' : boss ? 'bg-mint-400 text-ink-950' : 'bg-white/8 text-ink-300'
                      }`}
                    >
                      {m.live ? t.common.live : boss ? t.common.finalBoss : t.common.comingSoon}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-300">{item.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mint-300">
                    {item.cta} <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
