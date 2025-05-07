"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Send, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { toast } = useToast()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: t("contact.success"),
      description: t("contact.success.desc"),
    })

    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)
  }

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://linkedin.com/in/maximilianoeacri",
    },
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/MaximilianoAcri",
    },
    {
      name: "Email",
      icon: <Mail className="h-5 w-5" />,
      url: "mailto:maximilianoacri1@gmail.com",
    },
    {
      name: "WhatsApp",
      icon: <MessageSquare className="h-5 w-5" />,
      url: "https://wa.link/gc7p05",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-muted/30 dark:bg-muted/10" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("contact.title")}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6">{t("contact.info")}</h3>
              <p className="text-muted-foreground mb-8">{t("contact.desc")}</p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">{t("contact.email")}</h4>
                  <p className="text-muted-foreground">maximilianoacri1@gmail.com</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t("contact.location")}</h4>
                  <p className="text-muted-foreground">Buenos Aires, Argentina</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">{t("contact.connect")}</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-card hover:bg-primary/10 p-3 rounded-full transition-colors"
                        aria-label={link.name}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
            <form
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  className="space-y-6"
>
  {/* Honeypot para bots */}
  <input type="hidden" name="form-name" value="contact" />
  <input type="hidden" name="bot-field" />

  {/* Nombre */}
  <div>
    <label htmlFor="name" className="block text-sm font-medium mb-2">
      Nombre *
    </label>
    <Input
      id="name"
      name="name"
      placeholder="Tu nombre"
      required
    />
  </div>

  {/* Empresa */}
  <div>
    <label htmlFor="company" className="block text-sm font-medium mb-2">
      Empresa
    </label>
    <Input
      id="company"
      name="company"
      placeholder="Tu empresa"
    />
  </div>

  {/* Mensaje */}
  <div>
    <label htmlFor="message" className="block text-sm font-medium mb-2">
      Mensaje *
    </label>
    <Textarea
      id="message"
      name="message"
      placeholder="Tu mensaje"
      rows={5}
      required
    />
  </div>

  {/* Botón de envío */}
  <Button type="submit" className="w-full">
    Enviar
  </Button>
</form>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
