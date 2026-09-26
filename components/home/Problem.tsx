import type { Dict } from '@/content/fr'
import type { Locale } from '@/lib/i18n'
import CommissionBars from '../charts/CommissionBars'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'

export default function Problem({ lang, t }: { lang: Locale; t: Dict }) {
  const p = t.home.problem
  return (
    <section className="relative py-16 lg:py-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} />
          <dl className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {p.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 lg:flex lg:items-center lg:gap-6 lg:py-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="lg:flex lg:items-center lg:gap-6">
                  <p className="whitespace-nowrap text-3xl font-semibold tracking-tight text-white lg:w-36 lg:shrink-0" dir="ltr">{s.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300 lg:mt-0">{s.label}</p>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <Reveal delay={120} className="min-w-0">
          <CommissionBars lang={lang} t={t} />
        </Reveal>
      </div>
    </section>
  )
}
