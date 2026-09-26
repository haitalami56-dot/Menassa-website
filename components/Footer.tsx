import Link from 'next/link'
import type { Dict } from '@/content/fr'
import type { Locale } from '@/lib/i18n'
import { CONTACT_EMAIL, INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from '@/lib/site'
import Logo from './Logo'
import { IconInstagram, IconMail, IconPin, IconWhatsApp } from './Icons'

export default function Footer({ lang, t }: { lang: Locale; t: Dict }) {
  const year = new Date().getFullYear()
  const offers = [
    { href: '/sites-web', label: t.nav.websites },
    { href: '/automatisations-ia', label: t.nav.automations },
    { href: '/applications', label: t.nav.apps },
    { href: '/aios', label: t.nav.aios },
  ]
  const company = [
    { href: '/realisations', label: t.nav.work },
    { href: '/a-propos', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
    { href: '/demarrer', label: t.nav.start },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-ink-950">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 start-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-mint-500/10 blur-3xl rtl:translate-x-1/2" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-ink-300">{t.footer.about}</p>
          <p className="mt-5 text-xs text-ink-400">{t.footer.payments}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">{t.footer.offers}</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-300">
            {offers.map((l) => (
              <li key={l.href}><Link className="hover:text-mint-300" href={`/${lang}${l.href}`}>{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">{t.footer.company}</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-300">
            {company.map((l) => (
              <li key={l.href}><Link className="hover:text-mint-300" href={`/${lang}${l.href}`}>{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">{t.footer.contact}</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-300">
            <li>
              <a className="inline-flex items-center gap-2 hover:text-mint-300" href={whatsappLink(t.common.whatsappHello)} target="_blank" rel="noopener noreferrer">
                <IconWhatsApp className="h-4 w-4 text-mint-400" /> <span dir="ltr">{WHATSAPP_DISPLAY}</span>
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 break-all hover:text-mint-300" href={`mailto:${CONTACT_EMAIL}`}>
                <IconMail className="h-4 w-4 text-mint-400" /> {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-mint-300" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                <IconInstagram className="h-4 w-4 text-mint-400" /> @menassa.ma
              </a>
            </li>
            <li className="inline-flex items-center gap-2"><IconPin className="h-4 w-4 text-mint-400" /> {t.footer.city}</li>
          </ul>
        </div>
      </div>
      <div className="container-x relative flex flex-col gap-3 border-t border-white/8 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Menassa · menassa.ma · {t.footer.rights}</p>
        <div className="flex gap-5">
          <Link className="hover:text-white" href={`/${lang}/mentions-legales`}>{t.footer.legal}</Link>
          <Link className="hover:text-white" href={`/${lang}/confidentialite`}>{t.footer.privacy}</Link>
        </div>
      </div>
    </footer>
  )
}
