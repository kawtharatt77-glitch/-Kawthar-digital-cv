"use client"

import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { Mail, Phone, Download, Volume2, VolumeX } from "lucide-react"
import { Section } from "./section"
import { playBlip, useMuted } from "@/lib/sounds"

const EMAIL = "kawtharatt77@gmail.com"

function buildResumeHtml() {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Kawthar Al-Attas — CV</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; max-width: 760px; margin: 40px auto; padding: 0 32px; line-height: 1.5; }
    h1 { margin: 0; font-size: 30px; letter-spacing: 1px; }
    .role { color: #b03a5b; font-weight: bold; margin: 4px 0 2px; }
    .muted { color: #666; font-size: 13px; }
    h2 { font-size: 15px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #b03a5b; padding-bottom: 4px; margin: 26px 0 10px; color: #b03a5b; }
    ul { margin: 6px 0; padding-left: 20px; }
    li { margin: 3px 0; }
    .row { display: flex; justify-content: space-between; }
  </style></head><body>
    <h1>KAWTHAR AL-ATTAS</h1>
    <div class="role">Computer Science Student &amp; Developer</div>
    <div class="muted">${EMAIL} &nbsp;•&nbsp; Jeddah, Saudi Arabia &nbsp;•&nbsp; Bounty: ฿3,500,000,000</div>

    <h2>Profile</h2>
    <p>Dedicated CS student at Arab Open University experienced in OOP, data structures, and AI workflows.</p>

    <h2>Education</h2>
    <div class="row"><strong>Arab Open University — B.Sc. Computer Science</strong></div>
    <div class="muted">College of Computer Studies, Jeddah</div>

    <h2>Technical Skills</h2>
    <ul>
      <li>Python — scripting, automation, AI workflow prototyping</li>
      <li>Java — OOP, algorithms, clean architecture</li>
      <li>HTML / CSS — responsive, accessible interfaces</li>
      <li>AI Workflows — LLM-driven pipelines &amp; tooling</li>
      <li>Hardware &amp; Electronics — microcontrollers &amp; circuits</li>
    </ul>

    <h2>Soft Skills</h2>
    <ul>
      <li>Time Management</li>
      <li>Working Under Pressure</li>
      <li>Analytical Thinking</li>
    </ul>

    <h2>Certifications</h2>
    <ul>
      <li>Programming Creativity Competition — AOU, Jeddah (April 30, 2025)</li>
      <li>CTF Bootcamp, 3-Day Camp — AOU (Jan 22–24, 2025)</li>
    </ul>

    <h2>Interests</h2>
    <p>Manual arts (crochet) &amp; athletics.</p>
  </body></html>`
}

function downloadCv() {
  const w = window.open("", "_blank", "width=820,height=1000")
  if (!w) return
  w.document.write(buildResumeHtml())
  w.document.close()
  w.focus()
  setTimeout(() => w.print(), 400)
}

export function Contact() {
  const [ringing, setRinging] = useState(false)
  const [muted, toggleMuted] = useMuted()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {
  if (muted && audioRef.current) {
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }
}, [muted])

  const ringDenDen = () => {
  setRinging(true)
  const el = audioRef.current
  if (el && !muted) {
    el.currentTime = 0
    void el.play().catch(() => {})
  }
  setTimeout(() => setRinging(false), 2200)
}

  return (
    <Section id="contact" index="06" title="Contact & Den Den Mushi" subtitle="Send a transmission — or give the snail a ring.">
            {/* local audio file added to /public */}
      <div className="relative">
        <audio ref={audioRef} src="/denden.mp3" preload="auto" />
        <button
          type="button"
          onClick={toggleMuted}
          data-cursor="pointer"
          className="absolute right-4 top-0 z-10 rounded-full border p-2 transition-colors hover:opacity-80"
          style={{ borderColor: "var(--cv-border)", color: "var(--cv-accent-3)" }}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>

      <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
        {/* Den Den Mushi */}
        <motion.button
          type="button"
          data-cursor="pointer"
          onClick={ringDenDen}
          whileTap={{ scale: 0.96 }}
          className="relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border p-8"
          style={{
            borderColor: "var(--cv-accent)",
            backgroundColor: "var(--cv-surface-2)",
            boxShadow: "0 0 30px rgba(var(--cv-glow), 0.25)",
          }}
          aria-label="Ring the Den Den Mushi"
        >
          <motion.div
            animate={ringing ? { rotate: [0, -12, 12, -12, 12, 0], scale: [1, 1.06, 1] } : {}}
            transition={{ duration: 0.4, repeat: ringing ? 4 : 0 }}
            className="flex h-24 w-24 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--cv-accent)", boxShadow: "0 0 30px rgba(var(--cv-glow), 0.6)" }}
          >
            <Phone size={40} className="text-white" />
          </motion.div>
          <div>
            <p className="text-base font-bold" style={{ color: "var(--cv-text)" }}>
              Den Den Mushi
            </p>
            <p className="cv-mono text-xs" style={{ color: "var(--cv-accent-2)" }}>
              {ringing ? "Puru puru puru… Gacha!" : "tap to ring ☎"}
            </p>
          </div>
        </motion.button>

        {/* email link */}
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          onMouseEnter={() => playBlip(560, 0.06)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02]"
          style={{ borderColor: "var(--cv-border)", backgroundColor: "var(--cv-surface)", color: "var(--cv-text)" }}
        >
          <Mail size={16} style={{ color: "var(--cv-accent-3)" }} />
          {EMAIL}
        </a>

        {/* download CV */}
        <button
          type="button"
          data-cursor="pointer"
          onClick={downloadCv}
          className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
          style={{ background: "linear-gradient(90deg, var(--cv-accent-3), var(--cv-accent))" }}
        >
          <Download size={18} />
          Download Official CV (PDF)
        </button>
      </div>
    </Section>
  )
}
