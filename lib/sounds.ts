"use client"
import { useEffect, useState } from "react"
let ctx: AudioContext | null = null
let muted = false
const listeners = new Set<(m: boolean) => void>()

export function isMuted() {
  return muted
}

export function setMuted(value: boolean) {
  muted = value
  listeners.forEach((l) => l(muted))
}

export function toggleMuted() {
  setMuted(!muted)
}

export function subscribeMuted(cb: (m: boolean) => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}
function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === "suspended") void ctx.resume()
  return ctx
}

/** Short futuristic blip used for skill nodes / hovers. */
export function playBlip(freq = 660, duration = 0.12) {
  const ac = getCtx()
  if (!ac || muted) return
  const now = ac.currentTime
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = "square"
  osc.frequency.setValueAtTime(freq, now)
  osc.frequency.exponentialRampToValueAtTime(freq * 1.8, now + duration)
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)
  osc.connect(gain).connect(ac.destination)
  osc.start(now)
  osc.stop(now + duration + 0.02)
}

/** Soft UI pop for folders / reveals. */
export function playPop() {
  const ac = getCtx()
  if (!ac || muted) return
  const now = ac.currentTime
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = "sine"
  osc.frequency.setValueAtTime(320, now)
  osc.frequency.exponentialRampToValueAtTime(720, now + 0.09)
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.14, now + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18)
  osc.connect(gain).connect(ac.destination)
  osc.start(now)
  osc.stop(now + 0.2)
}

/**
 * Classic One Piece Den Den Mushi:
 * "Puru puru puru..." (three warbling rings) followed by "Gacha!" (pickup click).
 */
export function playDenDenMushi() {
  const ac = getCtx()
  if (!ac || muted) return
  let t = ac.currentTime + 0.02

  const ring = (start: number) => {
    // warble made of a fast vibrato tone
    const osc = ac.createOscillator()
    const vib = ac.createOscillator()
    const vibGain = ac.createGain()
    const gain = ac.createGain()
    osc.type = "triangle"
    osc.frequency.setValueAtTime(540, start)
    vib.type = "sine"
    vib.frequency.setValueAtTime(28, start) // "puru" flutter
    vibGain.gain.setValueAtTime(70, start)
    vib.connect(vibGain).connect(osc.frequency)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.16, start + 0.03)
    gain.gain.setValueAtTime(0.16, start + 0.3)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.4)
    osc.connect(gain).connect(ac.destination)
    osc.start(start)
    vib.start(start)
    osc.stop(start + 0.42)
    vib.stop(start + 0.42)
  }

  // three "puru" rings
  for (let i = 0; i < 3; i++) {
    ring(t)
    t += 0.5
  }

  // "Gacha!" — noise burst + thunk
  const gachaStart = t + 0.1
  const bufferSize = ac.sampleRate * 0.14
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
  }
  const noise = ac.createBufferSource()
  noise.buffer = buffer
  const nGain = ac.createGain()
  const nFilter = ac.createBiquadFilter()
  nFilter.type = "bandpass"
  nFilter.frequency.setValueAtTime(1800, gachaStart)
  nGain.gain.setValueAtTime(0.25, gachaStart)
  nGain.gain.exponentialRampToValueAtTime(0.0001, gachaStart + 0.14)
  noise.connect(nFilter).connect(nGain).connect(ac.destination)
  noise.start(gachaStart)

  const thunk = ac.createOscillator()
  const tGain = ac.createGain()
  thunk.type = "sine"
  thunk.frequency.setValueAtTime(180, gachaStart)
  thunk.frequency.exponentialRampToValueAtTime(70, gachaStart + 0.12)
  tGain.gain.setValueAtTime(0.0001, gachaStart)
  tGain.gain.exponentialRampToValueAtTime(0.2, gachaStart + 0.01)
  tGain.gain.exponentialRampToValueAtTime(0.0001, gachaStart + 0.16)
  thunk.connect(tGain).connect(ac.destination)
  thunk.start(gachaStart)
  thunk.stop(gachaStart + 0.18)
}
export function useMuted(): [boolean, () => void] {
  const [m, setM] = useState(false)
  useEffect(() => {
    setM(isMuted())
    return subscribeMuted(setM)
  }, [])
  return [m, toggleMuted]
}