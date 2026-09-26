import type { Dict } from '@/content/fr'
import { IconSpark } from '../Icons'

export default function TrustMarquee({ t }: { t: Dict }) {
  const items = [...t.home.trust.items, ...t.home.trust.items]
  return (
    <section aria-label={t.home.trust.label} className="border-y border-white/8 bg-ink-950/60 py-5">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]" dir="ltr">
        <ul className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
          {[...items, ...items].map((item, i) => (
            <li key={i} className="flex items-center gap-3 whitespace-nowrap text-sm text-ink-300" aria-hidden={i >= t.home.trust.items.length}>
              <IconSpark className="h-4 w-4 text-mint-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
