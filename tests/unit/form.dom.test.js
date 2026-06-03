import { readFileSync } from 'fs'
import { resolve } from 'path'
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'

const source = readFileSync(resolve(process.cwd(), 'script.js'), 'utf-8')

function loadScript() {
  const fn = new Function('localStorage', `${source}; return { setLanguage, initContactForm }`)
  return fn(window.localStorage)
}

const FORM_HTML = `
  <form id="contactForm">
    <input type="text"  id="name"    required placeholder=" ">
    <input type="email" id="email"   required placeholder=" ">
    <input type="text"  id="company"          placeholder=" ">
    <textarea           id="message" required placeholder=" "></textarea>
    <button type="submit">
      <span data-i18n="contact.send">Send Message</span>
    </button>
  </form>
`

describe('initContactForm — loading state', () => {
  let setLanguage, initContactForm

  beforeEach(() => {
    vi.useFakeTimers()
    window.localStorage.clear()
    document.body.innerHTML = FORM_HTML
    ;({ setLanguage, initContactForm } = loadScript())
    setLanguage('en')
    initContactForm()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows "Sending..." immediately after English form submit', () => {
    document.getElementById('contactForm').dispatchEvent(new Event('submit', { bubbles: true }))
    expect(document.querySelector('button[type="submit"] span').textContent).toBe('Sending...')
  })

  it('disables the submit button during submission', () => {
    document.getElementById('contactForm').dispatchEvent(new Event('submit', { bubbles: true }))
    expect(document.querySelector('button[type="submit"]').disabled).toBe(true)
  })

  it('shows "Envoi en cours..." immediately after French form submit', () => {
    setLanguage('fr')
    document.getElementById('contactForm').dispatchEvent(new Event('submit', { bubbles: true }))
    expect(document.querySelector('button[type="submit"] span').textContent).toBe('Envoi en cours...')
  })

  it('shows "جاري الإرسال..." immediately after Arabic form submit', () => {
    setLanguage('ar')
    document.getElementById('contactForm').dispatchEvent(new Event('submit', { bubbles: true }))
    expect(document.querySelector('button[type="submit"] span').textContent).toBe('جاري الإرسال...')
  })
})

describe('initContactForm — success state (after 1500ms)', () => {
  let setLanguage, initContactForm

  beforeEach(() => {
    vi.useFakeTimers()
    window.localStorage.clear()
    document.body.innerHTML = FORM_HTML
    ;({ setLanguage, initContactForm } = loadScript())
    setLanguage('en')
    initContactForm()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows "Sent!" in English after 1500ms', () => {
    document.getElementById('contactForm').dispatchEvent(new Event('submit', { bubbles: true }))
    vi.advanceTimersByTime(1500)
    expect(document.querySelector('button[type="submit"] span').textContent).toBe('Sent!')
  })

  it('shows "Envoyé !" in French after 1500ms', () => {
    setLanguage('fr')
    document.getElementById('contactForm').dispatchEvent(new Event('submit', { bubbles: true }))
    vi.advanceTimersByTime(1500)
    expect(document.querySelector('button[type="submit"] span').textContent).toBe('Envoyé !')
  })

  it('shows "تم الإرسال!" in Arabic after 1500ms', () => {
    setLanguage('ar')
    document.getElementById('contactForm').dispatchEvent(new Event('submit', { bubbles: true }))
    vi.advanceTimersByTime(1500)
    expect(document.querySelector('button[type="submit"] span').textContent).toBe('تم الإرسال!')
  })

  it('button remains disabled at 1500ms', () => {
    document.getElementById('contactForm').dispatchEvent(new Event('submit', { bubbles: true }))
    vi.advanceTimersByTime(1500)
    expect(document.querySelector('button[type="submit"]').disabled).toBe(true)
  })
})

describe('initContactForm — reset state (after 3500ms)', () => {
  let setLanguage, initContactForm

  beforeEach(() => {
    vi.useFakeTimers()
    window.localStorage.clear()
    document.body.innerHTML = FORM_HTML
    ;({ setLanguage, initContactForm } = loadScript())
    setLanguage('en')
    initContactForm()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('re-enables the button after 3500ms total', () => {
    document.getElementById('contactForm').dispatchEvent(new Event('submit', { bubbles: true }))
    vi.advanceTimersByTime(3500)
    expect(document.querySelector('button[type="submit"]').disabled).toBe(false)
  })

  it('restores original button text after 3500ms', () => {
    const originalText = document.querySelector('button[type="submit"] span').textContent
    document.getElementById('contactForm').dispatchEvent(new Event('submit', { bubbles: true }))
    vi.advanceTimersByTime(3500)
    expect(document.querySelector('button[type="submit"] span').textContent).toBe(originalText)
  })
})
