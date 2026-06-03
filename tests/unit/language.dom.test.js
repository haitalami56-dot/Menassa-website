import { readFileSync } from 'fs'
import { resolve } from 'path'
import { beforeEach, describe, it, expect } from 'vitest'

const source = readFileSync(resolve(process.cwd(), 'script.js'), 'utf-8')

// Loads the script in the current jsdom context and returns exported handles.
// `localStorage` is passed explicitly; `document` and `window` are jsdom globals.
function loadScript() {
  const fn = new Function('localStorage', `${source}; return { translations, setLanguage }`)
  return fn(window.localStorage)
}

const MINIMAL_HTML = `
  <button class="lang-btn active" data-lang="en">EN</button>
  <button class="lang-btn" data-lang="fr">FR</button>
  <button class="lang-btn" data-lang="ar">AR</button>
  <h1 data-i18n="hero.title1">One Platform,</h1>
  <p  data-i18n="hero.description">Default</p>
  <a  data-i18n="nav.home">Home</a>
  <span data-i18n="nav.services">Services</span>
`

describe('setLanguage — direction & lang attribute', () => {
  let setLanguage

  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('dir')
    document.documentElement.removeAttribute('lang')
    document.body.innerHTML = MINIMAL_HTML
    ;({ setLanguage } = loadScript())
  })

  it('sets dir=rtl on <html> when switching to Arabic', () => {
    setLanguage('ar')
    expect(document.documentElement.getAttribute('dir')).toBe('rtl')
  })

  it('sets dir=ltr on <html> for English', () => {
    setLanguage('ar')
    setLanguage('en')
    expect(document.documentElement.getAttribute('dir')).toBe('ltr')
  })

  it('sets dir=ltr on <html> for French', () => {
    setLanguage('fr')
    expect(document.documentElement.getAttribute('dir')).toBe('ltr')
  })

  it('sets the lang attribute to the selected language code', () => {
    setLanguage('fr')
    expect(document.documentElement.getAttribute('lang')).toBe('fr')
    setLanguage('ar')
    expect(document.documentElement.getAttribute('lang')).toBe('ar')
  })
})

describe('setLanguage — localStorage persistence', () => {
  let setLanguage

  beforeEach(() => {
    window.localStorage.clear()
    document.body.innerHTML = MINIMAL_HTML
    ;({ setLanguage } = loadScript())
  })

  it('saves the selected language to localStorage', () => {
    setLanguage('fr')
    expect(window.localStorage.getItem('menassa-lang')).toBe('fr')
  })

  it('saves Arabic to localStorage', () => {
    setLanguage('ar')
    expect(window.localStorage.getItem('menassa-lang')).toBe('ar')
  })

  it('overwrites a previous language in localStorage', () => {
    setLanguage('fr')
    setLanguage('en')
    expect(window.localStorage.getItem('menassa-lang')).toBe('en')
  })
})

describe('setLanguage — DOM text updates', () => {
  let setLanguage, translations

  beforeEach(() => {
    window.localStorage.clear()
    document.body.innerHTML = MINIMAL_HTML
    ;({ setLanguage, translations } = loadScript())
  })

  it('updates data-i18n elements to the correct French text', () => {
    setLanguage('fr')
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n')
      expect(el.textContent).toBe(translations.fr[key])
    })
  })

  it('updates data-i18n elements to the correct Arabic text', () => {
    setLanguage('ar')
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n')
      expect(el.textContent).toBe(translations.ar[key])
    })
  })

  it('hero.title1 shows English text after switching back from French', () => {
    setLanguage('fr')
    setLanguage('en')
    const el = document.querySelector('[data-i18n="hero.title1"]')
    expect(el.textContent).toBe(translations.en['hero.title1'])
  })
})

describe('setLanguage — active button state', () => {
  let setLanguage

  beforeEach(() => {
    window.localStorage.clear()
    document.body.innerHTML = MINIMAL_HTML
    ;({ setLanguage } = loadScript())
  })

  it('marks the FR button as active when switching to French', () => {
    setLanguage('fr')
    expect(document.querySelector('[data-lang="fr"]').classList.contains('active')).toBe(true)
    expect(document.querySelector('[data-lang="en"]').classList.contains('active')).toBe(false)
  })

  it('marks the AR button as active when switching to Arabic', () => {
    setLanguage('ar')
    expect(document.querySelector('[data-lang="ar"]').classList.contains('active')).toBe(true)
    expect(document.querySelector('[data-lang="en"]').classList.contains('active')).toBe(false)
  })

  it('only one button is active at a time', () => {
    setLanguage('fr')
    const activeButtons = document.querySelectorAll('.lang-btn.active')
    expect(activeButtons.length).toBe(1)
  })
})
