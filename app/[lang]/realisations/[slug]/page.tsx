import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getDict, isLocale, locales } from '@/lib/i18n'
import { pageMeta } from '@/lib/meta'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CtaBand from '@/components/CtaBand'
import AgentFlow from '@/components/soon/AgentFlow'
import { IconArrow, IconCheck } from '@/components/Icons'

const SLUGS = ['riad-asmaa', 'gifty-art'] as const
type Slug = (typeof SLUGS)[number]

export function generateStaticParams() {
  return locales.flatMap((lang) => SLUGS.map((slug) => ({ lang, slug })))
}

export async function generateMetadata({ params }: PageProps<'/[lang]/realisations/[slug]'>) {
  const { lang, slug } = await params
  if (!isLocale(lang) || !SLUGS.includes(slug as Slug)) return {}
  const t = await getDict(lang)
  const p = t.work.projects[slug as Slug]
  return pageMeta(lang, `/realisations/${slug}`, { title: `${p.name} | ${t.work.eyebrow} | Menassa`, description: p.summary })
}

export default async function CasePage({ params }: PageProps<'/[lang]/realisations/[slug]'>) {
  const { lang, slug } = await params
  if (!isLocale(lang) || !SLUGS.includes(slug as Slug)) notFound()
  const t = await getDict(lang)
  const w = t.work
  const p = w.projects[slug as Slug]
  const isAsmaa = slug === 'riad-asmaa'

  return (
    <>
      <PageHero
        eyebrow={`${w.eyebrow} · ${p.kind}`}
        title={p.name}
        subtitle={p.summary}
        badge={<span className="rounded-full bg-white/8 px-3 py-1 text-xs text-ink-300">{p.place}</span>}
      >
        {p.url && (
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-9">
            {t.common.visitSite} <IconArrow className="h-4 w-4" />
          </a>
        )}
      </PageHero>

      {isAsmaa && (
        <section className="pb-16">
          <div className="container-x">
            <Reveal className="grid gap-4 md:grid-cols-[2fr_1fr]">
              <div className="overflow-hidden rounded-3xl border border-white/10">
                <Image src="/img/asmaa-site-desktop.webp" alt={`${p.name}, page d’accueil`} width={1440} height={900} sizes="(min-width: 768px) 66vw, 100vw" className="h-auto w-full" priority />
              </div>
              <div className="grid grid-rows-2 gap-4">
                <div className="relative overflow-hidden rounded-3xl"><Image src="/img/asmaa-piscine.webp" alt="" fill sizes="33vw" className="object-cover" /></div>
                <div className="relative overflow-hidden rounded-3xl"><Image src="/img/asmaa-salon.webp" alt="" fill sizes="33vw" className="object-cover" /></div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="pb-24">
        <div className="container-x grid gap-8 lg:grid-cols-3">
          <Reveal className="rounded-3xl border border-white/8 bg-ink-850 p-8">
            <p className="eyebrow">{w.challenge}</p>
            <p className="mt-4 leading-relaxed text-ink-200">{p.challenge}</p>
          </Reveal>
          <Reveal delay={100} className="rounded-3xl border border-white/8 bg-ink-850 p-8">
            <p className="eyebrow">{w.solution}</p>
            <ul className="mt-4 space-y-3">
              {p.solution.map((s) => (
                <li key={s} className="flex gap-2.5 text-sm leading-relaxed text-ink-200">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" /> {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={200} className="rounded-3xl border border-mint-400/30 bg-gradient-to-b from-ink-700 to-ink-850 p-8">
            <p className="eyebrow">{w.result}</p>
            <p className="mt-4 leading-relaxed text-white">{p.result}</p>
          </Reveal>
        </div>

        {isAsmaa ? (
          <div className="container-x mt-8 grid gap-4 sm:grid-cols-3">
            {['/img/asmaa-chambre.webp', '/img/asmaa-terrasse.webp', '/img/asmaa-excursion.webp'].map((src, i) => (
              <Reveal key={src} delay={i * 80} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src={src} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="container-x mt-12">
            <Reveal className="mx-auto max-w-2xl rounded-3xl border border-white/8 bg-ink-850 p-8">
              <h2 className="text-xl font-semibold text-white">{w.flowTitle}</h2>
              <div className="mt-6"><AgentFlow steps={w.flow} /></div>
            </Reveal>
          </div>
        )}
      </section>

      <CtaBand lang={lang} t={t} title={w.next} subtitle={t.home.cta.subtitle} />
    </>
  )
}
