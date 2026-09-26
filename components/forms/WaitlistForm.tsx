'use client'

import { useState, type FormEvent } from 'react'
import type { Dict } from '@/content/fr'
import type { Locale } from '@/lib/i18n'
import { submitLead } from '@/lib/lead'
import { whatsappLink } from '@/lib/site'
import { IconCheck, IconWhatsApp } from '../Icons'
import { Field, Honeypot } from './Field'

export default function WaitlistForm({ lang, t, offer }: { lang: Locale; t: Dict; offer: string }) {
  const w = t.soon.waitlist
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setState('sending')
    try {
      await submitLead({
        type: 'waitlist',
        lang,
        interest: offer,
        name: String(fd.get('name') ?? ''),
        business: String(fd.get('business') ?? ''),
        whatsapp: String(fd.get('whatsapp') ?? ''),
        website: String(fd.get('website') ?? ''),
      })
      setState('done')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-mint-400/30 bg-mint-400/10 p-5 text-mint-200" role="status">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint-400 text-ink-950"><IconCheck /></span>
        {w.success}
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="relative grid gap-4">
      <Honeypot />
      <Field label={w.name} name="name" required autoComplete="name" />
      <Field label={w.business} name="business" autoComplete="organization" />
      <Field label={w.whatsapp} name="whatsapp" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+212 6..." dir="ltr" />
      <button type="submit" className="btn btn-primary mt-2" disabled={state === 'sending'}>
        {state === 'sending' ? t.common.sending : w.submit}
      </button>
      {state === 'error' && (
        <p className="text-sm text-ink-300" role="alert">
          {w.error}{' '}
          <a className="inline-flex items-center gap-1 font-semibold text-mint-300 underline" href={whatsappLink(`${t.common.whatsappHello} (${offer})`)} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp className="h-4 w-4" /> WhatsApp
          </a>
        </p>
      )}
    </form>
  )
}
