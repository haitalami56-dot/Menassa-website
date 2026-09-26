import { notFound } from 'next/navigation'
import { getDict, isLocale } from '@/lib/i18n'
import { pageMeta } from '@/lib/meta'
import { PACKS, type PackId } from '@/lib/packs'
import PageHero from '@/components/PageHero'
import StartForm from '@/components/forms/StartForm'

export async function generateMetadata({ params }: PageProps<'/[lang]/demarrer'>) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = await getDict(lang)
  return pageMeta(lang, '/demarrer', t.meta.start)
}

export default async function StartPage({ params, searchParams }: PageProps<'/[lang]/demarrer'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getDict(lang)
  const sp = await searchParams
  const requested = typeof sp.pack === 'string' ? sp.pack : ''
  const initialPack: PackId = PACKS.some((p) => p.id === requested) ? (requested as PackId) : 'pro'

  return (
    <>
      <PageHero eyebrow={t.start.eyebrow} title={t.start.title} subtitle={t.start.subtitle} />
      <section className="pb-24">
        <div className="container-x">
          <StartForm lang={lang} t={t} initialPack={initialPack} />
        </div>
      </section>
    </>
  )
}
