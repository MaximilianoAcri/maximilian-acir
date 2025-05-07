"use client"

import Hero from "@/components/hero"
import About from "@/components/about"
import Technologies from "@/components/technologies"
import Projects from "@/components/projects"
import Certifications from "@/components/certifications"
import Contact from "@/components/contact"
import CursorEffect from "@/components/cursor-effect"
import WhatsAppForm from "@/components/whatsapp-form"
import CodeIllustration from "@/components/code-illustration"
import { useEffect, useState } from "react"

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <main className="min-h-screen">
      {isMounted && <CursorEffect />}
      <Hero />
      {isMounted && <CodeIllustration />}
      <About />
      <Technologies />
      <Projects />
      <Certifications />
      <Contact />
      <WhatsAppForm />
    </main>
  )
}
