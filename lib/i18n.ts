import type { Dict } from '@/content/fr'

export const locales = ['fr', 'ar', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'fr'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function dirOf(locale: Locale) {
  return locale === 'ar' ? 'rtl' : 'ltr'
}

const loaders: Record<Locale, () => Promise<Dict>> = {
  fr: () => import('@/content/fr').then((m) => m.default),
  ar: () => import('@/content/ar').then((m) => m.default),
  en: () => import('@/content/en').then((m) => m.default),
}

export async function getDict(locale: Locale): Promise<Dict> {
  return loaders[locale]()
}

// Prices keep Latin digits in every language so they read the same on WhatsApp and invoices.
export function formatMAD(amount: number, locale: Locale) {
  const n = new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'fr-FR').format(amount)
  return locale === 'ar' ? `${n} درهم` : `${n} MAD`
}

export function formatNumber(amount: number, locale: Locale) {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'fr-FR').format(Math.round(amount))
}

export function localePath(locale: Locale, path = '') {
  return `/${locale}${path}`
}
