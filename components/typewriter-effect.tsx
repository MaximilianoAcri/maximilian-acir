"use client"

import { useState, useEffect } from "react"

interface TypewriterEffectProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

export default function TypewriterEffect({
  text,
  speed = 50,
  delay = 0,
  className = "",
  onComplete,
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // Reset if text changes
    setDisplayText("")
    setCurrentIndex(0)
    setIsComplete(false)

    // Initial delay before starting
    const startTyping = () => {
      if (currentIndex < text.length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }, speed)
      } else if (!isComplete) {
        setIsComplete(true)
        if (onComplete) onComplete()
      }
    }

    if (delay > 0 && currentIndex === 0) {
      timeout = setTimeout(startTyping, delay)
    } else {
      startTyping()
    }

    return () => clearTimeout(timeout)
  }, [text, speed, delay, currentIndex, isComplete, onComplete])

  return (
    <span className={className}>
      {displayText}
      {!isComplete && <span className="inline-block w-1 h-5 bg-primary animate-pulse ml-0.5"></span>}
    </span>
  )
}
