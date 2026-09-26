'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, Volume2, VolumeX } from 'lucide-react'
import { useMuted } from '@/lib/sounds'

const TYPE_TARGET = 'print("Welcome to My Digital CV")'

type Phase = 'idle' | 'zoom' | 'typing' | 'ready'

export function IntroSequence({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [typed, setTyped] = useState('')
  const [muted, toggleMuted] = useMuted()
  const audioCtxRef = useRef<AudioContext | null>(null)

  const getCtx = useCallback(() => {
    if (typeof window === 'undefined') return null
    if (!audioCtxRef.current) {
      const AC = window.AudioContext || (window as any).webkitAudioContext
      if (AC) audioCtxRef.current = new AC()
    }
    return audioCtxRef.current
  }, [])

  // Synthesize a short mechanical keyboard "click".
  const playClick = useCallback(() => {
    const ctx = getCtx()
    if (!ctx || muted) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.setValueAtTime(420 + Math.random() * 180, now)
    gain.gain.setValueAtTime(0.05, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05)
    osc.connect(gain).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.06)
  }, [getCtx, muted])

  const start = useCallback(() => {
    if (phase !== 'idle') return
    getCtx()?.resume()
    setPhase('zoom')
  }, [phase, getCtx])

  // Space to start
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && phase === 'idle') {
        e.preventDefault()
        start()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, start])

  // zoom -> typing
  useEffect(() => {
    if (phase !== 'zoom') return
    const t = setTimeout(() => setPhase('typing'), 1100)
    return () => clearTimeout(t)
  }, [phase])

  // typing effect
  useEffect(() => {
    if (phase !== 'typing') return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(TYPE_TARGET.slice(0, i))
      playClick()
      if (i >= TYPE_TARGET.length) {
        clearInterval(id)
        setTimeout(() => setPhase('ready'), 500)
      }
    }, 65)
    return () => clearInterval(id)
  }, [phase, playClick])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    ><button
  type="button"
  onClick={toggleMuted}
  data-cursor="pointer"
  className="absolute right-6 top-6 z-10 rounded-full border border-neon-2/50 p-2 text-neon-2 transition-colors hover:bg-neon-2/10"
  aria-label={muted ? 'Unmute' : 'Mute'}
>
  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
</button>
      {/* Laptop stage */}
      <motion.div
        className="relative w-full max-w-3xl px-6"
        animate={
          phase === 'zoom' || phase === 'typing' || phase === 'ready'
            ? { scale: 1.35, y: '6%' }
            : { scale: 1, y: 0 }
        }
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative">
          <img
            src="/laptop.jpg"
            alt="A sleek open laptop in a dark void"
            className="w-full select-none object-contain"
            draggable={false}
          />

          {/* Screen overlay — positioned over the laptop display */}
          <div className="absolute left-1/2 top-[38%] w-[46%] -translate-x-1/2 -translate-y-1/2">
            <AnimatePresence mode="wait">
              {phase === 'idle' && (
                <motion.div
                  key="prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center font-mono text-[0.55rem] leading-tight text-neon-2 sm:text-xs"
                >
                  <motion.p
                    animate={{ opacity: [1, 0.35, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="tracking-widest"
                  >
                    [ Press SPACE to Start ]
                  </motion.p>
                </motion.div>
              )}

              {(phase === 'typing' || phase === 'ready') && (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-left font-mono text-[0.5rem] leading-relaxed text-neon-2 sm:text-[0.7rem]"
                >
                  <span className="text-neon-3">{'>'} </span>
                  <span>{typed}</span>
                  <span className="caret-blink">▋</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Bottom controls */}
      <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-5">
        <AnimatePresence>
          {phase === 'idle' && (
            <motion.button
              key="startbtn"
              type="button"
              onClick={start}
              data-cursor="pointer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-full border border-neon-2/50 px-6 py-2 font-mono text-xs tracking-widest text-neon-2 transition-colors hover:bg-neon-2/10"
            >
              PRESS SPACE TO START
            </motion.button>
          )}

          {phase === 'ready' && (
            <motion.button
              key="runbtn"
              type="button"
              onClick={onFinish}
              data-cursor="pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="animate-neon-pulse relative flex items-center gap-2 overflow-hidden rounded-full bg-neon-2 px-9 py-3 font-mono text-sm font-bold tracking-widest text-black"
            >
              <RunParticles />
              <Play className="h-4 w-4 fill-black" />
              RUN
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function RunParticles() {
  const dots = Array.from({ length: 10 })
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {dots.map((_, i) => {
        const angle = (i / dots.length) * Math.PI * 2
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-neon-2"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: Math.cos(angle) * 42,
              y: Math.sin(angle) * 42,
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: i * 0.12,
              ease: 'easeOut',
            }}
          />
        )
      })}
    </span>
  )
}
export { IntroSequence as IntroScreen }