"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Clock, Gauge, LineChart, Award, X } from "lucide-react"
import { Section } from "./section"
import { playPop } from "@/lib/sounds"

const soft = [
  { icon: Clock, label: "Time Management", desc: "Balancing coursework, projects and competitions on deadline." },
  { icon: Gauge, label: "Working Under Pressure", desc: "Thrives in fast-paced hackathon & CTF environments." },
  { icon: LineChart, label: "Analytical Thinking", desc: "Breaks complex problems into structured, testable steps." },
]

const certs = [
  {
    id: "competition",
    title: "Programming Creativity Competition",
    org: "Arab Open University — College of Computer Studies, Jeddah",
    date: "April 30, 2025",
    img: "/images/cert-competition.jpg",
  },
  {
    id: "ctf",
    title: "CTF Bootcamp (3-Day Camp)",
    org: "Arab Open University — Faculty of Computer Studies",
    date: "Jan 22–24, 2025",
    img: "/images/cert-ctf.jpg",
  },
]

export function SoftCerts() {
  const [zoom, setZoom] = useState<(typeof certs)[number] | null>(null)

  return (
    <Section
      id="soft-certs"
      index="03 / 04"
      title="Soft Skills & Certifications"
      subtitle="Human strengths and verified achievements."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {soft.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            whileHover={{ y: -6 }}
            className="rounded-2xl border p-5"
            style={{ borderColor: "var(--cv-border)", backgroundColor: "var(--cv-surface)" }}
          >
            <s.icon size={22} style={{ color: "var(--cv-accent-2)" }} />
            <h3 className="mt-3 text-base font-bold" style={{ color: "var(--cv-text)" }}>
              {s.label}
            </h3>
            <p className="mt-1 text-sm" style={{ color: "var(--cv-muted)" }}>
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {certs.map((c, i) => (
          <motion.button
            key={c.id}
            type="button"
            data-cursor="pointer"
            onClick={() => {
              playPop()
              setZoom(c)
            }}
            initial={{ opacity: 0, scale: 0.94, rotate: i % 2 ? 1.5 : -1.5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
            className="group overflow-hidden rounded-2xl border text-left"
            style={{
              borderColor: "var(--cv-border)",
              backgroundColor: "var(--cv-surface)",
              boxShadow: "0 20px 40px -24px rgba(0,0,0,0.5)",
            }}
          >
            <div className="relative aspect-[1.4/1] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.img || "/placeholder.svg"}
                alt={`${c.title} certificate`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute right-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
                style={{ backgroundColor: "var(--cv-accent)" }}
              >
                <Award size={12} /> VERIFIED
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold" style={{ color: "var(--cv-text)" }}>
                {c.title}
              </h3>
              <p className="mt-1 text-xs" style={{ color: "var(--cv-muted)" }}>
                {c.org}
              </p>
              <p className="cv-mono mt-2 text-xs" style={{ color: "var(--cv-accent-3)" }}>
                {c.date}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            className="cv-noprint fixed inset-0 z-[300] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-h-[90vh] max-w-3xl overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={zoom.img || "/placeholder.svg"} alt={`${zoom.title} certificate, enlarged`} className="max-h-[90vh] w-full object-contain" />
              <button
                type="button"
                data-cursor="pointer"
                onClick={() => setZoom(null)}
                aria-label="Close certificate preview"
                className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
