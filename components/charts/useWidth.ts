'use client'

import { useEffect, useRef, useState } from 'react'

// Tracks an element's width so charts draw in real pixels: labels keep their size on every screen.
export function useWidth<T extends HTMLElement>(initial = 320) {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(initial)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(260, Math.round(entry.contentRect.width))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, width] as const
}
