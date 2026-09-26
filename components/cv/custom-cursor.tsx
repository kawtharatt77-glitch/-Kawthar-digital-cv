"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Custom interactive cursor with a smooth lagging trail.
 * Hidden on touch/coarse-pointer devices.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const fine = window.matchMedia("(pointer: fine)").matches
    if (!fine) return
    setEnabled(true)
    document.documentElement.classList.add("cv-cursor-none")

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: mouse.x, y: mouse.y }
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
      }
      const el = e.target as HTMLElement
      setActive(!!el.closest("a, button, [data-cursor='pointer']"))
    }

    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.18
      ring.y += (mouse.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove("cv-cursor-none")
    }
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden className="cv-noprint pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 -ml-4 -mt-4 h-8 w-8 rounded-full border transition-[width,height,background-color,border-color] duration-200"
        style={{
          borderColor: "rgb(var(--cv-glow))",
          backgroundColor: active ? "rgba(var(--cv-glow), 0.15)" : "transparent",
          width: active ? 44 : 32,
          height: active ? 44 : 32,
          marginLeft: active ? -22 : -16,
          marginTop: active ? -22 : -16,
          boxShadow: "0 0 14px rgba(var(--cv-glow), 0.5)",
        }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full"
        style={{
          backgroundColor: "rgb(var(--cv-glow))",
          boxShadow: "0 0 10px rgba(var(--cv-glow), 0.9)",
        }}
      />
    </div>
  )
}
