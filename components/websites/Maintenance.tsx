import type { Dict } from '@/content/fr'
import { formatMAD, type Locale } from '@/lib/i18n'
import { ADDONS, MAINTENANCE_PRICE } from '@/lib/packs'
import { IconCheck, IconShield } from '../Icons'
import Reveal from '../Reveal'

export default function Maintenance({ lang, t }: { lang: Locale; t: Dict }) {
  const m = t.websites.maintenance
  const a = t.websites.addons
  return (
    <section className="relative py-16 lg:py-24">
      <div className="container-x grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-mint-400/30 bg-gradient-to-br from-ink-700 to-ink-900 p-8 sm:p-10">
          <div aria-hidden className="absolute -end-20 -top-20 h-60 w-60 rounded-full bg-mint-400/20 blur-3xl" />
          <p className="eyebrow">{m.eyebrow}</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{m.title}</h2>
            <p className="text-end">
              <span className="text-4xl font-semibold tabular-nums text-white" dir="ltr">{formatMAD(MAINTENANCE_PRICE, lang)}</span>
              <span className="ms-1 text-ink-300">{t.common.perMonth}</span>
            </p>
          </div>
          <p className="mt-4 max-w-lg text-ink-300">{m.subtitle}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {m.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm text-ink-200">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-400/15 text-mint-300"><IconCheck className="h-3 w-3" /></span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6 text-sm">
            <IconShield className="text-mint-300" />
            <span className="font-semibold text-white">{m.yearly}</span>
            <span className="text-ink-400">{m.note}</span>
          </div>
        </Reveal>

        <Reveal delay={120} className="rounded-[2rem] border border-white/8 bg-ink-850 p-8 sm:p-10">
          <p className="eyebrow">{a.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{a.title}</h2>
          <ul className="mt-7 divide-y divide-white/8">
            {ADDONS.map((ad) => (
              <li key={ad.id} className="flex items-center justify-between gap-4 py-3.5 text-sm">
                <span className="text-ink-200">{a.items[ad.id as keyof typeof a.items]}</span>
                <span className="shrink-0 font-semibold tabular-nums text-white" dir="ltr">
                  {ad.price === null ? t.common.onQuote : `${ad.from ? `${t.common.from} ` : ''}${formatMAD(ad.price, lang)}`}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
