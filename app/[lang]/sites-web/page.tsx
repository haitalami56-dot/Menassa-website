import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDict, isLocale } from '@/lib/i18n'
import { pageMeta } from '@/lib/meta'
import { whatsappLink } from '@/lib/site'
import PageHero from '@/components/PageHero'
import SectionHeading from '@/components/SectionHeading'
import SavingsCalculator from '@/components/charts/SavingsCalculator'
import PackCards from '@/components/PackCards'
import CompareTable from '@/components/websites/CompareTable'
import Maintenance from '@/components/websites/Maintenance'
import Featured from '@/components/home/Featured'
import Process from '@/components/Process'
import Faq from '@/components/Faq'
import CtaBand from '@/components/CtaBand'
import Reveal from '@/components/Reveal'
import { IconArrow, IconCard, IconCheck, IconEye, IconWhatsApp } from '@/components/Icons'

export async function generateMetadata({ params }: PageProps<'/[lang]/sites-web'>) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = await getDict(lang)
  return pageMeta(lang, '/sites-web', t.meta.websites)
}

export default async function WebsitesPage({ params }: PageProps<'/[lang]/sites-web'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getDict(lang)
  const w = t.websites

  return (
    <>
      <PageHero eyebrow={w.hero.eyebrow} title={w.hero.title} subtitle={w.hero.subtitle}>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="#packs" className="btn btn-primary">
            {t.common.seePacks} <IconArrow className="h-4 w-4" />
          </Link>
          <a href={whatsappLink(`${t.common.whatsappHello} (${w.hero.eyebrow})`)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <IconWhatsApp className="h-4 w-4 text-[#25D366]" /> {t.common.whatsapp}
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-300">
          {w.hero.points.map((p) => (
            <li key={p} className="inline-flex items-center gap-2">
              <IconCheck className="h-4 w-4 text-mint-400" /> {p}
            </li>
          ))}
        </ul>
        {/* Device strip */}
        <Reveal className="relative mt-14 hidden md:block">
          <div className="relative mx-auto grid max-w-5xl grid-cols-[1fr_0.28fr] items-end gap-6">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
              <Image src="/img/asmaa-site-desktop.webp" alt="Riad Asmaa, site réalisé par Menassa" width={1440} height={900} sizes="(min-width: 1024px) 760px, 70vw" className="h-auto w-full" />
            </div>
            <div className="overflow-hidden rounded-[1.6rem] border-4 border-ink-950 shadow-2xl ring-1 ring-white/10">
              <Image src="/img/asmaa-site-mobile.webp" alt="" width={780} height={1688} sizes="220px" className="h-auto w-full" />
            </div>
          </div>
        </Reveal>
      </PageHero>

      <section className="relative py-24 lg:py-28" id="calculateur">
        <div className="container-x">
          <SectionHeading eyebrow={w.calculator.eyebrow} title={w.calculator.title} subtitle={w.calculator.subtitle} />
          <div className="mt-12">
            <SavingsCalculator lang={lang} t={t} />
          </div>
        </div>
      </section>

      <section className="relative scroll-mt-20 bg-paper pt-24 pb-16 text-ink-900 lg:pt-32" id="packs">
        <div className="container-x">
          <SectionHeading eyebrow={w.packs.eyebrow} title={w.packs.title} subtitle={w.packs.subtitle} align="center" tone="light" />
          <div className="mt-16">
            <PackCards lang={lang} t={t} />
          </div>
          <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-ink-600">
            <IconCard className="h-4 w-4 text-mint-700" /> {t.footer.payments}
          </p>
        </div>
      </section>
      <CompareTable lang={lang} t={t} />

      <Maintenance lang={lang} t={t} />

      <section className="pb-8">
        <div className="container-x">
          <Reveal className="flex flex-col items-start gap-6 rounded-[2rem] border border-white/8 bg-white/[0.03] p-8 sm:flex-row sm:items-center sm:p-10">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-mint-400 text-ink-950"><IconEye className="h-7 w-7" /></span>
            <div>
              <h2 className="text-2xl font-semibold text-white">{w.guarantee.title}</h2>
              <p className="mt-2 max-w-3xl text-ink-300">{w.guarantee.text}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <Featured lang={lang} t={t} />
      <Process t={t} />
      <Faq title={w.faq.title} items={w.faq.items} />
      <CtaBand lang={lang} t={t} title={w.cta.title} subtitle={w.cta.subtitle} />
    </>
  )
}
