import type { Dict } from '@/content/fr'
import type { Locale } from '@/lib/i18n'
import { CONTACT_EMAIL, INSTAGRAM_URL, SITE_URL, WHATSAPP_NUMBER } from '@/lib/site'

export default function JsonLd({ lang, t }: { lang: Locale; t: Dict }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: 'Menassa',
    alternateName: 'منصة',
    url: `${SITE_URL}/${lang}`,
    logo: `${SITE_URL}/brand/icon-512.png`,
    image: `${SITE_URL}/brand/og.png`,
    description: t.meta.home.description,
    email: CONTACT_EMAIL,
    telephone: `+${WHATSAPP_NUMBER}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Rabat', addressCountry: 'MA' },
    areaServed: { '@type': 'Country', name: 'Morocco' },
    sameAs: [INSTAGRAM_URL],
    priceRange: '5999 MAD - 19999 MAD',
    knowsLanguage: ['fr', 'ar', 'en'],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
