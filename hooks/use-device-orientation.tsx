"use client"

import { useState, useEffect } from "react"

interface DeviceOrientation {
  alpha: number | null // Z-axis rotation [0, 360)
  beta: number | null // X-axis rotation [-180, 180)
  gamma: number | null // Y-axis rotation [-90, 90)
  absolute: boolean | null
}

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<DeviceOrientation>({
    alpha: null,
    beta: null,
    gamma: null,
    absolute: null,
  })
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if DeviceOrientationEvent is supported
    if (window && "DeviceOrientationEvent" in window) {
      setIsSupported(true)

      const handleOrientation = (event: DeviceOrientationEvent) => {
        setOrientation({
          alpha: event.alpha,
          beta: event.beta,
          gamma: event.gamma,
          absolute: event.absolute,
        })
      }

      window.addEventListener("deviceorientation", handleOrientation, true)

      return () => {
        window.removeEventListener("deviceorientation", handleOrientation, true)
      }
    }
  }, [])

  return { orientation, isSupported }
}
