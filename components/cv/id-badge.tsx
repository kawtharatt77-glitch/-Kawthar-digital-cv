"use client"

import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { useRef } from "react"

export function IdBadgeHero() {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 200, damping: 18 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 200, damping: 18 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  // Aged-paper palette, kept local to this component only.
  const paper = "#e8d3a3"
  const paperDark = "#d9bc82"
  const ink = "#3b2a1a"
  const inkFaded = "#6b5638"

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-16">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(var(--cv-glow), 0.22), transparent 65%)" }}
      />

      <motion.p
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="cv-mono mb-2 text-center text-xs tracking-[0.3em] sm:text-sm"
        style={{ color: "var(--cv-accent-3)" }}
      >
        {"// EMPLOYEE ACCESS PASS"}
      </motion.p>

      {/* Lanyard + badge assembly with gentle sway from the clip */}
      <div className="relative flex flex-col items-center" style={{ perspective: 1200 }}>
        <div
          className="origin-top"
          style={{ animation: "cv-sway 5.5s ease-in-out infinite", transformOrigin: "top center" }}
        >
          {/* Lanyard ribbon */}
          <div className="relative mx-auto flex flex-col items-center">
            <div
              className="h-24 w-9 rounded-t-sm"
              style={{
                background:
                  "repeating-linear-gradient(45deg, var(--cv-accent) 0 8px, var(--cv-accent-3) 8px 16px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              }}
            />
            {/* metal clip */}
            <div className="relative -mt-1 flex flex-col items-center">
              <div className="h-4 w-8 rounded-b-full bg-gradient-to-b from-zinc-300 to-zinc-500" />
              <div className="h-6 w-4 rounded-full border-4 border-zinc-400 bg-transparent" />
              <div className="-mt-1 h-5 w-3 rounded-b-md bg-gradient-to-b from-zinc-400 to-zinc-600" />
            </div>
          </div>

          {/* The card (3D tilt on hover) — now a full aged wanted poster */}
          <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={reset}
            data-cursor="pointer"
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            className="relative -mt-1 w-[280px] rounded-2xl p-4 sm:w-[320px]"
          >
            <div
              className="relative overflow-hidden rounded-sm border-[6px] p-5"
              style={{
                borderColor: "#5c4326",
                backgroundColor: paper,
                backgroundImage: `
                  radial-gradient(circle at 15% 20%, rgba(0,0,0,0.08) 0, transparent 6%),
                  radial-gradient(circle at 80% 10%, rgba(0,0,0,0.06) 0, transparent 8%),
                  radial-gradient(circle at 30% 85%, rgba(0,0,0,0.07) 0, transparent 10%),
                  radial-gradient(circle at 90% 75%, rgba(0,0,0,0.05) 0, transparent 7%),
                  linear-gradient(180deg, ${paper}, ${paperDark})
                `,
                boxShadow:
                  "0 30px 60px -20px rgba(0,0,0,0.6), inset 0 0 40px rgba(90,60,20,0.35)",
              }}
            >
              {/* inner decorative frame line, like an old letterpress border */}
              <div
                className="pointer-events-none absolute inset-[10px] rounded-sm border-2"
                style={{ borderColor: "rgba(59,42,26,0.55)" }}
              />

              {/* punch slot */}
              <div
                className="relative mx-auto mb-3 h-2.5 w-16 rounded-full"
                style={{ backgroundColor: "rgba(59,42,26,0.25)", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.35)" }}
              />

              {/* header: WANTED */}
              <div className="relative mb-3 text-center">
                <h1
                  className="text-3xl font-black uppercase tracking-[0.15em]"
                  style={{
                    color: ink,
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    textShadow: "1px 1px 0 rgba(0,0,0,0.15)",
                  }}
                >
                  Wanted
                </h1>
                <div className="mx-auto mt-1 h-[2px] w-24" style={{ backgroundColor: ink, opacity: 0.5 }} />
              </div>

              {/* department tag, kept as a small badge instead of a header bar */}
              <div className="relative mb-3 flex items-center justify-center gap-2">
                <span
                  className="cv-mono rounded-sm px-2 py-0.5 text-[9px] font-bold tracking-widest"
                  style={{ backgroundColor: "rgba(59,42,26,0.15)", color: ink }}
                >
                  AOU • CS DEPT
                </span>
              </div>

              {/* portrait, framed like a photo pinned to the poster */}
              <div
                className="relative mx-auto mb-3 h-44 w-36 overflow-hidden border-2"
                style={{
                  borderColor: ink,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.35), inset 0 0 0 4px " + paper,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/wanted-badge.png"
                  alt="Wanted-poster style portrait of Kawthar Al-Attas"
                  className="h-full w-full object-cover object-top"
                  style={{ filter: "sepia(0.25) contrast(1.05)" }}
                />
              </div>

              {/* DEAD OR ALIVE + name */}
              <div className="relative text-center">
                <p
                  className="text-xs font-bold uppercase tracking-[0.3em]"
                  style={{ color: inkFaded, fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  Dead or Alive
                </p>
                <h2
                  className="mt-1 text-lg font-extrabold uppercase tracking-tight"
                  style={{ color: ink, fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  Kawthar Al-Attas
                </h2>
                <p className="cv-mono mt-1 text-[10px]" style={{ color: inkFaded }}>
                  Computer Science Student &amp; Developer
                </p>
              </div>

              {/* identity details */}
              <dl
                className="relative mt-3 space-y-1.5 border-t border-dashed pt-3"
                style={{ borderColor: "rgba(59,42,26,0.4)" }}
              >
                <BadgeRow label="AGE" value="22" ink={ink} muted={inkFaded} />
                <BadgeRow label="STUDY" value="Computer Science — AOU" ink={ink} muted={inkFaded} />
              </dl>

              {/* barcode + bounty in Belly */}
              <div
                className="relative mt-3 flex items-end justify-between border-t border-dashed pt-3"
                style={{ borderColor: "rgba(59,42,26,0.4)" }}
              >
                <div className="flex h-8 items-end gap-[2px]" aria-hidden>
                  {Array.from({ length: 22 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-[2px]"
                      style={{
                        height: `${30 + ((i * 37) % 60)}%`,
                        backgroundColor: ink,
                        opacity: 0.6,
                      }}
                    />
                  ))}
                </div>
                <div className="text-right">
                  <p className="cv-mono text-[9px] tracking-widest" style={{ color: inkFaded }}>
                    BOUNTY
                  </p>
                  <p
                    className="text-[13px] font-bold"
                    style={{ color: "#8a1f11", fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    3,500,000,000 Belly
                  </p>
                </div>
              </div>

              {/* subtle paper grain overlay */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, transparent 1px, transparent 2px)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#profile"
        data-cursor="pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1, y: { duration: 1.8, repeat: Infinity } }}
        className="cv-mono absolute bottom-8 text-xs tracking-widest"
        style={{ color: "var(--cv-muted)" }}
      >
        ↓ SCROLL TO EXPLORE
      </motion.a>
    </section>
  )
}

function BadgeRow({ label, value, ink, muted }: { label: string; value: string; ink: string; muted: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="cv-mono shrink-0 text-[9px] tracking-widest" style={{ color: muted }}>
        {label}
      </dt>
      <dd className="text-right text-[11px] font-semibold leading-tight" style={{ color: ink }}>
        {value}
      </dd>
    </div>
  )
}