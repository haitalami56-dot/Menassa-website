import { notFound } from 'next/navigation'
import { getDict, isLocale } from '@/lib/i18n'
import { pageMeta } from '@/lib/meta'
import LegalPage from '@/components/LegalPage'

export async function generateMetadata({ params }: PageProps<'/[lang]/mentions-legales'>) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = await getDict(lang)
  return pageMeta(lang, '/mentions-legales', t.meta.legal)
}

export default async function Page({ params }: PageProps<'/[lang]/mentions-legales'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getDict(lang)
  return <LegalPage title={t.legal.title} sections={t.legal.sections} />
}
