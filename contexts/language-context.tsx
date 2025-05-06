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

  // Projects
  "projects.title": {
    EN: "Featured Projects",
    ES: "Proyectos Destacados",
  },
  "projects.subtitle": {
    EN: "A selection of my recent work showcasing my skills in full-stack development, AI integration, and cloud architecture.",
    ES: "Una selección de mi trabajo reciente que muestra mis habilidades en desarrollo full-stack, integración de IA y arquitectura en la nube.",
  },
  "projects.code": {
    EN: "Code",
    ES: "Código",
  },
  "projects.demo": {
    EN: "Demo",
    ES: "Demo",
  },
  "project1.title": {
    EN: "ClinicManager",
    ES: "ClinicManager",
  },
  "project1.description": {
    EN: "A comprehensive SaaS application for healthcare providers to manage patient records, appointments, and billing.",
    ES: "Una aplicación SaaS integral para proveedores de salud para gestionar registros de pacientes, citas y facturación.",
  },
  "project2.title": {
    EN: "Chatbot with Vertex AI",
    ES: "Chatbot con Vertex AI",
  },
  "project2.description": {
    EN: "An intelligent customer service chatbot powered by Google's Vertex AI, capable of handling complex queries and providing personalized responses.",
    ES: "Un chatbot inteligente de servicio al cliente impulsado por Vertex AI de Google, capaz de manejar consultas complejas y proporcionar respuestas personalizadas.",
  },
  "project3.title": {
    EN: "Real-Time Metrics Dashboard",
    ES: "Panel de Métricas en Tiempo Real",
  },
  "project3.description": {
    EN: "A real-time analytics dashboard that visualizes key business metrics and KPIs with interactive charts and customizable views.",
    ES: "Un panel de análisis en tiempo real que visualiza métricas comerciales clave y KPIs con gráficos interactivos y vistas personalizables.",
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
    EN: "I'm committed to ongoing professional development through online courses, workshops, and industry conferences to stay at the forefront of technology trends.",
    ES: "Estoy comprometido con el desarrollo profesional continuo a través de cursos en línea, talleres y conferencias de la industria para mantenerme a la vanguardia de las tendencias tecnológicas.",
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
