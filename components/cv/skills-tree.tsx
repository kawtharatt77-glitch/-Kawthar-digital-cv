"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Code2, Coffee, Globe, Brain, CircuitBoard, X } from "lucide-react"
import { Section } from "./section"
import { playBlip } from "@/lib/sounds"

type Skill = {
  id: string
  label: string
  icon: typeof Code2
  level: number
  detail: string
  /** position on the tree (% of container) for md+ screens */
  pos: { top: string; left: string }
}

const SKILLS: Skill[] = [
  {
    id: "python",
    label: "Python",
    icon: Code2,
    level: 90,
    detail: "Scripting, automation, data structures & AI workflow prototyping.",
    pos: { top: "8%", left: "18%" },
  },
  {
    id: "java",
    label: "Java",
    icon: Coffee,
    level: 82,
    detail: "Object-oriented programming, algorithms and clean architecture.",
    pos: { top: "14%", left: "70%" },
  },
  {
    id: "web",
    label: "HTML / CSS",
    icon: Globe,
    level: 85,
    detail: "Responsive, accessible interfaces with modern layout techniques.",
    pos: { top: "64%", left: "12%" },
  },
  {
    id: "ai",
    label: "AI Workflows",
    icon: Brain,
    level: 78,
    detail: "Designing and orchestrating LLM-driven pipelines and tooling.",
    pos: { top: "70%", left: "58%" },
  },
  {
    id: "hw",
    label: "Hardware & Electronics",
    icon: CircuitBoard,
    level: 72,
    detail: "Microcontrollers, circuits and physical-computing experiments.",
    pos: { top: "40%", left: "84%" },
  },
]

const HUB = { top: "42%", left: "44%" }

export function SkillsTree() {
  const [active, setActive] = useState<Skill | null>(null)

  return (
    <Section
      id="skills"
      index="02 / 02"
      title="Dynamic Skill Tree"
      subtitle="Hover a node to energize it — click to expand the skill dossier."
    >
      <div className="relative">
        {/* Tree canvas (md+) */}
        <div
          className="relative hidden h-[440px] w-full rounded-3xl border md:block cv-grid-bg"
          style={{ borderColor: "var(--cv-border)", backgroundColor: "var(--cv-surface)" }}
        >
          {/* connective lines */}
          <svg className="absolute inset-0 h-full w-full" aria-hidden>
            {SKILLS.map((s) => (
              <line
                key={s.id}
                x1={`${parseFloat(HUB.left) + 4}%`}
                y1={`${parseFloat(HUB.top) + 6}%`}
                x2={`${parseFloat(s.pos.left) + 4}%`}
                y2={`${parseFloat(s.pos.top) + 6}%`}
                stroke="rgb(var(--cv-glow))"
                strokeWidth={1.5}
                strokeDasharray="4 5"
                opacity={active && active.id !== s.id ? 0.15 : 0.5}
              />
            ))}
          </svg>

          {/* hub */}
          <div
            className="absolute flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 text-center"
            style={{
              top: HUB.top,
              left: HUB.left,
              borderColor: "var(--cv-accent)",
              backgroundColor: "var(--cv-surface-2)",
              boxShadow: "0 0 40px rgba(var(--cv-glow), 0.5)",
              animation: "cv-float 4s ease-in-out infinite",
            }}
          >
            <span className="cv-mono text-[10px] font-bold" style={{ color: "var(--cv-accent)" }}>
              CORE
            </span>
            <span className="cv-mono text-[9px]" style={{ color: "var(--cv-muted)" }}>
              stack
            </span>
          </div>

          {/* nodes */}
          {SKILLS.map((s, i) => (
            <motion.button
              key={s.id}
              type="button"
              data-cursor="pointer"
              onMouseEnter={() => playBlip(500 + i * 90, 0.08)}
              onClick={() => {
                playBlip(720, 0.14)
                setActive(s)
              }}
              whileHover={{ scale: 1.12 }}
              className="group absolute flex h-24 w-24 flex-col items-center justify-center rounded-2xl border"
              style={{
                top: s.pos.top,
                left: s.pos.left,
                borderColor: active?.id === s.id ? "var(--cv-accent)" : "var(--cv-border)",
                backgroundColor: "var(--cv-surface-2)",
                boxShadow:
                  active?.id === s.id
                    ? "0 0 30px rgba(var(--cv-glow), 0.6)"
                    : "0 8px 20px -12px rgba(0,0,0,0.4)",
                animation: `cv-float ${3.5 + i * 0.4}s ease-in-out infinite`,
              }}
            >
              <s.icon size={26} style={{ color: "var(--cv-accent-3)" }} />
              <span className="mt-1.5 px-1 text-center text-[11px] font-semibold leading-tight" style={{ color: "var(--cv-text)" }}>
                {s.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Mobile: stacked node buttons */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {SKILLS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              data-cursor="pointer"
              onClick={() => {
                playBlip(720, 0.14)
                setActive(s)
              }}
              className="flex flex-col items-center gap-2 rounded-2xl border p-4"
              style={{ borderColor: "var(--cv-border)", backgroundColor: "var(--cv-surface-2)" }}
            >
              <s.icon size={24} style={{ color: "var(--cv-accent-3)" }} />
              <span className="text-center text-xs font-semibold" style={{ color: "var(--cv-text)" }}>
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* Detail dossier */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              className="mt-6 rounded-2xl border p-6"
              style={{
                borderColor: "var(--cv-accent)",
                backgroundColor: "var(--cv-surface)",
                boxShadow: "0 0 40px rgba(var(--cv-glow), 0.2)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "rgba(var(--cv-glow), 0.15)", color: "var(--cv-accent)" }}
                  >
                    <active.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: "var(--cv-text)" }}>
                      {active.label}
                    </h3>
                    <p className="cv-mono text-xs" style={{ color: "var(--cv-accent-2)" }}>
                      proficiency: {active.level}%
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  data-cursor="pointer"
                  onClick={() => setActive(null)}
                  aria-label="Close skill details"
                  className="rounded-lg border p-1.5"
                  style={{ borderColor: "var(--cv-border)", color: "var(--cv-muted)" }}
                >
                  <X size={16} />
                </button>
              </div>
              <p className="mt-4 text-sm" style={{ color: "var(--cv-muted)" }}>
                {active.detail}
              </p>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "var(--cv-bg-2)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${active.level}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, var(--cv-accent), var(--cv-accent-3))" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  )
}
