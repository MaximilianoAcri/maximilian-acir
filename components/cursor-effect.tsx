"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { useDeviceOrientation } from "@/hooks/use-device-orientation"
import { useMobile } from "@/hooks/use-mobile"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  originalX: number
  originalY: number
}

export default function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { mousePosition } = useMousePosition()
  const { orientation, isSupported } = useDeviceOrientation()
  const { isMobile } = useMobile()
  const nodesRef = useRef<Node[]>([])
  const animationFrameRef = useRef<number>(0)
  const { theme } = useTheme()

  // Initialize nodes
  useEffect(() => {
    const initializeNodes = () => {
      const nodes: Node[] = []
      const nodeCount = isMobile ? 15 : 25 // Aumentado para más conexiones

      // Crear una cuadrícula para distribuir los nodos más uniformemente
      const gridSize = Math.ceil(Math.sqrt(nodeCount))
      const cellWidth = window.innerWidth / gridSize
      const cellHeight = window.innerHeight / gridSize

      for (let i = 0; i < nodeCount; i++) {
        // Calcular posición en la cuadrícula
        const gridX = i % gridSize
        const gridY = Math.floor(i / gridSize)

        // Añadir algo de aleatoriedad dentro de cada celda
        const x = gridX * cellWidth + Math.random() * cellWidth * 0.8 + cellWidth * 0.1
        const y = gridY * cellHeight + Math.random() * cellHeight * 0.8 + cellHeight * 0.1

        nodes.push({
          x,
          y,
          originalX: x,
          originalY: y,
          vx: (Math.random() - 0.5) * 0.3, // Movimiento más lento
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
        })
      }

      nodesRef.current = nodes
    }

    initializeNodes()

    const handleResize = () => {
      initializeNodes()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isMobile])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      const nodes = nodesRef.current

      // Determine interaction point (mouse or gyroscope)
      let interactionX = 0
      let interactionY = 0
      let hasInteraction = false

      if (isMobile && isSupported && orientation.gamma !== null && orientation.beta !== null) {
        // Use device orientation for mobile
        interactionX = window.innerWidth / 2 + ((orientation.gamma / 90) * window.innerWidth) / 2
        interactionY = window.innerHeight / 2 + (((orientation.beta - 45) / 90) * window.innerHeight) / 2
        hasInteraction = true
      } else if (mousePosition.x && mousePosition.y) {
        // Use mouse position for desktop
        interactionX = mousePosition.x
        interactionY = mousePosition.y
        hasInteraction = true
      }

      // Set colors based on theme
      const nodeColor = theme === "dark" ? "rgba(0, 195, 255, 0.7)" : "rgba(0, 100, 255, 0.7)"
      const lineColor = theme === "dark" ? "rgba(0, 195, 255, 0.2)" : "rgba(0, 100, 255, 0.2)"
      const interactionLineColor = theme === "dark" ? "rgba(0, 195, 255, 0.3)" : "rgba(0, 100, 255, 0.3)"

      // Draw connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Apply interaction influence - nodes are SLIGHTLY attracted to the cursor or gyroscope tilt
        // Reduced attraction force significantly
        if (hasInteraction) {
          const dx = interactionX - node.x
          const dy = interactionY - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            // Weaker attraction force (reduced from 2000 to 5000)
            const force = (150 - distance) / 5000
            node.vx += dx * force
            node.vy += dy * force
          } else {
            // Return to original position when far from interaction point
            const dx = node.originalX - node.x
            const dy = node.originalY - node.y
            node.vx += dx * 0.01
            node.vy += dy * 0.01
          }
        }

        // Apply friction to slow down
        node.vx *= 0.95
        node.vy *= 0.95

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = nodeColor
        ctx.fill()

        // Connect to nearby nodes - INCREASED connection distance for more connections
        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j]
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Increased from 100 to 150 for more connections
          if (distance < 150) {
            // Connection distance
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            // Make line opacity based on distance
            const opacity = 1 - distance / 150
            ctx.strokeStyle =
              theme === "dark" ? `rgba(0, 195, 255, ${opacity * 0.3})` : `rgba(0, 100, 255, ${opacity * 0.3})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Connect to interaction point if nearby - REDUCED number of connections to cursor
        if (hasInteraction) {
          const dx = node.x - interactionX
          const dy = node.y - interactionY
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Reduced from 150 to 100 for fewer connections to cursor
          if (distance < 100) {
            // Interaction connection distance
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(interactionX, interactionY)
            const opacity = 1 - distance / 100
            ctx.strokeStyle =
              theme === "dark" ? `rgba(0, 195, 255, ${opacity * 0.3})` : `rgba(0, 100, 255, ${opacity * 0.3})`
            ctx.lineWidth = 0.5 // Reduced from 1 to 0.5
            ctx.stroke()
          }
        }
      }

      // Draw interaction point
      if (hasInteraction) {
        ctx.beginPath()
        ctx.arc(interactionX, interactionY, 3, 0, Math.PI * 2)
        ctx.fillStyle = nodeColor
        ctx.fill()
      }

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [mousePosition, orientation, theme, isMobile, isSupported])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
      style={{ opacity: 0.8 }}
    />
  )
}
