import { readFileSync } from 'fs'
import { resolve } from 'path'
import { describe, it, expect, beforeAll } from 'vitest'

const source = readFileSync(resolve(process.cwd(), 'script.js'), 'utf-8')

let translations

beforeAll(() => {
  const fn = new Function(
    'localStorage', 'document', 'window',
    `${source}; return translations;`
  )
  translations = fn(
    { getItem: () => null, setItem: () => {} },
    { addEventListener: () => {}, documentElement: { setAttribute() {} }, querySelectorAll: () => [], querySelector: () => null, getElementById: () => null, body: { style: {} } },
    { innerWidth: 1280, scrollY: 0, addEventListener: () => {} }
  )
})

const LANGS = ['en', 'fr', 'ar']

describe('translations object', () => {
  it('has all 3 language dictionaries', () => {
    LANGS.forEach(lang => expect(translations).toHaveProperty(lang))
  })

  it('all languages have the same keys', () => {
    const enKeys = Object.keys(translations.en).sort()
    const frKeys = Object.keys(translations.fr).sort()
    const arKeys = Object.keys(translations.ar).sort()
    expect(frKeys).toEqual(enKeys)
    expect(arKeys).toEqual(enKeys)
  })

  it('has no empty string values in English', () => {
    Object.entries(translations.en).forEach(([key, value]) => {
      expect(value, `"${key}" is empty in EN`).not.toBe('')
    })
  })

  it('has no empty string values in French', () => {
    Object.entries(translations.fr).forEach(([key, value]) => {
      expect(value, `"${key}" is empty in FR`).not.toBe('')
    })
  })

  it('has no empty string values in Arabic', () => {
    Object.entries(translations.ar).forEach(([key, value]) => {
      expect(value, `"${key}" is empty in AR`).not.toBe('')
    })
  })

  it('has all required navigation keys in every language', () => {
    const navKeys = [
      'nav.home', 'nav.about', 'nav.services',
      'nav.features', 'nav.testimonials', 'nav.contact', 'nav.getStarted',
    ]
    LANGS.forEach(lang => {
      navKeys.forEach(key => {
        expect(translations[lang], `Missing "${key}" in ${lang}`).toHaveProperty(key)
      })
    })
  })

  it('has all required contact form keys in every language', () => {
    const contactKeys = [
      'contact.name', 'contact.email', 'contact.company',
      'contact.message', 'contact.send',
    ]
    LANGS.forEach(lang => {
      contactKeys.forEach(key => {
        expect(translations[lang], `Missing "${key}" in ${lang}`).toHaveProperty(key)
      })
    })
  })

  it('has all hero section keys in every language', () => {
    const heroKeys = [
      'hero.badge', 'hero.title1', 'hero.title2',
      'hero.description', 'hero.cta1', 'hero.cta2',
      'hero.stat1', 'hero.stat2', 'hero.stat3',
    ]
    LANGS.forEach(lang => {
      heroKeys.forEach(key => {
        expect(translations[lang], `Missing "${key}" in ${lang}`).toHaveProperty(key)
      })
    })
  })

  it('has all footer keys in every language', () => {
    const footerKeys = ['footer.desc', 'footer.company', 'footer.services', 'footer.connect', 'footer.rights']
    LANGS.forEach(lang => {
      footerKeys.forEach(key => {
        expect(translations[lang], `Missing "${key}" in ${lang}`).toHaveProperty(key)
      })
    })
  })

  it('English brand name is Menassa', () => {
    expect(translations.en['brand.name']).toBe('Menassa')
  })

  it('Arabic brand name is defined and non-empty', () => {
    expect(translations.ar['brand.name']).toBeTruthy()
  })
})
