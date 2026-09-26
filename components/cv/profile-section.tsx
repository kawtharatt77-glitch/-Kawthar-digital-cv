"use client"

import { motion } from "motion/react"
import { GraduationCap, Terminal, Cpu, Brain } from "lucide-react"
import { Section } from "./section"

const highlights = [
  { icon: Terminal, label: "OOP" },
  { icon: Cpu, label: "Data Structures" },
  { icon: Brain, label: "AI Workflows" },
]

export function ProfileSection() {
  return (
    <Section id="profile" index="01 / 02" title="Profile & Education">
      <div className="grid gap-6 md:grid-cols-5">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-3 rounded-2xl border p-6"
          style={{
            backgroundColor: "var(--cv-surface)",
            borderColor: "var(--cv-border)",
            boxShadow: "0 0 30px rgba(var(--cv-glow), 0.1)",
          }}
        >
          <div className="cv-mono mb-3 text-xs" style={{ color: "var(--cv-accent-3)" }}>
            {"// whoami"}
          </div>
          <p className="text-lg leading-relaxed" style={{ color: "var(--cv-text)" }}>
            Dedicated CS student at{" "}
            <span style={{ color: "var(--cv-accent)" }} className="font-semibold">
              Arab Open University
            </span>{" "}
            experienced in OOP, data structures, and AI workflows.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {highlights.map((h) => (
              <span
                key={h.label}
                className="cv-mono inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
                style={{ borderColor: "var(--cv-border)", color: "var(--cv-text)" }}
              >
                <h.icon size={13} style={{ color: "var(--cv-accent-2)" }} />
                {h.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Education card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-2 rounded-2xl border p-6"
          style={{
            background: "linear-gradient(160deg, var(--cv-surface-2), var(--cv-surface))",
            borderColor: "var(--cv-border)",
          }}
        >
          <div
            className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: "rgba(var(--cv-glow), 0.15)", color: "var(--cv-accent)" }}
          >
            <GraduationCap size={22} />
          </div>
          <h3 className="text-base font-bold" style={{ color: "var(--cv-text)" }}>
            Arab Open University
          </h3>
          <p className="mt-1 text-sm" style={{ color: "var(--cv-muted)" }}>
            College of Computer Studies — Jeddah
          </p>
          <p className="cv-mono mt-3 text-sm font-semibold" style={{ color: "var(--cv-accent-2)" }}>
            B.Sc. Computer Science
          </p>
        </motion.div>
      </div>
    </Section>
  )
}
