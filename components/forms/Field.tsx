import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

const inputCls =
  'mt-1.5 w-full rounded-xl border border-white/12 bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-ink-400 transition-colors focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400/30'

export function Field({ label, optional, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; optional?: string }) {
  return (
    <label className="block text-sm text-ink-200">
      <span>
        {label}
        {props.required ? <span className="text-mint-400"> *</span> : optional ? <span className="text-ink-400"> ({optional})</span> : null}
      </span>
      <input {...props} className={inputCls} />
    </label>
  )
}

export function TextArea({ label, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block text-sm text-ink-200">
      <span>{label}</span>
      <textarea {...props} className={`${inputCls} min-h-28 resize-y`} />
    </label>
  )
}

// Hidden from humans; bots fill it and get silently dropped by the API.
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}
