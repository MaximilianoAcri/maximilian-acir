"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Code } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Badge } from "@/components/ui/badge"

type ProjectCategory = "all" | "ai" | "dashboard" | "web" | "chatbot"

interface Project {
  id: string
  title: {
    EN: string
    ES: string
  }
  description: {
    EN: string
    ES: string
  }
  image: string
  stack: string[]
  categories: ProjectCategory[]
  demoLink?: string
  repoLink?: string
  websiteLink?: string
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { t, language } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all")

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

  const projects: Project[] = [
    {
      id: "financial-chatbot",
      title: {
        EN: "Financial Chatbot",
        ES: "Chatbot Financiero",
      },
      description: {
        EN: "Full-stack architecture for an LLM-powered financial chatbot. Handles sensitive queries with context and prompt security mechanisms. Integration with NLP pipelines and observability layers.",
        ES: "Arquitectura full-stack para un chatbot financiero potenciado por LLMs. Maneja consultas sensibles con contexto y mecanismos de seguridad en los prompts. Integración con pipelines NLP y capas de observabilidad.",
      },
      image: "/placeholder.svg?height=300&width=600",
      stack: ["Python", "FastAPI", "React", "Vertex AI", "OpenAI", "Firebase", "GCP", "Docker"],
      categories: ["ai", "chatbot"],
      demoLink: "#",
      repoLink: "#",
    },
    {
      id: "grc-shield",
      title: {
        EN: "Safety Shield – AI Risk Monitoring Dashboard",
        ES: "Safety Shield – Dashboard de Monitoreo de Riesgos de IA",
      },
      description: {
        EN: "Real-time dashboard for AI risk monitoring, including prompt injection detection, data leakage, and behavioral drift. Modular backend with Firebase and Cloud Run.",
        ES: "Dashboard en tiempo real para monitoreo de riesgos de IA, incluyendo detección de inyecciones de prompt, fugas de datos y drift conductual. Backend modular con Firebase y Cloud Run.",
      },
      image: "/placeholder.svg?height=300&width=600",
      stack: ["React", "TypeScript", "Firebase", "Cloud Run", "Chart.js", "Tailwind CSS", "Node.js"],
      categories: ["ai", "dashboard"],
      demoLink: "#",
    },
    {
      id: "commerce-dashboard",
      title: {
        EN: "Commerce Dashboard for SMBs",
        ES: "Dashboard Comercial para PYMEs",
      },
      description: {
        EN: "Analytics dashboard for SMBs developed with React and Chart.js. Visualizes key metrics and customer behavior, with dynamic filters and Google Cloud backend.",
        ES: "Dashboard interactivo para pequeñas empresas. React + Chart.js con filtros dinámicos y backend en Google Cloud.",
      },
      image: "/placeholder.svg?height=300&width=600",
      stack: ["React", "Chart.js", "Google Cloud", "BigQuery", "Node.js", "Express", "Material UI"],
      categories: ["dashboard"],
      demoLink: "#",
    },
    {
      id: "web-chatbot",
      title: {
        EN: "Web-Embedded Chatbot Interface",
        ES: "Interfaz de Chatbot Embebible en Web",
      },
      description: {
        EN: "Lightweight chatbot component, embeddable in external sites, fully customizable and focused on cross-platform compatibility.",
        ES: "Chatbot ligero embebido para sitios externos. Personalizable, rápido y multiplataforma.",
      },
      image: "/placeholder.svg?height=300&width=600",
      stack: ["JavaScript", "React", "WebSockets", "CSS-in-JS", "Node.js", "Express"],
      categories: ["web", "chatbot"],
      demoLink: "#",
      repoLink: "#",
    },
    {
      id: "ultradeeptech",
      title: {
        EN: "ultradeeptech.com",
        ES: "ultradeeptech.com",
      },
      description: {
        EN: "Corporate website for an AI security company. Multi-language support, contact forms, accessible design, and focus on performance and technical SEO.",
        ES: "Sitio corporativo para empresa de seguridad en IA. Multilenguaje, responsive, SEO técnico y formularios de contacto.",
      },
      image: "/placeholder.svg?height=300&width=600",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel", "i18n"],
      categories: ["web"],
      websiteLink: "https://ultradeeptech.com",
    },
    {
      id: "malemaxsrl",
      title: {
        EN: "malemaxsrl.com",
        ES: "malemaxsrl.com",
      },
      description: {
        EN: "Industrial services page with responsive design, CMS-ready structure, and integration with contact automation tools.",
        ES: "Sitio para servicios industriales. Diseño responsivo, estructura CMS y automatización de contacto.",
      },
      image: "/placeholder.svg?height=300&width=600",
      stack: ["WordPress", "PHP", "JavaScript", "SCSS", "MySQL", "AWS"],
      categories: ["web"],
      websiteLink: "https://malemaxsrl.com",
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.categories.includes(activeFilter))

  const filterOptions: { value: ProjectCategory; label: { EN: string; ES: string } }[] = [
    { value: "all", label: { EN: "All Projects", ES: "Todos los Proyectos" } },
    { value: "ai", label: { EN: "AI & ML", ES: "IA & ML" } },
    { value: "dashboard", label: { EN: "Dashboards", ES: "Dashboards" } },
    { value: "web", label: { EN: "Websites", ES: "Sitios Web" } },
    { value: "chatbot", label: { EN: "Chatbots", ES: "Chatbots" } },
  ]

  return (
    <section id="projects" className="py-20 bg-muted/30 dark:bg-muted/10" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("projects.title")}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("projects.subtitle")}</p>
          </motion.div>

          {/* Filter Controls */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mb-10">
            <div className="inline-flex items-center bg-card rounded-full p-1 border border-border">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setActiveFilter(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === option.value ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                  aria-label={option.label[language as keyof typeof option.label]}
                >
                  {option.label[language as keyof typeof option.label]}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title[language as keyof typeof project.title]}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="flex gap-2">
                        {project.categories.map((category) => (
                          <Badge key={category} variant="secondary" className="bg-black/50 text-white">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title[language as keyof typeof project.title]}</CardTitle>
                    <CardDescription>
                      {project.description[language as keyof typeof project.description]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 5 && (
                        <span className="px-2 py-1 bg-muted rounded-md text-xs font-medium">
                          +{project.stack.length - 5}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      {project.repoLink && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={language === "EN" ? "View code repository" : "Ver repositorio de código"}
                          >
                            <Github className="mr-1 h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:inline-block">{t("projects.code")}</span>
                          </a>
                        </Button>
                      )}
                      {project.demoLink && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={language === "EN" ? "View live demo" : "Ver demostración en vivo"}
                          >
                            <Code className="mr-1 h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:inline-block">{t("projects.demo")}</span>
                          </a>
                        </Button>
                      )}
                    </div>
                    {project.websiteLink && (
                      <Button size="sm" asChild>
                        <a
                          href={project.websiteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={language === "EN" ? "Visit website" : "Visitar sitio web"}
                        >
                          <ExternalLink className="mr-1 h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:inline-block">
                            {language === "EN" ? "Visit Site" : "Visitar Sitio"}
                          </span>
                        </a>
                      </Button>
                    )}
                    {project.demoLink && !project.websiteLink && (
                      <Button size="sm" asChild>
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={language === "EN" ? "View live demo" : "Ver demostración en vivo"}
                        >
                          <ExternalLink className="mr-1 h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:inline-block">{t("projects.demo")}</span>
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
