"use client"

import { Button } from "@/components/ui/button"
import { motion, useAnimation } from "framer-motion"
import {
  ArrowRight,
  Download,
  Mail,
  Brain,
  Server,
  Code,
  Laptop,
  Terminal,
  Keyboard,
  MonitorSmartphone,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { useDeviceOrientation } from "@/hooks/use-device-orientation"
import { useMobile } from "@/hooks/use-mobile"
import { useEffect, useState } from "react"

export default function Hero() {
  const { t, language } = useLanguage()
  const { mousePosition, isClient } = useMousePosition()
  const { orientation, isSupported } = useDeviceOrientation()
  const { isMobile } = useMobile()

  const controlsLeft = useAnimation()
  const controlsRight = useAnimation()
  const controlsTop = useAnimation()
  const controlsBottom = useAnimation()
  const controlsCode = useAnimation()

  const [hoveredElement, setHoveredElement] = useState<string | null>(null)

  useEffect(() => {
    if (isClient) {
      // Determine movement source - mouse or gyroscope
      let moveX = 0
      let moveY = 0

      if (isMobile && isSupported && orientation.gamma !== null && orientation.beta !== null) {
        // Use device orientation for mobile
        moveX = (orientation.gamma / 90) * 30 // Convert gamma [-90,90] to movement
        moveY = ((orientation.beta - 45) / 90) * 30 // Convert beta with offset
      } else if (mousePosition.x && mousePosition.y) {
        // Use mouse position for desktop
        moveX = (mousePosition.x - window.innerWidth / 2) / 40
        moveY = (mousePosition.y - window.innerHeight / 2) / 40
      }

      // Different intensities for different elements
      controlsLeft.start({
        x: -moveX * 1.5,
        y: -moveY * 0.5,
        transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
      })

      controlsRight.start({
        x: -moveX * 1.2,
        y: -moveY * 0.8,
        transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
      })

      controlsTop.start({
        x: -moveX * 0.8,
        y: -moveY * 1.2,
        transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
      })

      controlsBottom.start({
        x: -moveX * 0.5,
        y: -moveY * 1.5,
        transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
      })

      controlsCode.start({
        x: -moveX * 2,
        y: -moveY * 0.7,
        rotateZ: -moveX * 0.05,
        transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
      })
    }
  }, [
    mousePosition,
    orientation,
    isClient,
    isMobile,
    isSupported,
    controlsLeft,
    controlsRight,
    controlsTop,
    controlsBottom,
    controlsCode,
  ])

  // Hover effect variants
  const hoverVariants = {
    laptop: {
      scale: 1.2,
      color: "#0cc5ff",
      filter: "drop-shadow(0 0 8px rgba(12, 197, 255, 0.7))",
      transition: { duration: 0.3 },
    },
    terminal: {
      scale: 1.2,
      color: "#0cc5ff",
      filter: "drop-shadow(0 0 8px rgba(12, 197, 255, 0.7))",
      transition: { duration: 0.3 },
    },
    keyboard: {
      scale: 1.2,
      color: "#0cc5ff",
      filter: "drop-shadow(0 0 8px rgba(12, 197, 255, 0.7))",
      transition: { duration: 0.3 },
    },
    monitor: {
      scale: 1.2,
      color: "#0cc5ff",
      filter: "drop-shadow(0 0 8px rgba(12, 197, 255, 0.7))",
      transition: { duration: 0.3 },
    },
    bracket: {
      scale: 1.2,
      color: "#0cc5ff",
      textShadow: "0 0 15px rgba(12, 197, 255, 0.7)",
      transition: { duration: 0.3 },
    },
    code: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(12, 197, 255, 0.3)",
      borderColor: "#0cc5ff",
      transition: { duration: 0.3 },
    },
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/20 dark:to-primary/10" />

      {/* Tech illustrations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating code brackets */}
        <motion.div
          className="absolute text-primary/20 text-9xl font-mono hidden md:block cursor-pointer pointer-events-auto"
          style={{ top: "15%", left: "10%" }}
          initial={{ opacity: 0, x: -50 }}
          animate={controlsLeft}
          variants={hoverVariants}
          whileHover="bracket"
          onHoverStart={() => setHoveredElement("leftBracket")}
          onHoverEnd={() => setHoveredElement(null)}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {"{"}
        </motion.div>

        <motion.div
          className="absolute text-primary/20 text-9xl font-mono hidden md:block cursor-pointer pointer-events-auto"
          style={{ bottom: "15%", right: "10%" }}
          initial={{ opacity: 0, x: 50 }}
          animate={controlsRight}
          variants={hoverVariants}
          whileHover="bracket"
          onHoverStart={() => setHoveredElement("rightBracket")}
          onHoverEnd={() => setHoveredElement(null)}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {"}"}
        </motion.div>

        {/* Laptop illustration */}
        <motion.div
          className="absolute hidden md:block cursor-pointer pointer-events-auto"
          style={{ top: "20%", right: "15%" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 0.7,
            y: 0,
            ...controlsTop,
          }}
          variants={hoverVariants}
          whileHover="laptop"
          onHoverStart={() => setHoveredElement("laptop")}
          onHoverEnd={() => setHoveredElement(null)}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Laptop className={`h-16 w-16 ${hoveredElement === "laptop" ? "text-primary" : "text-primary/30"}`} />
        </motion.div>

        {/* Terminal illustration */}
        <motion.div
          className="absolute hidden md:block cursor-pointer pointer-events-auto"
          style={{ bottom: "25%", left: "15%" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 0.7,
            y: 0,
            ...controlsBottom,
          }}
          variants={hoverVariants}
          whileHover="terminal"
          onHoverStart={() => setHoveredElement("terminal")}
          onHoverEnd={() => setHoveredElement(null)}
          transition={{ duration: 1, delay: 1 }}
        >
          <Terminal className={`h-14 w-14 ${hoveredElement === "terminal" ? "text-primary" : "text-primary/30"}`} />
        </motion.div>

        {/* Keyboard illustration */}
        <motion.div
          className="absolute hidden md:block cursor-pointer pointer-events-auto"
          style={{ top: "30%", left: "25%" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 0.7,
            y: 0,
            ...controlsLeft,
          }}
          variants={hoverVariants}
          whileHover="keyboard"
          onHoverStart={() => setHoveredElement("keyboard")}
          onHoverEnd={() => setHoveredElement(null)}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <Keyboard className={`h-12 w-12 ${hoveredElement === "keyboard" ? "text-primary" : "text-primary/30"}`} />
        </motion.div>

        {/* Monitor illustration */}
        <motion.div
          className="absolute hidden md:block cursor-pointer pointer-events-auto"
          style={{ bottom: "30%", right: "25%" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 0.7,
            y: 0,
            ...controlsRight,
          }}
          variants={hoverVariants}
          whileHover="monitor"
          onHoverStart={() => setHoveredElement("monitor")}
          onHoverEnd={() => setHoveredElement(null)}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <MonitorSmartphone
            className={`h-12 w-12 ${hoveredElement === "monitor" ? "text-primary" : "text-primary/30"}`}
          />
        </motion.div>

        {/* Code lines */}
        <motion.div
          className="absolute hidden md:block"
          style={{ top: "40%", left: "5%" }}
          initial={{ opacity: 0, width: 0 }}
          animate={{
            opacity: 0.5,
            width: "100px",
            ...controlsLeft,
          }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <div className="h-0.5 bg-primary/30"></div>
        </motion.div>

        <motion.div
          className="absolute hidden md:block"
          style={{ bottom: "40%", right: "5%" }}
          initial={{ opacity: 0, width: 0 }}
          animate={{
            opacity: 0.5,
            width: "100px",
            ...controlsRight,
          }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <div className="h-0.5 bg-primary/30"></div>
        </motion.div>

        {/* Animated background elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10 dark:bg-primary/5"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Code snippet */}
      <motion.div
        className="absolute top-1/4 right-10 bg-card/80 p-4 rounded-lg border border-border shadow-lg backdrop-blur-sm hidden lg:block cursor-pointer pointer-events-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{
          opacity: 1,
          x: 0,
          ...controlsCode,
        }}
        variants={hoverVariants}
        whileHover="code"
        onHoverStart={() => setHoveredElement("codeSnippet")}
        onHoverEnd={() => setHoveredElement(null)}
        transition={{ duration: 1, delay: 2 }}
      >
        <pre className="text-xs text-muted-foreground">
          <code>
            <span className="text-blue-400">const</span> <span className="text-green-400">developer</span> = {"{"}
            <br />
            &nbsp;&nbsp;<span className="text-yellow-400">name</span>:{" "}
            <span className="text-orange-400">'Maximiliano Acri'</span>,
            <br />
            &nbsp;&nbsp;<span className="text-yellow-400">skills</span>: [<span className="text-orange-400">'AI'</span>,{" "}
            <span className="text-orange-400">'Cloud'</span>, <span className="text-orange-400">'Full-Stack'</span>],
            <br />
            &nbsp;&nbsp;<span className="text-yellow-400">passion</span>:{" "}
            <span className="text-orange-400">'Building impactful solutions'</span>
            <br />
            {"}"};
          </code>
        </pre>
      </motion.div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="text-primary">Maximiliano</span> Ezequiel Acri
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-6">{t("hero.title")}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-lg md:text-xl mb-8">{t("hero.subtitle")}</p>
          </motion.div>

          {/* Expertise badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <motion.div
              className="flex items-center bg-primary/10 rounded-full px-4 py-2"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(12, 197, 255, 0.2)",
                transition: { duration: 0.2 },
              }}
            >
              <Brain className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium">{t("hero.expertise.ai")}</span>
            </motion.div>
            <motion.div
              className="flex items-center bg-primary/10 rounded-full px-4 py-2"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(12, 197, 255, 0.2)",
                transition: { duration: 0.2 },
              }}
            >
              <Server className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium">{t("hero.expertise.cloud")}</span>
            </motion.div>
            <motion.div
              className="flex items-center bg-primary/10 rounded-full px-4 py-2"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(12, 197, 255, 0.2)",
                transition: { duration: 0.2 },
              }}
            >
              <Code className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium">{t("hero.expertise.fullstack")}</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg">
              <Link href="#contact">
                {t("hero.contact")} <Mail className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#projects">
                {t("hero.projects")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg">
              {t("hero.cv")} <Download className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary flex justify-center">
          <motion.div
            className="w-1 h-2 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  )
}
