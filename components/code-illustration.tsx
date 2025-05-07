"use client"

import { motion, useAnimation } from "framer-motion"
import { useTheme } from "next-themes"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { useDeviceOrientation } from "@/hooks/use-device-orientation"
import { useMobile } from "@/hooks/use-mobile"
import { useEffect, useState } from "react"

export default function CodeIllustration() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const { mousePosition, isClient } = useMousePosition()
  const { orientation, isSupported } = useDeviceOrientation()
  const { isMobile } = useMobile()
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)

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
        moveX = (mousePosition.x - window.innerWidth / 2) / 30
        moveY = (mousePosition.y - window.innerHeight / 2) / 30
      }

      controls.start({
        x: moveX,
        y: moveY,
        transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
      })
    }
  }, [mousePosition, orientation, isClient, isMobile, isSupported, controls])

  return (
    <motion.div
      className="absolute left-10 bottom-1/4 hidden xl:block cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        ...controls,
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 1, delay: 2.2 }}
    >
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Monitor */}
        <motion.rect
          x="20"
          y="30"
          width="160"
          height="100"
          rx="4"
          fill={isDark ? "#1e293b" : "#f1f5f9"}
          stroke={isHovered ? "#0cc5ff" : isDark ? "#0cc5ff" : "#0284c7"}
          strokeWidth={isHovered ? "3" : "2"}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 2.4 }}
        />

        {/* Screen */}
        <motion.rect
          x="30"
          y="40"
          width="140"
          height="80"
          rx="2"
          fill={isDark ? "#0f172a" : "#e2e8f0"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.6 }}
        />

        {/* Stand */}
        <motion.path
          d="M100 130L100 150M70 150L130 150"
          stroke={isHovered ? "#0cc5ff" : isDark ? "#0cc5ff" : "#0284c7"}
          strokeWidth={isHovered ? "3" : "2"}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
        />

        {/* Code lines */}
        <motion.path
          d="M45 55L115 55"
          stroke={isHovered ? "#0cc5ff" : isDark ? "#94a3b8" : "#64748b"}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 3 }}
        />

        <motion.path
          d="M45 70L95 70"
          stroke={isHovered ? "#0cc5ff" : isDark ? "#94a3b8" : "#64748b"}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 3.2 }}
        />

        <motion.path
          d="M55 85L125 85"
          stroke={isHovered ? "#0cc5ff" : isDark ? "#94a3b8" : "#64748b"}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 3.4 }}
        />

        <motion.path
          d="M55 100L105 100"
          stroke={isHovered ? "#0cc5ff" : isDark ? "#94a3b8" : "#64748b"}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 3.6 }}
        />

        {/* Brackets */}
        <motion.path
          d="M40 60L35 75L40 90"
          stroke={isHovered ? "#0cc5ff" : isDark ? "#0cc5ff" : "#0284c7"}
          strokeWidth={isHovered ? "3" : "2"}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 3.8 }}
        />

        <motion.path
          d="M130 60L135 75L130 90"
          stroke={isHovered ? "#0cc5ff" : isDark ? "#0cc5ff" : "#0284c7"}
          strokeWidth={isHovered ? "3" : "2"}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 4 }}
        />

        {/* Keyboard */}
        <motion.rect
          x="50"
          y="160"
          width="100"
          height="20"
          rx="4"
          fill={isDark ? "#1e293b" : "#f1f5f9"}
          stroke={isHovered ? "#0cc5ff" : isDark ? "#0cc5ff" : "#0284c7"}
          strokeWidth={isHovered ? "3" : "2"}
          initial={{ y: 180, opacity: 0 }}
          animate={{ y: 160, opacity: 1 }}
          transition={{ duration: 0.5, delay: 4.2 }}
        />

        {/* Keys */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <motion.rect
            key={i}
            x={60 + i * 10}
            y="165"
            width="6"
            height="3"
            rx="1"
            fill={isHovered ? "#0cc5ff" : isDark ? "#94a3b8" : "#64748b"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 4.4 + i * 0.1 }}
          />
        ))}
      </svg>

      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 filter blur-xl -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}
