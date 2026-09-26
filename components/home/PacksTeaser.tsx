import Link from 'next/link'
import type { Dict } from '@/content/fr'
import type { Locale } from '@/lib/i18n'
import { IconArrow } from '../Icons'
import PackCards from '../PackCards'
import SectionHeading from '../SectionHeading'

export default function PacksTeaser({ lang, t }: { lang: Locale; t: Dict }) {
  const p = t.home.packs
  return (
    <section className="relative bg-paper py-24 text-ink-900 lg:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} align="center" tone="light" />
        <div className="mt-16">
          <PackCards lang={lang} t={t} compact />
        </div>
        <div className="mt-12 text-center">
          <Link href={`/${lang}/sites-web#packs`} className="inline-flex items-center gap-2 font-semibold text-mint-700 hover:text-mint-600">
            {p.link} <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
