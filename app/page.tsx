"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"
import { CustomCursor } from "@/components/cv/custom-cursor"
import { IntroScreen } from "@/components/cv/intro-screen"
import { ThemeToggle } from "@/components/cv/theme-toggle"
import { IdBadgeHero } from "@/components/cv/id-badge"
import { ProfileSection } from "@/components/cv/profile-section"
import { SkillsTree } from "@/components/cv/skills-tree"
import { SoftCerts } from "@/components/cv/soft-certs"
import { Hobbies } from "@/components/cv/hobbies"
import { Contact } from "@/components/cv/contact"

export default function Page() {
  const [started, setStarted] = useState(false)
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", dark)
  }, [dark])

  return (
    <div className="cv-root cv-grid-bg relative min-h-screen">
      <CustomCursor />

     <AnimatePresence>
  {!started && <IntroScreen key="intro" onFinish={() => setStarted(true)} />}
     </AnimatePresence>

      {started && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {/* top bar */}
          <header className="cv-noprint fixed left-0 right-0 top-0 z-[120] flex items-center justify-between px-5 py-4 sm:px-8">
            <span className="cv-mono text-sm font-bold tracking-widest" style={{ color: "var(--cv-accent)" }}>
              {"<KA/>"}
            </span>
            <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
          </header>

          <main>
            <IdBadgeHero />
            <ProfileSection />
            <SkillsTree />
            <SoftCerts />
            <Hobbies />
            <Contact />
          </main>

          <footer className="cv-noprint py-10 text-center">
            <p className="cv-mono text-xs" style={{ color: "var(--cv-muted)" }}>
              {"// crafted with React + Motion — © "}
              {new Date().getFullYear()} Kawthar Al Attas
            </p>
          </footer>
        </motion.div>
      )}
    </div>
  )
}
