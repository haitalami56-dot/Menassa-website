import type { Dict } from '@/content/fr'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Process({ t }: { t: Dict }) {
  const p = t.home.process
  return (
    <section className="relative py-16 lg:py-24">
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} align="center" />
        <ol className="relative mt-16 grid gap-6 md:grid-cols-4">
          <div aria-hidden className="absolute inset-x-[12%] top-6 hidden h-px bg-gradient-to-r from-transparent via-mint-400/40 to-transparent md:block" />
          {p.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 110} className="relative text-center">
              <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-mint-400/40 bg-ink-900 text-base font-semibold text-mint-300 shadow-[0_0_0_6px_rgba(10,24,48,1)]">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-300">{s.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
