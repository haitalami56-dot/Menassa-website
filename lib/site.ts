export const SITE_URL = 'https://menassa.ma'

// Contact identity used on the site. WhatsApp is the main channel.
export const WHATSAPP_NUMBER = '212680378404'
export const WHATSAPP_DISPLAY = '+212 680 378 404'
export const CONTACT_EMAIL = 'tifaoutee@gmail.com'
export const INSTAGRAM_URL = 'https://www.instagram.com/menassa.ma/'
export const CITY = 'Rabat'

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
