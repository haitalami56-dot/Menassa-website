import { notFound } from 'next/navigation'
import { getDict, isLocale } from '@/lib/i18n'
import { pageMeta } from '@/lib/meta'
import Hero from '@/components/home/Hero'
import TrustMarquee from '@/components/home/TrustMarquee'
import Problem from '@/components/home/Problem'
import Offers from '@/components/home/Offers'
import Featured from '@/components/home/Featured'
import Process from '@/components/Process'
import PacksTeaser from '@/components/home/PacksTeaser'
import AiosBand from '@/components/home/AiosBand'
import Faq from '@/components/Faq'
import CtaBand from '@/components/CtaBand'

export async function generateMetadata({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = await getDict(lang)
  return pageMeta(lang, '', t.meta.home)
}

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getDict(lang)
  return (
    <>
      <Hero lang={lang} t={t} />
      <TrustMarquee t={t} />
      <Problem lang={lang} t={t} />
      <Offers lang={lang} t={t} />
      <Featured lang={lang} t={t} />
      <Process t={t} />
      <PacksTeaser lang={lang} t={t} />
      <AiosBand lang={lang} t={t} />
      <Faq title={t.home.faq.title} items={t.home.faq.items} />
      <CtaBand lang={lang} t={t} title={t.home.cta.title} subtitle={t.home.cta.subtitle} />
    </>
  )
}
