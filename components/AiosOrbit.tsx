import type { Dict } from '@/content/fr'
import { IconCalendar, IconLayers, IconLink, IconSpark } from './Icons'

// Visual of the Four Cs: a core with four pillars orbiting around it.
export default function AiosOrbit({ t }: { t: Dict }) {
  const pillars = t.soon.aios.pillars
  const icons = [IconLayers, IconLink, IconSpark, IconCalendar]
  const pos = ['top-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2', 'top-1/2 end-0 -translate-y-1/2', 'bottom-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2', 'top-1/2 start-0 -translate-y-1/2']
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
      <div aria-hidden className="absolute inset-[12%] rounded-full border border-dashed border-mint-400/25 animate-[spin_60s_linear_infinite]" />
      <div aria-hidden className="absolute inset-[26%] rounded-full border border-white/8" />
      <div aria-hidden className="absolute inset-[36%] rounded-full bg-mint-400/25 blur-2xl" />
      <div className="absolute inset-[34%] flex flex-col items-center justify-center rounded-full border border-mint-400/40 bg-gradient-to-b from-ink-700 to-ink-900 text-center shadow-[0_0_80px_-10px_rgba(52,211,153,0.5)]">
        <span className="text-2xl font-bold tracking-tight text-white sm:text-3xl" dir="ltr">AIOS</span>
        <span className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-mint-300">Menassa</span>
      </div>
      {pillars.map((p, i) => {
        const Icon = icons[i]
        return (
          <div key={p.title} className={`absolute ${pos[i]} glass flex w-36 flex-col items-center rounded-2xl px-3 py-3 text-center sm:w-40`}>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-mint-400/15 text-mint-300"><Icon className="h-4 w-4" /></span>
            <p className="mt-1.5 text-sm font-semibold text-white">{p.title}</p>
          </div>
        )
      })}
    </div>
  )
}
