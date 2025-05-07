"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const chatRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Format message for WhatsApp
      const encodedMessage = encodeURIComponent(message)
      // Open WhatsApp with the pre-filled message
      window.open(`https://wa.me/+5491159929083?text=${encodedMessage}`, "_blank")
      setMessage("")
      setIsOpen(false)
    }
  }

  const translations = {
    title: {
      EN: "Chat with Max",
      ES: "Chatea con Max",
    },
    placeholder: {
      EN: "Type your message here...",
      ES: "Escribe tu mensaje aquí...",
    },
    send: {
      EN: "Send",
      ES: "Enviar",
    },
    intro: {
      EN: "Hi there! 👋 How can I help you today?",
      ES: "¡Hola! 👋 ¿Cómo puedo ayudarte hoy?",
    },
  }

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={chatRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 100 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-card shadow-lg rounded-lg w-80 mb-4 overflow-hidden border border-border"
          >
            {/* Chat header */}
            <div className="bg-primary p-4 flex justify-between items-center">
              <h3 className="text-primary-foreground font-semibold">
                {translations.title[t("language") as keyof typeof translations.title]}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary/80"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Chat body */}
            <div className="p-4 bg-muted/30 h-60">
              <div className="bg-card p-3 rounded-lg shadow-sm inline-block max-w-[80%]">
                <p className="text-sm">{translations.intro[t("language") as keyof typeof translations.intro]}</p>
              </div>
            </div>

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-3 bg-card flex gap-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={translations.placeholder[t("language") as keyof typeof translations.placeholder]}
                className="resize-none text-sm"
                rows={2}
              />
              <Button type="submit" size="icon" className="h-auto">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
        aria-label="Open WhatsApp chat"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>
    </div>
  )
}
