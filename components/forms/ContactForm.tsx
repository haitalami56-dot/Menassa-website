'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import type { Dict } from '@/content/fr'
import type { Locale } from '@/lib/i18n'
import { submitLead } from '@/lib/lead'
import { whatsappLink } from '@/lib/site'
import { IconWhatsApp } from '../Icons'
import { Field, Honeypot, TextArea } from './Field'

export default function ContactForm({ lang, t }: { lang: Locale; t: Dict }) {
  const c = t.contact
  const router = useRouter()
  const [state, setState] = useState<'idle' | 'sending' | 'error'>('idle')
  const [fallback, setFallback] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const get = (k: string) => String(fd.get(k) ?? '').trim()
    const interest = get('interest')
    const msg = `${t.common.whatsappHello}\n${get('name')} · ${get('business')} · ${get('city')}\n${c.interests[interest as keyof typeof c.interests] ?? ''}\n${get('message')}`
    setFallback(msg)
    setState('sending')
    try {
      await submitLead({
        type: 'contact',
        lang,
        name: get('name'),
        business: get('business'),
        city: get('city'),
        whatsapp: get('whatsapp'),
        email: get('email'),
        interest,
        message: get('message'),
        website: get('website'),
      })
      router.push(`/${lang}/merci`)
    } catch {
      setState('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative grid gap-4 sm:grid-cols-2">
      <Honeypot />
      <Field label={c.name} name="name" required autoComplete="name" />
      <Field label={c.business} name="business" autoComplete="organization" />
      <Field label={c.whatsapp} name="whatsapp" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+212 6..." dir="ltr" />
      <Field label={c.email} name="email" type="email" autoComplete="email" dir="ltr" />
      <Field label={c.city} name="city" autoComplete="address-level2" />
      <label className="block text-sm text-ink-200">
        <span>{c.interest}</span>
        <select name="interest" className="mt-1.5 w-full rounded-xl border border-white/12 bg-ink-950/60 px-4 py-3 text-sm text-white focus:border-mint-400 focus:outline-none" defaultValue="websites">
          {Object.entries(c.interests).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </label>
      <div className="sm:col-span-2">
        <TextArea label={c.message} name="message" />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={state === 'sending'}>
          {state === 'sending' ? t.common.sending : t.common.submit}
        </button>
        {state === 'error' && (
          <p className="mt-3 text-sm text-ink-300" role="alert">
            {t.start.error}{' '}
            <a className="inline-flex items-center gap-1 font-semibold text-mint-300 underline" href={whatsappLink(fallback)} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp className="h-4 w-4" /> WhatsApp
            </a>
          </p>
        )}
      </div>
    </form>
  )
}
