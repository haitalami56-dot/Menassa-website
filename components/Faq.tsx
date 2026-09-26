import { IconPlus } from './Icons'
import Reveal from './Reveal'

export default function Faq({ title, items, tone = 'dark' }: { title: string; items: { q: string; a: string }[]; tone?: 'dark' | 'light' }) {
  const light = tone === 'light'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  }
  return (
    <section className={`py-16 lg:py-24 ${light ? 'bg-paper text-ink-900' : ''}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl ${light ? 'text-ink-900' : 'text-white'}`}>{title}</h2>
        </Reveal>
        <div className={`divide-y ${light ? 'divide-line border-y border-line' : 'divide-white/10 border-y border-white/10'}`}>
          {items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex items-center justify-between gap-6">
                <span className={`text-base font-medium sm:text-lg ${light ? 'text-ink-900' : 'text-white'}`}>{item.q}</span>
                <span className={`faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform ${light ? 'bg-ink-900/5 text-ink-900' : 'bg-white/8 text-white'}`}>
                  <IconPlus className="h-4 w-4" />
                </span>
              </summary>
              <p className={`mt-3 max-w-2xl leading-relaxed ${light ? 'text-ink-600' : 'text-ink-300'}`}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
