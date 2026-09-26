import { notFound } from 'next/navigation'
import { getDict, isLocale } from '@/lib/i18n'
import { pageMeta } from '@/lib/meta'
import { CONTACT_EMAIL, INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from '@/lib/site'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ContactForm from '@/components/forms/ContactForm'
import { IconInstagram, IconMail, IconWhatsApp } from '@/components/Icons'

export async function generateMetadata({ params }: PageProps<'/[lang]/contact'>) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = await getDict(lang)
  return pageMeta(lang, '/contact', t.meta.contact)
}

export default async function ContactPage({ params }: PageProps<'/[lang]/contact'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getDict(lang)
  const c = t.contact

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
      <section className="pb-24">
        <div className="container-x grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid content-start gap-4">
            <Reveal>
              <a href={whatsappLink(t.common.whatsappHello)} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-3xl border border-[#25D366]/30 bg-[#25D366]/10 p-6 transition-colors hover:bg-[#25D366]/15">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] text-white"><IconWhatsApp className="h-6 w-6" /></span>
                <span>
                  <span className="block font-semibold text-white">{c.whatsappTitle}</span>
                  <span className="block text-sm text-ink-300" dir="ltr">{WHATSAPP_DISPLAY}</span>
                  <span className="block text-xs text-ink-400">{c.whatsappText}</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={80}>
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 rounded-3xl border border-white/8 bg-ink-850 p-6 hover:border-white/20">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-mint-300"><IconMail className="h-6 w-6" /></span>
                <span>
                  <span className="block font-semibold text-white">{c.emailTitle}</span>
                  <span className="block break-all text-sm text-ink-300">{CONTACT_EMAIL}</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={160}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-3xl border border-white/8 bg-ink-850 p-6 hover:border-white/20">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-mint-300"><IconInstagram className="h-6 w-6" /></span>
                <span>
                  <span className="block font-semibold text-white">{c.instagramTitle}</span>
                  <span className="block text-sm text-ink-300">@menassa.ma</span>
                </span>
              </a>
            </Reveal>
          </div>
          <Reveal delay={120} className="rounded-[2rem] border border-white/8 bg-ink-850 p-7 sm:p-10">
            <h2 className="text-2xl font-semibold text-white">{c.formTitle}</h2>
            <div className="mt-7">
              <ContactForm lang={lang} t={t} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
