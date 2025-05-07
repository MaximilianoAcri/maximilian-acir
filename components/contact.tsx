"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Send, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function Contact() {
  const containerRef = useRef(null)
  const { toast } = useToast()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Usar diferentes variantes de animación para diferentes elementos
  const titleAnimation = useScrollAnimation({ variant: "fadeIn", threshold: 0.1 })
  const leftColumnAnimation = useScrollAnimation({ variant: "slideLeft", threshold: 0.2, duration: 0.7 })
  const rightColumnAnimation = useScrollAnimation({ variant: "slideRight", threshold: 0.2, duration: 0.7 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Preparamos el payload en formato x-www-form-urlencoded
    const payload = new URLSearchParams({
      "form-name": "contact",
      name:     formData.name,
      email:    formData.email,
      message:  formData.message,
    });
  
    try {
      // Enviamos al endpoint estático que Netlify detecta en public/__forms.html
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
  
      toast({
        title: t("contact.success"),
        description: t("contact.success.desc"),
      });
  
      // Reseteamos el formulario
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error enviando form a Netlify:", err);
      toast({
        title: t("contact.error") || "Error al enviar",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

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
    <section id="contact" className="py-20 bg-muted/30 dark:bg-muted/10" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={titleAnimation.ref}
            initial="hidden"
            animate={titleAnimation.isInView ? "visible" : "hidden"}
            variants={titleAnimation.variants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("contact.title")}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              ref={leftColumnAnimation.ref}
              initial="hidden"
              animate={leftColumnAnimation.isInView ? "visible" : "hidden"}
              variants={leftColumnAnimation.variants}
            >
              <h3 className="text-2xl font-bold mb-6">{t("contact.info")}</h3>
              <p className="text-muted-foreground mb-8">{t("contact.desc")}</p>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={leftColumnAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h4 className="font-semibold mb-2">{t("contact.email")}</h4>
                  <p className="text-muted-foreground">maximilianoacri1@gmail.com</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={leftColumnAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h4 className="font-semibold mb-2">{t("contact.location")}</h4>
                  <p className="text-muted-foreground">Buenos Aires, Argentina</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={leftColumnAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h4 className="font-semibold mb-4">{t("contact.connect")}</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-card hover:bg-primary/10 p-3 rounded-full transition-colors"
                        aria-label={link.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={leftColumnAnimation.isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                          transition: { duration: 0.2 },
                        }}
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              ref={rightColumnAnimation.ref}
              initial="hidden"
              animate={rightColumnAnimation.isInView ? "visible" : "hidden"}
              variants={rightColumnAnimation.variants}
            >
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
        </div>
      </div>
    </section>
  )
}
