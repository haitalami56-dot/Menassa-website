import Link from 'next/link'
import type { Dict } from '@/content/fr'
import type { Locale } from '@/lib/i18n'
import PageHero from '../PageHero'
import Reveal from '../Reveal'
import AiosOrbit from '../AiosOrbit'
import WaitlistForm from '../forms/WaitlistForm'
import { IconArrow, IconBot, IconCheck, IconClock, IconLayers, IconPhone, IconSpark } from '../Icons'
import AgentFlow from './AgentFlow'

type Kind = 'automations' | 'apps' | 'aios'

export default function ComingSoon({ lang, t, kind }: { lang: Locale; t: Dict; kind: Kind }) {
  const s = t.soon
  const data = s[kind]
  const values = 'values' in data ? data.values : []
  const steps = 'steps' in data ? data.steps : []
  const valueIcons = kind === 'apps' ? [IconPhone, IconClock, IconLayers] : [IconClock, IconBot, IconSpark]

  return (
    <>
      <PageHero
        eyebrow={data.eyebrow}
        title={data.title}
        subtitle={data.subtitle}
        badge={
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${kind === 'aios' ? 'bg-mint-400 text-ink-950' : 'bg-white/10 text-ink-200'}`}>
            {s.badge}
          </span>
        }
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#waitlist" className="btn btn-primary">
            {s.waitlist.title} <IconArrow className="h-4 w-4" />
          </a>
        </div>
      </PageHero>

      {kind === 'aios' ? (
        <section className="py-20 lg:py-28">
          <div className="container-x grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <AiosOrbit t={t} />
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.soon.aios.pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 80} className="rounded-2xl border border-white/8 bg-ink-850 p-6">
                  <p className="text-xs font-semibold text-mint-400" dir="ltr">0{i + 1}</p>
                  <h2 className="mt-2 text-lg font-semibold text-white">{p.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{p.desc}</p>
                </Reveal>
              ))}
              <Reveal delay={320} className="sm:col-span-2">
                <ul className="grid gap-3 rounded-2xl border border-mint-400/25 bg-mint-400/5 p-6">
                  {t.soon.aios.extras.map((e) => (
                    <li key={e} className="flex gap-2.5 text-sm text-ink-200">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" /> {e}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 lg:py-28">
          <div className="container-x">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{s.valueTitle}</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {values.map((v, i) => {
                const Icon = valueIcons[i]
                return (
                  <Reveal key={v.title} delay={i * 90} className="rounded-3xl border border-white/8 bg-ink-850 p-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint-400/15 text-mint-300"><Icon /></span>
                    <h3 className="mt-5 text-lg font-semibold text-white">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-300">{v.desc}</p>
                  </Reveal>
                )
              })}
            </div>

            <div className="mt-20 grid gap-10 lg:grid-cols-2">
              <Reveal>
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{s.howTitle}</h2>
                <ol className="mt-8 grid gap-4 sm:grid-cols-2">
                  {steps.map((st, i) => (
                    <li key={st} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-mint-400/40 text-sm font-semibold text-mint-300">{i + 1}</span>
                      <span className="text-sm text-ink-200">{st}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
              {kind === 'automations' && (
                <Reveal delay={120} className="rounded-3xl border border-white/8 bg-ink-850 p-7">
                  <p className="eyebrow">{s.proofTitle}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{t.soon.automations.proof.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{t.soon.automations.proof.text}</p>
                  <div className="mt-6">
                    <AgentFlow steps={t.work.flow} />
                  </div>
                  <Link href={`/${lang}/realisations/gifty-art`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mint-300">
                    {t.common.readCase} <IconArrow className="h-4 w-4" />
                  </Link>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      <section id="waitlist" className="scroll-mt-24 pb-24">
        <div className="container-x grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-mint-400/30 bg-gradient-to-br from-ink-700 to-ink-900 p-8 sm:p-10">
            <div aria-hidden className="absolute -end-16 -top-16 h-48 w-48 rounded-full bg-mint-400/20 blur-3xl" />
            <h2 className="text-3xl font-semibold tracking-tight text-white">{s.waitlist.title}</h2>
            <p className="mt-3 text-ink-300">{kind === 'aios' ? t.soon.aios.spots : s.waitlist.subtitle}</p>
            <div className="mt-8">
              <WaitlistForm lang={lang} t={t} offer={kind} />
            </div>
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-center rounded-[2rem] border border-white/8 bg-white/[0.03] p-8 sm:p-10">
            <h2 className="text-2xl font-semibold text-white">{s.meanwhile}</h2>
            <p className="mt-3 text-ink-300">{s.meanwhileText}</p>
            <Link href={`/${lang}/sites-web`} className="btn btn-ghost mt-8 self-start">
              {t.common.seePacks} <IconArrow className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
