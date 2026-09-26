'use client'

import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import type { Dict } from '@/content/fr'
import { formatMAD, formatNumber, type Locale } from '@/lib/i18n'
import { packPrice } from '@/lib/packs'
import { useWidth } from './useWidth'

const COST = '#cf742b' // commission (the thing you stop paying)
const SITE = '#1fa474' // Pack Pro
const SURFACE = '#0f2140'
const MONTHS = 24

function Slider({
  id, label, value, min, max, step, onChange, display,
}: {
  id: string; label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; display: string
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm text-ink-300">{label}</label>
        <output htmlFor={id} className="text-base font-semibold tabular-nums text-white" dir="ltr">{display}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full"
      />
    </div>
  )
}

export default function SavingsCalculator({ lang, t }: { lang: Locale; t: Dict }) {
  const c = t.websites.calculator
  const pack = packPrice('pro')
  const [price, setPrice] = useState(800)
  const [nights, setNights] = useState(20)
  const [rate, setRate] = useState(18)
  const [share, setShare] = useState(30)
  const [idx, setIdx] = useState<number | null>(null)
  const [showTable, setShowTable] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  const monthlyCommission = price * nights * (rate / 100)
  const monthlySaved = monthlyCommission * (share / 100)
  const yearlyCommission = monthlyCommission * 12
  const yearlySaved = monthlySaved * 12
  const breakEven = monthlySaved > 0 ? Math.ceil(pack / monthlySaved) : Infinity

  const series = useMemo(() => Array.from({ length: MONTHS + 1 }, (_, m) => ({ m, saved: monthlySaved * m })), [monthlySaved])

  // Chart geometry
  const [boxRef, W] = useWidth<HTMLDivElement>()
  const H = W < 440 ? 240 : 300
  const pad = { top: 20, right: 16, bottom: 36, left: 44 }
  const innerW = W - pad.left - pad.right
  const innerH = H - pad.top - pad.bottom
  const rawMax = Math.max(pack * 1.2, series[MONTHS].saved)
  const niceStep = [5000, 10000, 20000, 25000, 50000, 100000].find((s) => rawMax / s <= 5) ?? 200000
  const yMax = Math.ceil(rawMax / niceStep) * niceStep
  const ticks = Array.from({ length: yMax / niceStep + 1 }, (_, i) => i * niceStep)
  const x = (m: number) => pad.left + (m / MONTHS) * innerW
  const y = (v: number) => pad.top + innerH - (v / yMax) * innerH

  const linePath = series.map((p, i) => `${i ? 'L' : 'M'}${x(p.m).toFixed(1)},${y(p.saved).toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${x(MONTHS)},${y(0)} L${x(0)},${y(0)} Z`
  const beX = Number.isFinite(breakEven) && breakEven <= MONTHS ? x(pack / monthlySaved) : null

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * W
    const m = Math.round(((px - pad.left) / innerW) * MONTHS)
    setIdx(Math.min(MONTHS, Math.max(0, m)))
  }
  const onKey = (e: KeyboardEvent<SVGSVGElement>) => {
    if (e.key === 'ArrowRight') setIdx((v) => Math.min(MONTHS, (v ?? 0) + 1))
    if (e.key === 'ArrowLeft') setIdx((v) => Math.max(0, (v ?? 0) - 1))
  }

  const fmt = (v: number) => formatMAD(v, lang)
  const kFmt = (v: number) => (v >= 1000 ? `${formatNumber(v / 1000, lang)}k` : `${v}`)

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.3fr]">
      {/* Inputs */}
      <div className="glass flex min-w-0 flex-col gap-6 rounded-3xl p-6 sm:p-7">
        <Slider id="calc-price" label={c.price} value={price} min={200} max={3000} step={50} onChange={setPrice} display={fmt(price)} />
        <Slider id="calc-nights" label={c.nights} value={nights} min={2} max={60} step={1} onChange={setNights} display={`${nights}`} />
        <Slider id="calc-rate" label={c.rate} value={rate} min={10} max={25} step={1} onChange={setRate} display={`${rate} %`} />
        <Slider id="calc-share" label={c.share} value={share} min={10} max={60} step={5} onChange={setShare} display={`${share} %`} />
        <p className="text-xs leading-relaxed text-ink-400">{c.disclaimer}</p>
      </div>

      {/* Results + chart */}
      <div className="min-w-0 rounded-3xl border border-white/8 p-5 sm:p-7" style={{ background: SURFACE }}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-ink-300">{c.yearly}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-white" aria-live="polite">{fmt(yearlyCommission)}</p>
          </div>
          <div>
            <p className="text-xs text-ink-300">{c.saved}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-mint-300" aria-live="polite">{fmt(yearlySaved)}</p>
          </div>
          <div>
            <p className="text-xs text-ink-300">{c.breakEven}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-white" aria-live="polite">
              {Number.isFinite(breakEven) && breakEven <= MONTHS ? `${breakEven} ${c.months}` : c.never}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-white">{c.chartTitle}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-300">
            <li className="inline-flex items-center gap-2"><span className="h-0.5 w-4 rounded" style={{ background: COST }} />{c.legendSaved}</li>
            <li className="inline-flex items-center gap-2"><span className="h-0.5 w-4 rounded" style={{ background: SITE }} />{c.legendPack}</li>
          </ul>
        </div>

        <div ref={boxRef} className="relative mt-3 w-full min-w-0" dir="ltr">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            height={H}
            className="block h-auto max-w-full touch-none"
            role="img"
            tabIndex={0}
            aria-label={`${c.chartTitle}. ${c.breakEven} ${Number.isFinite(breakEven) ? breakEven : '-'} ${c.months}.`}
            onPointerMove={onMove}
            onPointerLeave={() => setIdx(null)}
            onKeyDown={onKey}
            onFocus={() => setIdx((v) => v ?? 12)}
            onBlur={() => setIdx(null)}
          >
            {ticks.map((tk) => (
              <g key={tk}>
                <line x1={pad.left} x2={W - pad.right} y1={y(tk)} y2={y(tk)} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
                <text x={pad.left - 10} y={y(tk)} textAnchor="end" dominantBaseline="middle" fontSize={12} fill="#7d93b5">{kFmt(tk)}</text>
              </g>
            ))}
            {[0, 6, 12, 18, 24].map((m) => (
              <text key={m} x={x(m)} y={H - 12} textAnchor="middle" fontSize={12} fill="#7d93b5">{m}</text>
            ))}
            <text x={W - pad.right} y={H - 12} textAnchor="end" fontSize={12} fill="#7d93b5" dx={-22}>{c.axisMonth}</text>

            <path d={areaPath} fill={COST} opacity={0.1} />
            <line x1={x(0)} x2={x(MONTHS)} y1={y(pack)} y2={y(pack)} stroke={SITE} strokeWidth={2} strokeLinecap="round" />
            <path d={linePath} fill="none" stroke={COST} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

            {beX !== null && (
              <g>
                <line x1={beX} x2={beX} y1={pad.top} y2={pad.top + innerH} stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
                <circle cx={beX} cy={y(pack)} r={5} fill="#ffffff" stroke={SURFACE} strokeWidth={2} />
              </g>
            )}
            {/* end labels */}
            <circle cx={x(MONTHS)} cy={y(series[MONTHS].saved)} r={4.5} fill={COST} stroke={SURFACE} strokeWidth={2} />

            {idx !== null && (
              <g pointerEvents="none">
                <line x1={x(idx)} x2={x(idx)} y1={pad.top} y2={pad.top + innerH} stroke="rgba(255,255,255,0.35)" strokeWidth={1} />
                <circle cx={x(idx)} cy={y(series[idx].saved)} r={5} fill={COST} stroke={SURFACE} strokeWidth={2} />
                <circle cx={x(idx)} cy={y(pack)} r={5} fill={SITE} stroke={SURFACE} strokeWidth={2} />
              </g>
            )}
          </svg>

          {idx !== null && (
            <div
              className="pointer-events-none absolute top-2 z-10 min-w-40 rounded-xl border border-white/10 bg-ink-950/95 px-3 py-2 text-xs shadow-xl"
              style={{ left: `${(x(idx) / W) * 100}%`, transform: `translateX(${idx > MONTHS / 2 ? 'calc(-100% - 12px)' : '12px'})` }}
            >
              <p className="text-ink-400">{c.tableMonth} {idx}</p>
              <p className="mt-1 flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-ink-300"><span className="h-0.5 w-3 rounded" style={{ background: COST }} />{c.tableSaved}</span>
                <span className="font-semibold tabular-nums text-white">{fmt(series[idx].saved)}</span>
              </p>
              <p className="mt-1 flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-ink-300"><span className="h-0.5 w-3 rounded" style={{ background: SITE }} />{c.tablePack}</span>
                <span className="font-semibold tabular-nums text-white">{fmt(pack)}</span>
              </p>
            </div>
          )}
        </div>

        <button type="button" onClick={() => setShowTable((v) => !v)} className="mt-4 text-xs font-medium text-mint-300 underline-offset-4 hover:underline" aria-expanded={showTable}>
          {showTable ? t.common.hideTable : t.common.viewTable}
        </button>
        {showTable && (
          <div className="mt-3 max-h-64 overflow-y-auto">
            <table className="w-full text-sm text-ink-200">
              <thead>
                <tr className="text-xs text-ink-400">
                  <th className="py-1.5 text-start font-medium">{c.tableMonth}</th>
                  <th className="py-1.5 text-end font-medium">{c.tableSaved}</th>
                  <th className="py-1.5 text-end font-medium">{c.tablePack}</th>
                </tr>
              </thead>
              <tbody>
                {series.filter((p) => p.m % 3 === 0).map((p) => (
                  <tr key={p.m} className="border-t border-white/8">
                    <td className="py-1.5">{p.m}</td>
                    <td className="py-1.5 text-end tabular-nums">{fmt(p.saved)}</td>
                    <td className="py-1.5 text-end tabular-nums">{fmt(pack)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
