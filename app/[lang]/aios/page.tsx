import { notFound } from 'next/navigation'
import { getDict, isLocale } from '@/lib/i18n'
import { pageMeta } from '@/lib/meta'
import ComingSoon from '@/components/soon/ComingSoon'

export async function generateMetadata({ params }: PageProps<'/[lang]/aios'>) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = await getDict(lang)
  return pageMeta(lang, '/aios', t.meta.aios)
}

export default async function Page({ params }: PageProps<'/[lang]/aios'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getDict(lang)
  return <ComingSoon lang={lang} t={t} kind="aios" />
}
