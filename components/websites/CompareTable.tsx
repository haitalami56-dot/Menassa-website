import type { Dict } from '@/content/fr'
import { formatMAD, type Locale } from '@/lib/i18n'
import { PACKS } from '@/lib/packs'
import { IconCheck, IconMinus } from '../Icons'
import Reveal from '../Reveal'

function Cell({ v, t }: { v: string; t: Dict }) {
  if (v === 'yes')
    return (
      <span className="inline-flex items-center gap-1.5 text-mint-700">
        <IconCheck className="h-4 w-4" /> <span className="sr-only">{t.common.included}</span>
      </span>
    )
  if (v === 'no')
    return (
      <span className="inline-flex items-center gap-1.5 text-ink-400">
        <IconMinus className="h-4 w-4" /> <span className="text-xs">{t.common.notIncluded}</span>
      </span>
    )
  return <span>{v}</span>
}

export default function CompareTable({ lang, t }: { lang: Locale; t: Dict }) {
  const c = t.websites.compare
  const names = t.websites.packs.items
  return (
    <section className="bg-paper pb-24 text-ink-900 lg:pb-32">
      <div className="container-x">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{c.title}</h2>
        </Reveal>
        <div className="relative mt-8 overflow-x-auto rounded-3xl border border-line bg-white">
          <table className="w-full min-w-[44rem] text-sm">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="w-[28%] p-5 text-start font-medium text-ink-600">{c.feature}</th>
                {PACKS.map((p) => (
                  <th key={p.id} scope="col" className={`p-5 text-start ${p.recommended ? 'bg-mint-400/10' : ''}`}>
                    <span className="block text-base font-semibold text-ink-900">
                      {names[p.id].name}
                      {p.recommended && <span className="ms-2 rounded-full bg-mint-400 px-2 py-0.5 text-[0.65rem] font-bold uppercase text-ink-950">{t.common.recommended}</span>}
                    </span>
                    <span className="mt-1 block font-normal tabular-nums text-ink-600" dir="ltr">{formatMAD(p.price, lang)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row, i) => (
                <tr key={row.label} className={i % 2 ? 'bg-paper/60' : ''}>
                  <th scope="row" className="p-4 ps-5 text-start font-medium text-ink-700">{row.label}</th>
                  {row.values.map((v, j) => (
                    <td key={j} className={`p-4 text-ink-700 ${PACKS[j].recommended ? 'bg-mint-400/10' : ''}`}>
                      <Cell v={v} t={t} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
