import Link from 'next/link'
import type { Dict } from '@/content/fr'
import type { Locale } from '@/lib/i18n'
import { whatsappLink } from '@/lib/site'
import { IconArrow, IconCheck, IconWhatsApp } from '../Icons'
import HeroVisual from './HeroVisual'

export default function Hero({ lang, t }: { lang: Locale; t: Dict }) {
  const h = t.home.hero
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 lg:pb-28 lg:pt-36">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0" />
        <div className="animate-aurora absolute -top-40 start-[-10%] h-[36rem] w-[36rem] rounded-full bg-mint-500/20 blur-[120px]" />
        <div className="animate-aurora absolute -top-20 end-[-10%] h-[30rem] w-[30rem] rounded-full bg-sky-400/15 blur-[120px] [animation-delay:-6s]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/menassa-wordmark.svg"
          alt=""
          className="absolute -bottom-10 end-[-6%] w-[70rem] max-w-none opacity-[0.035]"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-900" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-10">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-mint-400/25 bg-mint-400/8 px-3.5 py-1.5 text-xs font-medium text-mint-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint-400" />
            </span>
            {h.eyebrow}
          </p>
          <h1 className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.1rem]">
            <span className="block text-white">{h.title1}</span>
            <span className="text-gradient block pb-1">{h.title2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-300">{h.subtitle}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`/${lang}/sites-web`} className="btn btn-primary" data-track="hero-packs">
              {t.common.seePacks} <IconArrow className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink(t.common.whatsappHello)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              data-track="hero-whatsapp"
            >
              <IconWhatsApp className="h-4 w-4 text-[#25D366]" /> {t.common.whatsapp}
            </a>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-300">
            {h.badges.map((b) => (
              <li key={b} className="inline-flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint-400/15 text-mint-300">
                  <IconCheck className="h-3 w-3" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual t={t} />
      </div>
    </section>
  )
}
