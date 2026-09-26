"use client"

import { motion } from "motion/react"
import { Moon, Sun } from "lucide-react"
import { playBlip } from "@/lib/sounds"

export function ThemeToggle({
  dark,
  onToggle,
}: {
  dark: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      data-cursor="pointer"
      onClick={() => {
        playBlip(dark ? 520 : 740, 0.1)
        onToggle()
      }}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-9 w-16 items-center rounded-full border p-1 transition-colors"
      style={{
        borderColor: "var(--cv-border)",
        backgroundColor: "var(--cv-surface-2)",
        boxShadow: "0 0 18px rgba(var(--cv-glow), 0.25)",
      }}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="flex h-7 w-7 items-center justify-center rounded-full"
        style={{
          marginLeft: dark ? "auto" : 0,
          backgroundColor: "var(--cv-accent)",
          color: dark ? "#07070c" : "#fff",
          boxShadow: "0 0 14px rgba(var(--cv-glow), 0.7)",
        }}
      >
        {dark ? <Moon size={16} /> : <Sun size={16} />}
      </motion.span>
    </button>
  )
}
