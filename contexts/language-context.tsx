"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "EN" | "ES"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  language: {
    EN: "EN",
    ES: "ES",
  },
  // Navbar
  "nav.home": {
    EN: "Home",
    ES: "Inicio",
  },
  "nav.about": {
    EN: "About",
    ES: "Sobre mí",
  },
  "nav.skills": {
    EN: "Skills",
    ES: "Habilidades",
  },
  "nav.projects": {
    EN: "Projects",
    ES: "Proyectos",
  },
  "nav.certifications": {
    EN: "Certifications",
    ES: "Certificaciones",
  },
  "nav.contact": {
    EN: "Contact",
    ES: "Contacto",
  },

  // Hero
  "hero.title": {
    EN: "Full-Stack Developer & AI Tech Leader",
    ES: "Desarrollador Full-Stack & Líder Técnico en IA",
  },
  "hero.subtitle": {
    EN: "Building AI-powered web apps with real-world impact.",
    ES: "Creando aplicaciones web con IA de impacto real.",
  },
  "hero.contact": {
    EN: "Contact Me",
    ES: "Contáctame",
  },
  "hero.projects": {
    EN: "View Projects",
    ES: "Ver Proyectos",
  },
  "hero.cv": {
    EN: "Download CV",
    ES: "Descargar CV",
  },
  "hero.expertise.ai": {
    EN: "AI Expert",
    ES: "Experto en IA",
  },
  "hero.expertise.cloud": {
    EN: "Cloud Architect",
    ES: "Arquitecto Cloud",
  },
  "hero.expertise.fullstack": {
    EN: "Full-Stack Developer",
    ES: "Desarrollador Full-Stack",
  },

  // About
  "about.title": {
    EN: "About Me",
    ES: "Sobre Mí",
  },
  "about.subtitle": {
    EN: "Full-Stack Developer & AI Tech Leader",
    ES: "Desarrollador Full-Stack & Líder Técnico en IA",
  },
  "about.p1": {
    EN: "With over 5 years of experience in the tech industry, I specialize in building innovative solutions that leverage the latest in AI and web technologies.",
    ES: "Con más de 5 años de experiencia en la industria tecnológica, me especializo en crear soluciones innovadoras que aprovechan lo último en IA y tecnologías web.",
  },
  "about.p2": {
    EN: "Currently serving as a Tech Leader at Ultra Deep Tech, I focus on generative AI (LLMs, Vertex AI), scalable architectures in GCP, and business-aligned digital marketing strategies.",
    ES: "Actualmente trabajo como Líder Técnico en Ultra Deep Tech, enfocándome en IA generativa (LLMs, Vertex AI), arquitecturas escalables en GCP y estrategias de marketing digital alineadas con el negocio.",
  },
  "about.p3": {
    EN: "My passion lies in creating AI-powered web applications that deliver real-world impact and solve complex business challenges.",
    ES: "Mi pasión es crear aplicaciones web potenciadas con IA que generen impacto real y resuelvan desafíos empresariales complejos.",
  },
  "about.location": {
    EN: "Location",
    ES: "Ubicación",
  },
  "about.experience": {
    EN: "Experience",
    ES: "Experiencia",
  },
  "about.email": {
    EN: "Email",
    ES: "Correo",
  },
  "about.languages": {
    EN: "Languages",
    ES: "Idiomas",
  },
  "about.years": {
    EN: "5+ Years",
    ES: "5+ Años",
  },
  "about.langs": {
    EN: "English, Spanish",
    ES: "Inglés, Español",
  },

  // Technologies
  "tech.title": {
    EN: "Technologies I Use",
    ES: "Tecnologías que Utilizo",
  },
  "tech.subtitle": {
    EN: "My technical toolkit spans across multiple domains, allowing me to build comprehensive solutions from frontend to AI integration.",
    ES: "Mi conjunto de herramientas técnicas abarca múltiples dominios, permitiéndome construir soluciones integrales desde el frontend hasta la integración de IA.",
  },
  "tech.languages": {
    EN: "Languages",
    ES: "Lenguajes",
  },
  "tech.frontend": {
    EN: "Frontend",
    ES: "Frontend",
  },
  "tech.backend": {
    EN: "Backend",
    ES: "Backend",
  },
  "tech.databases": {
    EN: "Databases",
    ES: "Bases de Datos",
  },
  "tech.cloud": {
    EN: "Cloud & DevOps",
    ES: "Cloud & DevOps",
  },
  "tech.testing": {
    EN: "Testing",
    ES: "Testing",
  },
  "tech.ai": {
    EN: "AI & Monitoring",
    ES: "IA & Monitoreo",
  },
  "tech.marketing": {
    EN: "Marketing & Analytics",
    ES: "Marketing & Analítica",
  },
  "tech.design": {
    EN: "Design",
    ES: "Diseño",
  },
  "tech.projects": {
    EN: "Projects & Applications",
    ES: "Proyectos y Aplicaciones",
  },
  "tech.experience": {
    EN: "Professional experience",
    ES: "Experiencia profesional",
  },

  // Projects
  "projects.title": {
    EN: "Featured Projects",
    ES: "Proyectos Destacados",
  },
  "projects.subtitle": {
    EN: "A selection of my real-world projects showcasing expertise in AI integration, cloud architecture, and technical leadership.",
    ES: "Una selección de mis proyectos reales que demuestran mi experiencia en integración de IA, arquitectura en la nube y liderazgo técnico.",
  },
  "projects.code": {
    EN: "Code",
    ES: "Código",
  },
  "projects.demo": {
    EN: "Demo",
    ES: "Demo",
  },
  "projects.visit": {
    EN: "Visit Site",
    ES: "Visitar Sitio",
  },
  "projects.filter.all": {
    EN: "All Projects",
    ES: "Todos los Proyectos",
  },
  "projects.filter.ai": {
    EN: "AI & ML",
    ES: "IA & ML",
  },
  "projects.filter.dashboard": {
    EN: "Dashboards",
    ES: "Dashboards",
  },
  "projects.filter.web": {
    EN: "Websites",
    ES: "Sitios Web",
  },
  "projects.filter.chatbot": {
    EN: "Chatbots",
    ES: "Chatbots",
  },

  // Certifications
  "cert.title": {
    EN: "Certifications & Education",
    ES: "Certificaciones y Educación",
  },
  "cert.subtitle": {
    EN: "My continuous learning journey and formal education that have shaped my professional expertise.",
    ES: "Mi viaje de aprendizaje continuo y educación formal que han moldeado mi experiencia profesional.",
  },
  "cert.professional": {
    EN: "Professional Certifications",
    ES: "Certificaciones Profesionales",
  },
  "cert.education": {
    EN: "Education",
    ES: "Educación",
  },
  "cert.continuous": {
    EN: "Continuous Learning",
    ES: "Aprendizaje Continuo",
  },
  "cert.continuous.desc": {
    EN: "Over 5 years of intensive training in web development, programming languages, and generative AI technologies (LLMs), always staying updated with the latest tools in the market.",
    ES: "Más de 5 años de formación intensiva en desarrollo web, lenguajes de programación y tecnologías de inteligencia artificial generativa (LLMs), manteniéndome siempre actualizado con las últimas herramientas del mercado.",
  },
  "cert.workshops": {
    EN: "AI/ML Workshops",
    ES: "Talleres de IA/ML",
  },
  "cert.cloud": {
    EN: "Cloud Architecture",
    ES: "Arquitectura Cloud",
  },
  "cert.conferences": {
    EN: "Tech Conferences",
    ES: "Conferencias Tech",
  },
  "cert.online": {
    EN: "Online Courses",
    ES: "Cursos Online",
  },

  // Contact
  "contact.title": {
    EN: "Get In Touch",
    ES: "Ponte en Contacto",
  },
  "contact.subtitle": {
    EN: "Have a project in mind or want to discuss potential collaborations? Feel free to reach out!",
    ES: "¿Tienes un proyecto en mente o quieres discutir posibles colaboraciones? ¡No dudes en contactarme!",
  },
  "contact.info": {
    EN: "Contact Information",
    ES: "Información de Contacto",
  },
  "contact.desc": {
    EN: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    ES: "Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tu visión.",
  },
  "contact.email": {
    EN: "Email",
    ES: "Correo",
  },
  "contact.location": {
    EN: "Location",
    ES: "Ubicación",
  },
  "contact.connect": {
    EN: "Connect with me",
    ES: "Conéctate conmigo",
  },
  "contact.name": {
    EN: "Name",
    ES: "Nombre",
  },
  "contact.message": {
    EN: "Message",
    ES: "Mensaje",
  },
  "contact.send": {
    EN: "Send Message",
    ES: "Enviar Mensaje",
  },
  "contact.sending": {
    EN: "Sending...",
    ES: "Enviando...",
  },
  "contact.success": {
    EN: "Message sent!",
    ES: "¡Mensaje enviado!",
  },
  "contact.success.desc": {
    EN: "Thanks for reaching out. I'll get back to you soon.",
    ES: "Gracias por contactarme. Te responderé pronto.",
  },
  "contact.name.placeholder": {
    EN: "Your name",
    ES: "Tu nombre",
  },
  "contact.email.placeholder": {
    EN: "Your email",
    ES: "Tu correo",
  },
  "contact.message.placeholder": {
    EN: "Your message",
    ES: "Tu mensaje",
  },

  // Footer
  "footer.rights": {
    EN: "All rights reserved.",
    ES: "Todos los derechos reservados.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN")

  useEffect(() => {
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "EN" || savedLanguage === "ES")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Save language preference
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    if (!translations[key as keyof typeof translations]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key as keyof typeof translations][language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
