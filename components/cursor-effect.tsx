"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export default function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const nodesRef = useRef<Node[]>([])
  const animationFrameRef = useRef<number>(0)
  const { theme } = useTheme()

  // Initialize nodes
  useEffect(() => {
    const initializeNodes = () => {
      const nodes: Node[] = []
      const nodeCount = 20 // Reduced for better performance

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5, // Slower movement
          vy: (Math.random() - 0.5) * 0.5,
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
  }, [])

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

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
      const mouseNode = { x: mousePosition.x, y: mousePosition.y, radius: 0 }

      // Set colors based on theme
      const nodeColor = theme === "dark" ? "rgba(0, 195, 255, 0.7)" : "rgba(0, 100, 255, 0.7)"
      const lineColor = theme === "dark" ? "rgba(0, 195, 255, 0.2)" : "rgba(0, 100, 255, 0.2)"
      const mouseLineColor = theme === "dark" ? "rgba(0, 195, 255, 0.3)" : "rgba(0, 100, 255, 0.3)"

      // Draw connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

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

        // Connect to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j]
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            // Connection distance
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Connect to mouse if nearby
        const dx = node.x - mouseNode.x
        const dy = node.y - mouseNode.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          // Mouse connection distance
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(mouseNode.x, mouseNode.y)
          ctx.strokeStyle = mouseLineColor
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      // Draw mouse node
      ctx.beginPath()
      ctx.arc(mouseNode.x, mouseNode.y, 3, 0, Math.PI * 2)
      ctx.fillStyle = nodeColor
      ctx.fill()

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [mousePosition, theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ opacity: 0.8 }}
    />
  )
}
