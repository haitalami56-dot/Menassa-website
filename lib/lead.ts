export type LeadPayload = {
  type: 'waitlist' | 'contact' | 'start'
  lang: string
  page: string
  name: string
  business?: string
  city?: string
  whatsapp: string
  email?: string
  message?: string
  interest?: string
  pack?: string
  maintenance?: string
  addons?: string[]
  total?: number
  website?: string // honeypot, must stay empty
  utm?: Record<string, string>
}

function readUtm() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const utm: Record<string, string> = {}
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const v = params.get(key) ?? sessionStorageSafe(key)
    if (v) utm[key] = v
  }
  return utm
}

function sessionStorageSafe(key: string) {
  try {
    return window.sessionStorage.getItem(key)
  } catch {
    return null
  }
}

export async function submitLead(payload: Omit<LeadPayload, 'utm' | 'page'>) {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, page: window.location.pathname, utm: readUtm() }),
  })
  if (!res.ok) throw new Error(`lead ${res.status}`)
  return res.json() as Promise<{ ok: boolean }>
}
