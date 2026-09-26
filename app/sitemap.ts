import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { SITE_URL } from '@/lib/site'

const PATHS = [
  { path: '', priority: 1 },
  { path: '/sites-web', priority: 0.95 },
  { path: '/aios', priority: 0.8 },
  { path: '/automatisations-ia', priority: 0.7 },
  { path: '/applications', priority: 0.6 },
  { path: '/realisations', priority: 0.7 },
  { path: '/realisations/riad-asmaa', priority: 0.6 },
  { path: '/realisations/gifty-art', priority: 0.6 },
  { path: '/a-propos', priority: 0.5 },
  { path: '/contact', priority: 0.6 },
  { path: '/demarrer', priority: 0.7 },
  { path: '/mentions-legales', priority: 0.2 },
  { path: '/confidentialite', priority: 0.2 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return PATHS.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: now,
      priority,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])) },
    })),
  )
}
