import type { Dict } from '@/content/fr'
import { whatsappLink } from '@/lib/site'
import { IconWhatsApp } from './Icons'

export default function WhatsAppFloat({ t }: { t: Dict }) {
  return (
    <a
      href={whatsappLink(t.common.whatsappHello)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.common.whatsapp}
      data-track="whatsapp-float"
      className="wa-pulse group fixed bottom-5 end-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105"
    >
      <IconWhatsApp className="relative h-7 w-7" />
    </a>
  )
}
