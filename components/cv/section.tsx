"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

export function Section({
  id,
  index,
  title,
  subtitle,
  children,
}: {
  id: string
  index: string
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="cv-mono mb-2 flex items-center gap-3 text-sm" style={{ color: "var(--cv-accent-3)" }}>
          <span
            className="rounded px-2 py-0.5 text-xs font-bold"
            style={{ backgroundColor: "rgba(var(--cv-glow), 0.15)", color: "var(--cv-accent-3)" }}
          >
            {index}
          </span>
          <span className="h-px flex-1" style={{ backgroundColor: "var(--cv-border)" }} />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: "var(--cv-text)" }}>
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-sm sm:text-base" style={{ color: "var(--cv-muted)" }}>
            {subtitle}
          </p>
        ) : null}
      </motion.div>
      {children}
    </section>
  )
}
