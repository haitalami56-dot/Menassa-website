import { notFound } from 'next/navigation'
import { getDict, isLocale } from '@/lib/i18n'
import { pageMeta } from '@/lib/meta'
import LegalPage from '@/components/LegalPage'

export async function generateMetadata({ params }: PageProps<'/[lang]/confidentialite'>) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = await getDict(lang)
  return pageMeta(lang, '/confidentialite', t.meta.privacy)
}

export default async function Page({ params }: PageProps<'/[lang]/confidentialite'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getDict(lang)
  return <LegalPage title={t.privacy.title} sections={t.privacy.sections} />
}
