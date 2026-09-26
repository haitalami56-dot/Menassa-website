import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDict, isLocale } from '@/lib/i18n'
import { pageMeta } from '@/lib/meta'
import { whatsappLink } from '@/lib/site'
import { IconCheck, IconWhatsApp } from '@/components/Icons'

export async function generateMetadata({ params }: PageProps<'/[lang]/merci'>) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = await getDict(lang)
  return { ...pageMeta(lang, '/merci', t.meta.thanks), robots: { index: false } }
}

export default async function ThanksPage({ params }: PageProps<'/[lang]/merci'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getDict(lang)
  const th = t.thanks

  return (
    <section className="relative isolate flex min-h-[80dvh] items-center overflow-hidden pt-28 pb-20">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute start-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-mint-500/20 blur-[120px]" />
      </div>
      <div className="container-x max-w-2xl text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint-400 text-ink-950 shadow-[0_0_60px_rgba(52,211,153,0.5)]">
          <IconCheck className="h-8 w-8" />
        </span>
        <h1 className="mt-8 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">{th.title}</h1>
        <p className="mt-4 text-lg text-ink-300">{th.subtitle}</p>
        <ol className="mx-auto mt-8 grid max-w-md gap-3 text-start">
          {th.steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-ink-200">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-mint-400/40 text-sm font-semibold text-mint-300">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={whatsappLink(t.common.whatsappHello)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <IconWhatsApp className="h-4 w-4" /> {th.whatsappCta}
          </a>
          <Link href={`/${lang}`} className="btn btn-ghost">{th.home}</Link>
        </div>
      </div>
    </section>
  )
}
