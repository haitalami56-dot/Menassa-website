import Image from 'next/image'
import type { Dict } from '@/content/fr'
import { IconBot, IconCalendar, IconCheck } from '../Icons'

// Hero composition: the real Riad Asmaa site in a browser frame, an AI chat on a phone,
// and two floating cards. Card figures are an illustration and are labelled "Exemple".
export default function HeroVisual({ t }: { t: Dict }) {
  const v = t.home.visual
  return (
    <div className="relative mx-auto aspect-[1/1.18] w-full max-w-[40rem] sm:aspect-[1/0.92]" dir="ltr">
      <div aria-hidden className="absolute -inset-10 rounded-full bg-mint-400/15 blur-3xl" />

      {/* Browser */}
      <div className="absolute end-0 top-[13%] w-[86%] overflow-hidden rounded-2xl border border-white/10 bg-ink-850 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2 border-b border-white/8 bg-ink-800/80 px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ms-3 flex-1 truncate rounded-md bg-ink-900/80 px-3 py-1 text-[0.7rem] text-ink-300">
            <span className="text-mint-400">https://</span>
            {v.url}
          </span>
        </div>
        <Image
          src="/img/asmaa-site-desktop.webp"
          alt="Site Riad Asmaa réalisé par Menassa"
          width={1440}
          height={900}
          priority
          sizes="(min-width: 1024px) 560px, 90vw"
          className="h-auto w-full"
        />
      </div>

      {/* Phone with AI chat */}
      <div className="absolute bottom-0 start-0 z-10 w-[50%] animate-float-slow sm:w-[43%]">
        <div className="rounded-[2rem] border border-white/15 bg-ink-950 p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
          <div className="overflow-hidden rounded-[1.6rem] bg-[#0b141a]">
            <div className="flex items-center gap-2 bg-[#1f2c34] px-3 py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mint-400 text-ink-950">
                <IconBot className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <p className="text-[0.7rem] font-semibold text-white">{v.chatName}</p>
                <p className="text-[0.6rem] text-mint-300">{v.chatStatus}</p>
              </div>
            </div>
            <div className="flex min-h-[13rem] flex-col gap-1.5 p-2.5 sm:min-h-[17rem]">
              {v.chat.map((m, i) => (
                <p
                  key={i}
                  className={`chat-msg max-w-[88%] rounded-xl px-2.5 py-1.5 text-[0.62rem] leading-snug sm:text-[0.68rem] ${
                    m.from === 'bot' ? 'self-start rounded-tl-sm bg-[#1f2c34] text-white' : 'self-end rounded-tr-sm bg-[#005c4b] text-white'
                  }`}
                  style={{ animationDelay: `${0.8 + i * 1.1}s` }}
                >
                  {m.text}
                </p>
              ))}
              <span className="chat-msg typing mt-0.5 inline-flex gap-1 self-start rounded-xl bg-[#1f2c34] px-2.5 py-2" style={{ animationDelay: '5.4s' }} aria-hidden>
                <span /> <span /> <span />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking notification */}
      <div className="glass absolute start-0 top-0 z-10 hidden w-[56%] animate-float rounded-2xl p-3 shadow-xl sm:block">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mint-400/15 text-mint-300">
            <IconCalendar className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold leading-snug text-white">{v.bookingTitle}</p>
            <p className="text-[0.7rem] text-ink-300">{v.bookingDetail}</p>
          </div>
          <p className="text-sm font-semibold text-white">{v.bookingAmount}</p>
        </div>
        <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-mint-400/15 px-2 py-0.5 text-[0.65rem] font-semibold text-mint-300">
          <IconCheck className="h-3 w-3" /> {v.zeroCommission}
        </p>
      </div>

      {/* Savings card */}
      <div className="glass absolute -bottom-2 end-0 z-10 w-[46%] sm:end-[2%] animate-float rounded-2xl p-3.5 shadow-xl [animation-delay:1.5s]">
        <div className="flex items-center justify-between">
          <p className="text-[0.7rem] text-ink-300">{v.savedTitle}</p>
          <span className="rounded-full bg-white/8 px-1.5 py-0.5 text-[0.55rem] uppercase tracking-wide text-ink-300">{t.common.example}</span>
        </div>
        <p className="mt-1 text-lg font-semibold text-white sm:text-xl">
          {v.savedValue} <span className="text-[0.7rem] font-normal text-ink-300">{v.savedPeriod}</span>
        </p>
        <svg viewBox="0 0 160 40" className="mt-2 h-9 w-full" aria-hidden>
          <defs>
            <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#34d399" stopOpacity="0.35" />
              <stop offset="1" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 34 L20 30 L40 31 L60 24 L80 26 L100 17 L120 15 L140 9 L160 5 L160 40 L0 40Z" fill="url(#spark)" />
          <path d="M0 34 L20 30 L40 31 L60 24 L80 26 L100 17 L120 15 L140 9 L160 5" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="160" cy="5" r="3.5" fill="#34d399" stroke="#122849" strokeWidth="2" />
        </svg>
      </div>
    </div>
  )
}
