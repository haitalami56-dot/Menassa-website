import type { Metadata, Viewport } from 'next'
import { Readex_Pro } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import { dirOf, getDict, isLocale, locales } from '@/lib/i18n'
import { SITE_URL } from '@/lib/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'

const readex = Readex_Pro({
  subsets: ['latin', 'arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-readex',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export const viewport: Viewport = {
  themeColor: '#0a1830',
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = await getDict(lang)
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.home.title, template: '%s' },
    description: t.meta.home.description,
    applicationName: 'Menassa',
    openGraph: {
      siteName: 'Menassa',
      type: 'website',
      locale: lang === 'ar' ? 'ar_MA' : lang === 'en' ? 'en_US' : 'fr_MA',
      images: [{ url: '/brand/og.png', width: 1200, height: 630, alt: 'Menassa' }],
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getDict(lang)

  return (
    <html lang={lang} dir={dirOf(lang)} className={readex.variable}>
      <body className="min-h-dvh font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] btn btn-primary">
          {t.nav.skip}
        </a>
        <JsonLd lang={lang} t={t} />
        <Header lang={lang} t={t} />
        <main id="main">{children}</main>
        <Footer lang={lang} t={t} />
        <WhatsAppFloat t={t} />
      </body>
    </html>
  )
}
