import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getDict, isLocale } from '@/lib/i18n'
import { pageMeta } from '@/lib/meta'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CtaBand from '@/components/CtaBand'
import { IconChart, IconEye, IconPin, IconSpark } from '@/components/Icons'

export async function generateMetadata({ params }: PageProps<'/[lang]/a-propos'>) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = await getDict(lang)
  return pageMeta(lang, '/a-propos', t.meta.about)
}

export default async function AboutPage({ params }: PageProps<'/[lang]/a-propos'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getDict(lang)
  const a = t.about
  const icons = [IconEye, IconChart, IconSpark, IconPin]

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} subtitle={a.intro} />

      <section className="pb-20">
        <div className="container-x">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-ink-850 p-10 sm:p-14">
            <Image src="/brand/menassa-wordmark.svg" alt="" width={881} height={318} aria-hidden className="pointer-events-none absolute -bottom-10 -end-10 w-[26rem] opacity-[0.06]" />
            <blockquote className="relative">
              <p lang="ar" dir="rtl" className="text-balance text-2xl font-medium leading-relaxed text-white sm:text-3xl">« {a.quote} »</p>
              {lang !== 'ar' && <footer className="mt-5 max-w-2xl text-ink-300">{a.quoteTranslation}</footer>}
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <Reveal><h2 className="text-3xl font-semibold tracking-tight text-white">{a.valuesTitle}</h2></Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {a.values.map((v, i) => {
              const Icon = icons[i]
              return (
                <Reveal key={v.title} delay={i * 80} className="rounded-3xl border border-white/8 bg-ink-850 p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint-400/15 text-mint-300"><Icon /></span>
                  <h3 className="mt-5 text-lg font-semibold text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{v.desc}</p>
                </Reveal>
              )
            })}
          </div>
          <Reveal className="mt-8 flex flex-col gap-3 rounded-3xl border border-mint-400/25 bg-mint-400/5 p-8 sm:flex-row sm:items-center sm:gap-6">
            <IconPin className="h-8 w-8 shrink-0 text-mint-300" />
            <div>
              <h2 className="text-xl font-semibold text-white">{a.locationTitle}</h2>
              <p className="mt-1 text-ink-300">{a.locationText}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand lang={lang} t={t} title={t.home.cta.title} subtitle={t.home.cta.subtitle} />
    </>
  )
}
