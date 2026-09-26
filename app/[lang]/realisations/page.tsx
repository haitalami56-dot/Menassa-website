import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDict, isLocale } from '@/lib/i18n'
import { pageMeta } from '@/lib/meta'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CtaBand from '@/components/CtaBand'
import { IconArrow, IconBot } from '@/components/Icons'

export async function generateMetadata({ params }: PageProps<'/[lang]/realisations'>) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = await getDict(lang)
  return pageMeta(lang, '/realisations', t.meta.work)
}

export default async function WorkPage({ params }: PageProps<'/[lang]/realisations'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getDict(lang)
  const w = t.work
  const asmaa = w.projects['riad-asmaa']
  const gifty = w.projects['gifty-art']

  return (
    <>
      <PageHero eyebrow={w.eyebrow} title={w.title} subtitle={w.subtitle} />
      <section className="pb-24">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <Reveal>
            <Link href={`/${lang}/realisations/riad-asmaa`} className="group block overflow-hidden rounded-[2rem] border border-white/8 bg-ink-850 transition-colors hover:border-mint-400/40">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src="/img/asmaa-site-desktop.webp" alt={asmaa.name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                <span className="absolute start-4 top-4 rounded-full bg-ink-950/80 px-3 py-1 text-xs font-semibold text-mint-300 backdrop-blur">{asmaa.kind}</span>
              </div>
              <div className="p-7">
                <p className="text-sm text-ink-400">{asmaa.place}</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">{asmaa.name}</h2>
                <p className="mt-2 text-ink-300">{asmaa.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint-300">{t.common.readCase} <IconArrow className="h-4 w-4" /></span>
              </div>
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <Link href={`/${lang}/realisations/gifty-art`} className="group block overflow-hidden rounded-[2rem] border border-white/8 bg-ink-850 transition-colors hover:border-mint-400/40">
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.2),transparent_65%)]">
                <div className="w-[62%] rounded-2xl border border-white/10 bg-[#0b141a] p-4 shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]" dir="ltr">
                  <div className="flex items-center gap-2 border-b border-white/8 pb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint-400 text-ink-950"><IconBot className="h-4 w-4" /></span>
                    <span className="text-sm font-semibold text-white">Gifty Art</span>
                  </div>
                  <p className="mt-3 max-w-[80%] rounded-xl rounded-tr-sm bg-[#005c4b] px-3 py-2 text-xs text-white ms-auto">Salam, bghit lampe b smiya dyal binti.</p>
                  <p className="mt-2 max-w-[85%] rounded-xl rounded-tl-sm bg-[#1f2c34] px-3 py-2 text-xs text-white">Avec plaisir ! Quel prénom et quelle couleur ? Je prépare votre commande.</p>
                </div>
                <span className="absolute start-4 top-4 rounded-full bg-ink-950/80 px-3 py-1 text-xs font-semibold text-mint-300 backdrop-blur">{gifty.kind}</span>
              </div>
              <div className="p-7">
                <p className="text-sm text-ink-400">{gifty.place}</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">{gifty.name}</h2>
                <p className="mt-2 text-ink-300">{gifty.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint-300">{t.common.readCase} <IconArrow className="h-4 w-4" /></span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>
      <CtaBand lang={lang} t={t} title={w.next} subtitle={t.home.cta.subtitle} />
    </>
  )
}
