'use client'

import { useState } from 'react'
import type { Dict } from '@/content/fr'
import { formatMAD, formatNumber, type Locale } from '@/lib/i18n'
import { useWidth } from './useWidth'

const COST = '#cf742b'
const SITE = '#1fa474'
const SURFACE = '#0f2140'

// Example riad: 800 MAD/night, 20 nights a month, 12 months.
const YEARLY_BASE = 800 * 20 * 12

export default function CommissionBars({ lang, t }: { lang: Locale; t: Dict }) {
  const c = t.home.problem.chart
  const data = [
    { label: c.bars[0], value: YEARLY_BASE * 0.15, kind: 'cost' as const },
    { label: c.bars[1], value: YEARLY_BASE * 0.2, kind: 'cost' as const },
    { label: c.bars[2], value: YEARLY_BASE * 0.25, kind: 'cost' as const },
    { label: c.bars[3], value: 9999, kind: 'site' as const },
  ]
  const [hover, setHover] = useState<number | null>(null)
  const [showTable, setShowTable] = useState(false)

  const [boxRef, W] = useWidth<HTMLDivElement>()
  const narrow = W < 440
  const H = narrow ? 260 : 300
  const pad = { top: 28, right: 8, bottom: narrow ? 52 : 44, left: 40 }
  const innerW = W - pad.left - pad.right
  const innerH = H - pad.top - pad.bottom
  const max = 50000
  const ticks = [0, 10000, 20000, 30000, 40000, 50000]
  const band = innerW / data.length
  const barW = 24
  const y = (v: number) => pad.top + innerH - (v / max) * innerH

  return (
    <figure className="min-w-0 rounded-3xl border border-white/8 p-5 sm:p-7" style={{ background: SURFACE }}>
      <figcaption>
        <p className="text-base font-semibold text-white">{c.title}</p>
        <p className="mt-1 text-sm text-ink-300">{c.subtitle}</p>
      </figcaption>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-300">
        <li className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: COST }} />{c.legendCommission}</li>
        <li className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: SITE }} />{c.legendSite}</li>
      </ul>

      <div ref={boxRef} className="relative mt-4 w-full min-w-0" dir="ltr">
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="block h-auto max-w-full" role="img" aria-label={`${c.title}. ${data.map((d) => `${d.label}: ${formatMAD(d.value, lang)}`).join(', ')}`}>
          {ticks.map((tk) => (
            <g key={tk}>
              <line x1={pad.left} x2={W - pad.right} y1={y(tk)} y2={y(tk)} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
              <text x={pad.left - 10} y={y(tk)} textAnchor="end" dominantBaseline="middle" fontSize={12} fill="#7d93b5">
                {tk === 0 ? '0' : `${tk / 1000}k`}
              </text>
            </g>
          ))}
          {data.map((d, i) => {
            const cx = pad.left + band * i + band / 2
            const top = y(d.value)
            const r = 4
            const x0 = cx - barW / 2
            const path = `M${x0},${pad.top + innerH} V${top + r} Q${x0},${top} ${x0 + r},${top} H${x0 + barW - r} Q${x0 + barW},${top} ${x0 + barW},${top + r} V${pad.top + innerH} Z`
            const active = hover === i
            return (
              <g key={d.label}>
                <path d={path} fill={d.kind === 'cost' ? COST : SITE} opacity={hover === null || active ? 1 : 0.55} style={{ transition: 'opacity .2s' }} />
                <text x={cx} y={top - 9} textAnchor="middle" fontSize={13} fontWeight={600} fill="#ffffff">
                  {formatNumber(d.value, lang)}
                </text>
                {narrow ? (
                  d.label.split(' ').reduce<string[]>((lines, w) => { const last = lines[lines.length - 1]; if (last && (last + ' ' + w).length <= 11) lines[lines.length - 1] = last + ' ' + w; else lines.push(w); return lines }, []).map((line, li) => (
                    <text key={li} x={cx} y={H - pad.bottom + 18 + li * 14} textAnchor="middle" fontSize={11} fill="#a9b8cf">{line}</text>
                  ))
                ) : (
                  <text x={cx} y={H - pad.bottom + 20} textAnchor="middle" fontSize={12} fill="#a9b8cf">
                    {d.label}
                  </text>
                )}
                {/* hit target bigger than the mark */}
                <rect
                  x={cx - band / 2 + 4}
                  y={pad.top}
                  width={band - 8}
                  height={innerH + 4}
                  fill="transparent"
                  tabIndex={0}
                  role="button"
                  aria-label={`${d.label}: ${formatMAD(d.value, lang)}`}
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  style={{ outline: 'none', cursor: 'default' }}
                />
                
              </g>
            )
          })}
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-xl border border-white/10 bg-ink-950/95 px-3 py-2 text-xs shadow-xl"
            style={{ left: `${((pad.left + band * hover + band / 2) / W) * 100}%`, top: `${(y(data[hover].value) / H) * 100 - 20}%` }}
          >
            <p className="text-sm font-semibold text-white">{formatMAD(data[hover].value, lang)}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-ink-300">
              <span className="h-0.5 w-3 rounded" style={{ background: data[hover].kind === 'cost' ? COST : SITE }} />
              {data[hover].label}
            </p>
          </div>
        )}
      </div>

      <p className="mt-3 text-xs text-ink-400">{c.note}</p>

      <button type="button" onClick={() => setShowTable((v) => !v)} className="mt-3 text-xs font-medium text-mint-300 underline-offset-4 hover:underline" aria-expanded={showTable}>
        {showTable ? t.common.hideTable : t.common.viewTable}
      </button>
      {showTable && (
        <table className="mt-3 w-full text-start text-sm text-ink-200">
          <tbody>
            {data.map((d) => (
              <tr key={d.label} className="border-t border-white/8">
                <th scope="row" className="py-2 text-start font-normal text-ink-300">{d.label}</th>
                <td className="py-2 text-end font-semibold tabular-nums">{formatMAD(d.value, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </figure>
  )
}
