import type { Metadata } from 'next'
import { locales, type Locale } from './i18n'

// Builds per-page metadata with canonical + hreflang alternates for the 3 languages.
export function pageMeta(lang: Locale, path: string, m: { title: string; description: string }): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])) as Record<string, string>
  languages['x-default'] = `/fr${path}`
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `/${lang}${path}`, languages },
    openGraph: { title: m.title, description: m.description, url: `/${lang}${path}` },
  }
}
