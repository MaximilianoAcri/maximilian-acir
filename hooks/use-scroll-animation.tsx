"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"

export type AnimationVariant = "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "zoomIn" | "rotate" | "flip"

interface UseScrollAnimationProps {
  threshold?: number
  once?: boolean
  variant?: AnimationVariant
  delay?: number
  duration?: number
}

export function useScrollAnimation({
  threshold = 0.2,
  once = true,
  variant = "fadeIn",
  delay = 0,
  duration = 0.5,
}: UseScrollAnimationProps = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  // Define animation variants
  const variants = {
    hidden: {
      opacity: 0,
      y: variant === "slideUp" ? 50 : 0,
      x: variant === "slideLeft" ? 50 : variant === "slideRight" ? -50 : 0,
      scale: variant === "zoomIn" ? 0.8 : 1,
      rotate: variant === "rotate" ? -10 : 0,
      rotateX: variant === "flip" ? 90 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      rotateX: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }

  return { ref, isInView, variants }
}

// Función auxiliar para crear variantes de animación sin usar hooks
export function createAnimationVariants(variant: AnimationVariant = "fadeIn", delay = 0, duration = 0.5) {
  return {
    hidden: {
      opacity: 0,
      y: variant === "slideUp" ? 50 : 0,
      x: variant === "slideLeft" ? 50 : variant === "slideRight" ? -50 : 0,
      scale: variant === "zoomIn" ? 0.8 : 1,
      rotate: variant === "rotate" ? -10 : 0,
      rotateX: variant === "flip" ? 90 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      rotateX: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }
}
