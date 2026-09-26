'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import type { Dict } from '@/content/fr'
import { formatMAD, type Locale } from '@/lib/i18n'
import { submitLead } from '@/lib/lead'
import { ADDONS, PACKS, type PackId } from '@/lib/packs'
import { whatsappLink } from '@/lib/site'
import { IconArrow, IconCheck, IconWhatsApp } from '../Icons'
import { Field, Honeypot, TextArea } from './Field'

type Maint = 'none' | 'monthly' | 'yearly'

export default function StartForm({ lang, t, initialPack }: { lang: Locale; t: Dict; initialPack: PackId }) {
  const s = t.start
  const names = t.websites.packs.items
  const addonNames = t.websites.addons.items
  const router = useRouter()

  const [step, setStep] = useState(0)
  const [pack, setPack] = useState<PackId>(initialPack)
  const [maint, setMaint] = useState<Maint>('monthly')
  const [addons, setAddons] = useState<string[]>([])
  const [state, setState] = useState<'idle' | 'sending' | 'error'>('idle')
  const [fallback, setFallback] = useState('')

  const packPrice = PACKS.find((p) => p.id === pack)!.price
  const addonsTotal = addons.reduce((sum, id) => sum + (ADDONS.find((a) => a.id === id)?.price ?? 0), 0)
  const total = packPrice + addonsTotal
  const maintLabel = maint === 'none' ? s.maintenanceNone : maint === 'monthly' ? s.maintenanceMonthly : s.maintenanceYearly

  const toggleAddon = (id: string) => setAddons((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (step < 2) {
      setStep(step + 1)
      return
    }
    const fd = new FormData(e.currentTarget)
    const get = (k: string) => String(fd.get(k) ?? '').trim()
    const addonList = addons.map((id) => addonNames[id as keyof typeof addonNames])
    const msg = [
      t.common.whatsappHello,
      `Pack ${names[pack].name} (${formatMAD(packPrice, lang)})`,
      `${s.maintenanceTitle}: ${maintLabel}`,
      addonList.length ? `${s.addonsTitle}: ${addonList.join(', ')}` : '',
      `${get('name')} · ${get('business')} · ${get('city')}`,
    ].filter(Boolean).join('\n')
    setFallback(msg)
    setState('sending')
    try {
      await submitLead({
        type: 'start',
        lang,
        pack,
        maintenance: maint,
        addons,
        total,
        name: get('name'),
        business: get('business'),
        city: get('city'),
        whatsapp: get('whatsapp'),
        email: get('email'),
        message: get('message'),
        website: get('website'),
      })
      router.push(`/${lang}/merci?pack=${pack}`)
    } catch {
      setState('error')
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <form onSubmit={onSubmit} className="relative rounded-[2rem] border border-white/8 bg-ink-850 p-6 sm:p-9">
        <Honeypot />
        {/* Stepper */}
        <ol className="flex items-center gap-2" aria-label="Progress">
          {s.steps.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  i < step ? 'bg-mint-400 text-ink-950' : i === step ? 'border-2 border-mint-400 text-mint-300' : 'border border-white/15 text-ink-400'
                }`}
                aria-current={i === step ? 'step' : undefined}
                disabled={i >= step}
              >
                {i < step ? <IconCheck className="h-4 w-4" /> : i + 1}
              </button>
              <span className={`hidden text-sm sm:inline ${i === step ? 'text-white' : 'text-ink-400'}`}>{label}</span>
              {i < s.steps.length - 1 && <span className={`h-px flex-1 ${i < step ? 'bg-mint-400' : 'bg-white/10'}`} />}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <fieldset className="mt-9">
            <legend className="text-xl font-semibold text-white">{s.packTitle}</legend>
            <div className="mt-6 grid gap-3">
              {PACKS.map((p) => (
                <label
                  key={p.id}
                  className={`relative flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-5 transition-colors ${
                    pack === p.id ? 'border-mint-400 bg-mint-400/8' : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  <input type="radio" name="pack" value={p.id} checked={pack === p.id} onChange={() => setPack(p.id)} className="sr-only" />
                  <span className="flex items-center gap-4">
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${pack === p.id ? 'border-mint-400' : 'border-white/30'}`}>
                      {pack === p.id && <span className="h-2.5 w-2.5 rounded-full bg-mint-400" />}
                    </span>
                    <span>
                      <span className="flex items-center gap-2 font-semibold text-white">
                        {names[p.id].name}
                        {p.recommended && <span className="rounded-full bg-mint-400 px-2 py-0.5 text-[0.65rem] font-bold uppercase text-ink-950">{t.common.recommended}</span>}
                      </span>
                      <span className="block text-sm text-ink-300">{names[p.id].tagline}</span>
                    </span>
                  </span>
                  <span className="shrink-0 font-semibold tabular-nums text-white" dir="ltr">{formatMAD(p.price, lang)}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <div className="mt-9">
            <h2 className="text-xl font-semibold text-white">{s.optionsTitle}</h2>
            <fieldset className="mt-6 rounded-2xl border border-mint-400/30 bg-gradient-to-br from-ink-700/60 to-transparent p-5">
              <legend className="px-1 text-base font-semibold text-mint-300">{s.maintenanceTitle}</legend>
              <p className="text-sm text-ink-300">{s.maintenanceText}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {(['monthly', 'yearly', 'none'] as Maint[]).map((m) => (
                  <label key={m} className={`cursor-pointer rounded-xl border px-4 py-3 text-sm transition-colors ${maint === m ? 'border-mint-400 bg-mint-400/10 text-white' : 'border-white/10 text-ink-300 hover:border-white/25'}`}>
                    <input type="radio" name="maintenance" value={m} checked={maint === m} onChange={() => setMaint(m)} className="sr-only" />
                    {m === 'none' ? s.maintenanceNone : m === 'monthly' ? s.maintenanceMonthly : s.maintenanceYearly}
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="mt-6">
              <legend className="text-base font-semibold text-white">{s.addonsTitle}</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {ADDONS.filter((a) => !(a.id === 'chatbot' && pack === 'signature')).map((a) => {
                  const on = addons.includes(a.id)
                  return (
                    <label key={a.id} className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${on ? 'border-mint-400 bg-mint-400/10' : 'border-white/10 hover:border-white/25'}`}>
                      <span className="flex items-center gap-3">
                        <input type="checkbox" checked={on} onChange={() => toggleAddon(a.id)} className="h-4 w-4 accent-[#34d399]" />
                        <span className="text-ink-200">{addonNames[a.id as keyof typeof addonNames]}</span>
                      </span>
                      <span className="shrink-0 tabular-nums text-ink-300" dir="ltr">
                        {a.price === null ? t.common.onQuote : `${a.from ? `${t.common.from} ` : ''}${formatMAD(a.price, lang)}`}
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          </div>
        )}

        {step === 2 && (
          <div className="mt-9">
            <h2 className="text-xl font-semibold text-white">{s.contactTitle}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label={t.contact.name} name="name" required autoComplete="name" />
              <Field label={t.contact.business} name="business" required autoComplete="organization" />
              <Field label={t.contact.whatsapp} name="whatsapp" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+212 6..." dir="ltr" />
              <Field label={t.contact.email} name="email" type="email" autoComplete="email" dir="ltr" />
              <Field label={t.contact.city} name="city" autoComplete="address-level2" />
              <div className="sm:col-span-2"><TextArea label={t.contact.message} name="message" /></div>
            </div>
            <label className="mt-5 flex items-start gap-3 text-sm text-ink-300">
              <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[#34d399]" />
              {s.consent}
            </label>
          </div>
        )}

        <div className="mt-9 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="btn btn-ghost">{t.common.back}</button>
          ) : <span />}
          <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>
            {step < 2 ? t.common.next : state === 'sending' ? t.common.sending : s.submit}
            <IconArrow className="h-4 w-4" />
          </button>
        </div>
        {state === 'error' && (
          <p className="mt-4 text-sm text-ink-300" role="alert">
            {s.error}{' '}
            <a className="inline-flex items-center gap-1 font-semibold text-mint-300 underline" href={whatsappLink(fallback)} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp className="h-4 w-4" /> WhatsApp
            </a>
          </p>
        )}
      </form>

      {/* Summary */}
      <aside className="h-fit rounded-[2rem] border border-white/8 bg-white/[0.03] p-7 lg:sticky lg:top-24">
        <h2 className="text-lg font-semibold text-white">{s.summary}</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-ink-300">Pack {names[pack].name}</dt>
            <dd className="tabular-nums text-white" dir="ltr">{formatMAD(packPrice, lang)}</dd>
          </div>
          {addons.map((id) => {
            const a = ADDONS.find((x) => x.id === id)!
            return (
              <div key={id} className="flex justify-between gap-4">
                <dt className="text-ink-300">{addonNames[id as keyof typeof addonNames]}</dt>
                <dd className="tabular-nums text-white" dir="ltr">{a.price === null ? t.common.onQuote : formatMAD(a.price, lang)}</dd>
              </div>
            )
          })}
          <div className="flex justify-between gap-4 border-t border-white/10 pt-3">
            <dt className="text-ink-300">{s.maintenanceTitle}</dt>
            <dd className="text-end text-white">{maintLabel}</dd>
          </div>
        </dl>
        <div className="mt-6 rounded-2xl bg-ink-850 p-5">
          <p className="text-xs text-ink-400">{s.total}</p>
          <p className="mt-1 text-3xl font-semibold tabular-nums text-white" dir="ltr">{formatMAD(total, lang)}</p>
          <p className="mt-3 text-xs text-ink-400">{s.deposit}</p>
          <p className="text-lg font-semibold tabular-nums text-mint-300" dir="ltr">{formatMAD(Math.round(total / 2), lang)}</p>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-ink-400">{t.websites.guarantee.text}</p>
      </aside>
    </div>
  )
}
