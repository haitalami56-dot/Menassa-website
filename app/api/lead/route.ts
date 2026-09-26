import type { LeadPayload } from '@/lib/lead'

// Lead delivery. Configure at least one channel in the Vercel project env:
//   RESEND_API_KEY + LEAD_TO_EMAIL (+ optional LEAD_FROM_EMAIL)  -> email
//   LEAD_WEBHOOK_URL                                              -> JSON POST (Google Sheet via Apps Script, Make, n8n...)
// With no channel configured the route answers 503, and the forms fall back to a pre-filled WhatsApp message.

const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 6

function rateLimited(ip: string) {
  const now = Date.now()
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  list.push(now)
  hits.set(ip, list)
  return list.length > MAX_HITS
}

const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const clip = (s: unknown, n = 2000) => String(s ?? '').slice(0, n).trim()

export async function POST(request: Request) {
  let body: LeadPayload
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'bad_json' }, { status: 400 })
  }

  // Honeypot: pretend success so bots learn nothing.
  if (body.website) return Response.json({ ok: true })

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (rateLimited(ip)) return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 })

  const lead = {
    type: clip(body.type, 20),
    lang: clip(body.lang, 5),
    page: clip(body.page, 200),
    name: clip(body.name, 120),
    business: clip(body.business, 160),
    city: clip(body.city, 80),
    whatsapp: clip(body.whatsapp, 40),
    email: clip(body.email, 160),
    interest: clip(body.interest, 40),
    pack: clip(body.pack, 20),
    maintenance: clip(body.maintenance, 20),
    addons: Array.isArray(body.addons) ? body.addons.slice(0, 10).map((a) => clip(a, 40)) : [],
    total: typeof body.total === 'number' ? body.total : undefined,
    message: clip(body.message),
    utm: body.utm && typeof body.utm === 'object' ? body.utm : {},
    receivedAt: new Date().toISOString(),
  }

  if (!lead.name || !lead.whatsapp) return Response.json({ ok: false, error: 'missing_fields' }, { status: 422 })

  const resendKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_TO_EMAIL
  const webhook = process.env.LEAD_WEBHOOK_URL
  const deliveries: Promise<Response>[] = []

  if (resendKey && to) {
    const subject = `[Menassa] ${lead.type === 'start' ? `Pack ${lead.pack}` : lead.type} · ${lead.name}${lead.business ? ` (${lead.business})` : ''}`
    const rows = Object.entries(lead)
      .filter(([, v]) => v !== '' && v !== undefined && !(Array.isArray(v) && !v.length))
      .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#667;vertical-align:top">${esc(k)}</td><td style="padding:6px 12px">${esc(typeof v === 'object' ? JSON.stringify(v) : v)}</td></tr>`)
      .join('')
    const wa = lead.whatsapp.replace(/[^\d]/g, '')
    deliveries.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL ?? 'Menassa <onboarding@resend.dev>',
          to: [to],
          reply_to: lead.email || undefined,
          subject,
          html: `<h2 style="font-family:sans-serif">Nouveau lead Menassa</h2><p><a href="https://wa.me/${wa}">Répondre sur WhatsApp</a></p><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`,
        }),
      }),
    )
  }
  if (webhook) {
    deliveries.push(fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) }))
  }

  if (!deliveries.length) {
    console.warn('[lead] no delivery channel configured', lead.type, lead.name)
    return Response.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  const results = await Promise.allSettled(deliveries)
  const delivered = results.some((r) => r.status === 'fulfilled' && r.value.ok)
  if (!delivered) {
    console.error('[lead] delivery failed', results.map((r) => (r.status === 'fulfilled' ? r.value.status : String(r.reason))))
    return Response.json({ ok: false, error: 'delivery_failed' }, { status: 502 })
  }
  return Response.json({ ok: true })
}
