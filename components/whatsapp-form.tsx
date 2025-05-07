"use client"

import type React from "react"

import { useState } from "react"
import { MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/hooks/use-toast"

export default function WhatsAppForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    message: "",
  })

  const translations = {
    title: {
      EN: "Contact via WhatsApp",
      ES: "Contactar por WhatsApp",
    },
    name: {
      EN: "Name",
      ES: "Nombre",
    },
    company: {
      EN: "Company",
      ES: "Empresa",
    },
    message: {
      EN: "Message",
      ES: "Mensaje",
    },
    namePlaceholder: {
      EN: "Your name",
      ES: "Tu nombre",
    },
    companyPlaceholder: {
      EN: "Your company",
      ES: "Tu empresa",
    },
    messagePlaceholder: {
      EN: "How can I help you?",
      ES: "¿Cómo puedo ayudarte?",
    },
    send: {
      EN: "Send to WhatsApp",
      ES: "Enviar a WhatsApp",
    },
    sending: {
      EN: "Sending...",
      ES: "Enviando...",
    },
    required: {
      EN: "This field is required",
      ES: "Este campo es obligatorio",
    },
    success: {
      EN: "Message prepared for WhatsApp",
      ES: "Mensaje preparado para WhatsApp",
    },
    cancel: {
      EN: "Cancel",
      ES: "Cancelar",
    },
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!formData.name.trim() || !formData.message.trim()) {
      toast({
        title: translations.required[language as keyof typeof translations.required],
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Format message for WhatsApp
      const formattedMessage = `*${translations.name[language as keyof typeof translations.name]}:* ${formData.name}\n*${
        translations.company[language as keyof typeof translations.company]
      }:* ${formData.company}\n\n${formData.message}`

      const encodedMessage = encodeURIComponent(formattedMessage)

      // Using wa.link API (replace with your phone number)
      const whatsappUrl = `https://wa.me/+5491123456789?text=${encodedMessage}`

      toast({
        title: translations.success[language as keyof typeof translations.success],
      })

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank")

      // Reset form and close modal
      setFormData({ name: "", company: "", message: "" })
      setIsOpen(false)
    } catch (error) {
      console.error("Error sending to WhatsApp:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
        aria-label={language === "EN" ? "Contact via WhatsApp" : "Contactar por WhatsApp"}
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-card border border-border rounded-lg shadow-xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-primary p-4">
                <h3 className="text-xl font-bold text-primary-foreground flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  {translations.title[language as keyof typeof translations.title]}
                </h3>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{translations.name[language as keyof typeof translations.name]} *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={translations.namePlaceholder[language as keyof typeof translations.namePlaceholder]}
                    required
                    aria-required="true"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">{translations.company[language as keyof typeof translations.company]}</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={
                      translations.companyPlaceholder[language as keyof typeof translations.companyPlaceholder]
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    {translations.message[language as keyof typeof translations.message]} *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      translations.messagePlaceholder[language as keyof typeof translations.messagePlaceholder]
                    }
                    rows={4}
                    required
                    aria-required="true"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    aria-label={translations.cancel[language as keyof typeof translations.cancel]}
                  >
                    {translations.cancel[language as keyof typeof translations.cancel]}
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isSubmitting}
                    aria-label={translations.send[language as keyof typeof translations.send]}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {translations.sending[language as keyof typeof translations.sending]}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        {translations.send[language as keyof typeof translations.send]}
                        <Send className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
