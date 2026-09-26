import Link from 'next/link'
import type { Dict } from '@/content/fr'
import { formatMAD, type Locale } from '@/lib/i18n'
import { PACKS } from '@/lib/packs'
import { IconArrow, IconCheck } from './Icons'
import Reveal from './Reveal'

export default function PackCards({ lang, t, compact = false }: { lang: Locale; t: Dict; compact?: boolean }) {
  const items = t.websites.packs.items
  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-3">
      {PACKS.map((pack, i) => {
        const p = items[pack.id]
        const rec = pack.recommended
        const features = compact ? p.features.slice(0, 5) : p.features
        return (
          <Reveal key={pack.id} delay={i * 90} className={rec ? 'lg:-my-4' : ''}>
            <article
              className={`relative flex h-full flex-col rounded-3xl p-7 sm:p-8 ${
                rec
                  ? 'bg-ink-900 text-white shadow-[0_40px_80px_-30px_rgba(16,185,129,0.55)] ring-2 ring-mint-400'
                  : 'border border-line bg-white text-ink-900'
              }`}
            >
              {rec && (
                <p className="absolute -top-3.5 start-1/2 -translate-x-1/2 rounded-full bg-mint-400 px-4 py-1 text-xs font-bold uppercase tracking-wider text-ink-950 rtl:translate-x-1/2">
                  {t.common.recommended}
                </p>
              )}
              <h3 className={`text-lg font-semibold ${rec ? 'text-mint-300' : 'text-mint-700'}`}>{p.name}</h3>
              <p className={`mt-1.5 min-h-[3rem] text-sm leading-relaxed ${rec ? 'text-ink-300' : 'text-ink-600'}`}>{p.tagline}</p>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight tabular-nums" dir="ltr">{formatMAD(pack.price, lang)}</span>
              </p>
              <p className={`mt-1 text-xs ${rec ? 'text-ink-400' : 'text-ink-600'}`}>
                {t.common.delivery} · {p.delivery} {t.common.days}
              </p>
              <Link
                href={`/${lang}/demarrer?pack=${pack.id}`}
                className={`btn mt-6 w-full ${rec ? 'btn-primary' : 'btn-dark'}`}
                data-track={`pack-${pack.id}`}
              >
                {t.common.choose} {p.name} <IconArrow className="h-4 w-4" />
              </Link>
              <ul className="mt-7 space-y-3 text-sm">
                {features.map((f, j) => {
                  const heading = j === 0 && pack.id !== 'essentiel'
                  return (
                    <li key={f} className={`flex gap-2.5 ${heading ? 'font-semibold' : ''}`}>
                      {!heading && (
                        <span className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${rec ? 'bg-mint-400/20 text-mint-300' : 'bg-mint-600/12 text-mint-700'}`}>
                          <IconCheck className="h-3 w-3" />
                        </span>
                      )}
                      <span className={rec ? 'text-ink-200' : 'text-ink-700'}>{f}</span>
                    </li>
                  )
                })}
              </ul>
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}
