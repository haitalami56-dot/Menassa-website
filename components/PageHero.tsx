import type { ReactNode } from 'react'

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  badge,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  children?: ReactNode
  badge?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-40 lg:pb-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0" />
        <div className="animate-aurora absolute -top-48 start-1/4 h-[30rem] w-[30rem] rounded-full bg-mint-500/18 blur-[120px]" />
        <div className="animate-aurora absolute -top-32 end-0 h-[24rem] w-[24rem] rounded-full bg-sky-400/12 blur-[120px] [animation-delay:-8s]" />
      </div>
      <div className="container-x">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">{eyebrow}</p>
            {badge}
          </div>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
          {subtitle && <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-300">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
