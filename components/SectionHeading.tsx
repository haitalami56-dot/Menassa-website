import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'start',
  tone = 'dark',
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'start' | 'center'
  tone?: 'dark' | 'light'
}) {
  const center = align === 'center'
  return (
    <Reveal className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className={`eyebrow ${tone === 'light' ? 'eyebrow-dark' : ''}`}>{eyebrow}</p>}
      <h2
        className={`mt-3 text-balance text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          tone === 'light' ? 'text-ink-900' : 'text-white'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-pretty text-base leading-relaxed sm:text-lg ${tone === 'light' ? 'text-ink-600' : 'text-ink-300'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
