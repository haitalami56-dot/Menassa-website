import { IconBot, IconCheck, IconShield, IconWhatsApp } from '../Icons'

// Step-by-step diagram of how a WhatsApp AI agent handles a message.
export default function AgentFlow({ steps }: { steps: string[] }) {
  const icons = [IconWhatsApp, IconShield, IconBot, IconCheck, IconCheck]
  return (
    <ol className="relative grid gap-3">
      {steps.map((s, i) => {
        const Icon = icons[i] ?? IconCheck
        const last = i === steps.length - 1
        return (
          <li key={s} className="relative flex items-center gap-4">
            {!last && <span aria-hidden className="absolute start-5 top-10 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-mint-400/60 to-mint-400/10" />}
            <span className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${i === 0 ? 'bg-[#25D366] text-white' : last ? 'bg-mint-400 text-ink-950' : 'bg-ink-700 text-mint-300'}`}>
              <Icon className="h-5 w-5" />
            </span>
            <span className="flex-1 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-ink-200">{s}</span>
          </li>
        )
      })}
    </ol>
  )
}
