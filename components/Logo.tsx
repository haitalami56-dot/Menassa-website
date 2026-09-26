import Image from 'next/image'

// Temporary logo: the Arabic wordmark from the Menassa Instagram profile. Final logo comes later.
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image src="/brand/menassa-wordmark.svg" alt="Menassa" width={881} height={318} priority className="h-8 w-auto" />
      <span className="hidden text-[0.95rem] font-semibold tracking-wide text-white/90 sm:inline" dir="ltr">
        Menassa
      </span>
    </span>
  )
}
