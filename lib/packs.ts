export type PackId = 'essentiel' | 'pro' | 'signature'

export const PACKS: { id: PackId; price: number; recommended?: boolean }[] = [
  { id: 'essentiel', price: 5999 },
  { id: 'pro', price: 9999, recommended: true },
  { id: 'signature', price: 19999 },
]

export const MAINTENANCE_PRICE = 1000
export const MAINTENANCE_YEARLY = 10000

export const ADDONS: { id: string; price: number | null; from?: boolean }[] = [
  { id: 'language', price: 990 },
  { id: 'brand', price: 1490 },
  { id: 'seo-page', price: 790 },
  { id: 'chatbot', price: 2490 },
  { id: 'whatsapp-agent', price: 4990, from: true },
  { id: 'ads', price: 1490 },
  { id: 'photos', price: null },
]

export function packPrice(id: string) {
  return PACKS.find((p) => p.id === id)?.price ?? 0
}
