import { describe, it, expect } from 'vitest'

// Mirrors the ease-out cubic used in initCounters (script.js)
function easeOutCubic(progress) {
  return 1 - Math.pow(1 - progress, 3)
}

function animateCounter(target, progress) {
  return Math.floor(easeOutCubic(progress) * target)
}

describe('easeOutCubic', () => {
  it('returns exactly 0 at progress=0', () => {
    expect(easeOutCubic(0)).toBe(0)
  })

  it('returns exactly 1 at progress=1', () => {
    expect(easeOutCubic(1)).toBe(1)
  })

  it('returns a value between 0 and 1 for midpoint progress', () => {
    const val = easeOutCubic(0.5)
    expect(val).toBeGreaterThan(0)
    expect(val).toBeLessThan(1)
  })

  it('starts fast — more than half-way at 50% of duration', () => {
    // Ease-out: fast start, slow finish. At 50%, value > 0.5
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5)
  })

  it('is strictly monotonically increasing', () => {
    let prev = 0
    for (let p = 0.1; p <= 1.0; p = Math.round((p + 0.1) * 10) / 10) {
      const val = easeOutCubic(p)
      expect(val).toBeGreaterThan(prev)
      prev = val
    }
  })

  it('never exceeds 1', () => {
    for (let p = 0; p <= 1; p += 0.05) {
      expect(easeOutCubic(p)).toBeLessThanOrEqual(1)
    }
  })

  it('never goes below 0', () => {
    for (let p = 0; p <= 1; p += 0.05) {
      expect(easeOutCubic(p)).toBeGreaterThanOrEqual(0)
    }
  })
})

describe('animateCounter', () => {
  it('starts at 0 when progress is 0', () => {
    expect(animateCounter(200, 0)).toBe(0)
    expect(animateCounter(50, 0)).toBe(0)
    expect(animateCounter(99, 0)).toBe(0)
  })

  it('reaches exact target at progress=1', () => {
    expect(animateCounter(200, 1)).toBe(200)
    expect(animateCounter(50, 1)).toBe(50)
    expect(animateCounter(99, 1)).toBe(99)
  })

  it('returns an integer at all progress values', () => {
    [0, 0.1, 0.3, 0.5, 0.75, 0.9, 1].forEach(p => {
      expect(Number.isInteger(animateCounter(200, p))).toBe(true)
    })
  })

  it('never exceeds the target value', () => {
    [200, 50, 99].forEach(target => {
      for (let p = 0; p <= 1; p += 0.05) {
        expect(animateCounter(target, p)).toBeLessThanOrEqual(target)
      }
    })
  })

  it('counter is non-decreasing across progress values', () => {
    const target = 200
    let prev = 0
    for (let p = 0; p <= 1; p = Math.round((p + 0.1) * 10) / 10) {
      const val = animateCounter(target, p)
      expect(val).toBeGreaterThanOrEqual(prev)
      prev = val
    }
  })
})
