"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Folder, FolderOpen, Dumbbell, Scissors } from "lucide-react"
import { Section } from "./section"
import { playPop } from "@/lib/sounds"

type HobbyFolder = {
  id: string
  label: string
  icon: typeof Folder
  color: string
  photos: { img: string; caption: string; rotate: number }[]
}

const FOLDERS: HobbyFolder[] = [
  {
    id: "arts",
    label: "Manual Arts",
    icon: Scissors,
    color: "var(--cv-accent-2)",
    photos: [
      { img: "/images/crochet.jpg", caption: "Crochet graduate bouquet", rotate: -6 },
    ],
  },
  {
    id: "athletics",
    label: "Athletics",
    icon: Dumbbell,
    color: "var(--cv-accent-3)",
    photos: [
      { img: "/images/gym.jpg", caption: "Gym day — let's go!", rotate: 5 },
    ],
  },
]

function Polaroid({ img, caption, rotate }: { img: string; caption: string; rotate: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30, rotate: 0, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, rotate, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 5 }}
      data-cursor="pointer"
      className="w-44 rounded-sm bg-white p-2.5 pb-8 shadow-xl sm:w-52"
      style={{ boxShadow: "0 18px 30px -12px rgba(0,0,0,0.5)" }}
    >
      <div className="aspect-square overflow-hidden bg-zinc-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img || "/placeholder.svg"} alt={caption} className="h-full w-full object-cover" />
      </div>
      <figcaption className="cv-mono mt-2 text-center text-[11px] text-zinc-700">{caption}</figcaption>
    </motion.figure>
  )
}

export function Hobbies() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <Section
      id="hobbies"
      index="05"
      title="Hobbies"
      subtitle="Click a folder to spill out the Polaroids."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {FOLDERS.map((f) => {
          const isOpen = open === f.id
          const Icon = isOpen ? FolderOpen : f.icon
          return (
            <div
              key={f.id}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--cv-border)", backgroundColor: "var(--cv-surface)" }}
            >
              <button
                type="button"
                data-cursor="pointer"
                onClick={() => {
                  playPop()
                  setOpen(isOpen ? null : f.id)
                }}
                className="flex w-full items-center gap-4"
                aria-expanded={isOpen}
              >
                <motion.div
                  animate={{ rotate: isOpen ? [-4, 4, 0] : 0, scale: isOpen ? 1.05 : 1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: "rgba(var(--cv-glow), 0.12)", color: f.color }}
                >
                  <Icon size={30} />
                </motion.div>
                <div className="text-left">
                  <h3 className="text-lg font-bold" style={{ color: "var(--cv-text)" }}>
                    {f.label}
                  </h3>
                  <p className="cv-mono text-xs" style={{ color: "var(--cv-muted)" }}>
                    {isOpen ? "click to close ▲" : `open folder (${f.photos.length}) ▼`}
                  </p>
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap justify-center gap-4 pt-6">
                      {f.photos.map((p) => (
                        <Polaroid key={p.img} {...p} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
