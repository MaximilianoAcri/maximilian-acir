"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  TestTube,
  Brain,
  BarChart,
  Paintbrush,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface TechCategory {
  category: string
  icon: JSX.Element
  skills: string[]
}

interface TechDescription {
  title: string
  description: {
    EN: string
    ES: string
  }
  projects: {
    EN: string[]
    ES: string[]
  }
  experience: {
    EN: string
    ES: string
  }
}

export default function Technologies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { t, language } = useLanguage()
  const [expandedTech, setExpandedTech] = useState<string | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const techDescriptions: Record<string, TechDescription> = {
    Python: {
      title: "Python",
      description: {
        EN: "Over the past four years, I've leveraged Python to build robust backend services, streamline data workflows, and power AI/ML solutions. I've designed RESTful APIs with FastAPI, crafted microservices with Flask, and integrated advanced AI services—from fine-tuning OpenAI models to orchestrating pipelines in Vertex AI. My hands-on approach ensures clean, maintainable code and scalable performance.",
        ES: "En los últimos cuatro años, he aprovechado Python para crear servicios backend sólidos, optimizar flujos de datos y potenciar soluciones de IA/ML. He diseñado APIs RESTful con FastAPI, construido microservicios con Flask e integrado servicios de IA avanzados, desde la personalización de modelos de OpenAI hasta la orquestación de pipelines en Vertex AI. Mi enfoque práctico garantiza código limpio, mantenible y un rendimiento escalable.",
      },
      projects: {
        EN: [
          "Built a recommendation engine for an e-commerce platform using scikit-learn",
          "Developed a content moderation system using OpenAI's GPT models",
          "Created ETL pipelines for marketing analytics dashboards",
        ],
        ES: [
          "Construí un motor de recomendaciones para una plataforma de comercio electrónico usando scikit-learn",
          "Desarrollé un sistema de moderación de contenido utilizando modelos GPT de OpenAI",
          "Creé pipelines ETL para dashboards de análisis de marketing",
        ],
      },
      experience: {
        EN: "4+ years of professional experience",
        ES: "4+ años de experiencia profesional",
      },
    },
    JavaScript: {
      title: "JavaScript",
      description: {
        EN: "JavaScript is the backbone of my frontend work. I enjoy crafting interactive user experiences, handling complex client-side logic, and seamlessly consuming APIs. Whether it's leveraging modern ES6+ patterns, optimizing performance, or implementing modular architectures, I write code that feels intuitive and delivers smooth interactions.",
        ES: "JavaScript es la columna vertebral de mi trabajo frontend. Disfruto creando experiencias de usuario interactivas, manejando lógica compleja en el cliente y consumiendo APIs de manera fluida. Ya sea aplicando patrones modernos de ES6+, optimizando rendimiento o implementando arquitecturas modulares, escribo código que resulta intuitivo y brinda interacciones fluidas.",
      },
      projects: {
        EN: [
          "Developed interactive dashboards for real-time data visualization",
          "Built custom form validation systems for enterprise applications",
          "Implemented complex state management solutions for SPA applications",
        ],
        ES: [
          "Desarrollé dashboards interactivos para visualización de datos en tiempo real",
          "Construí sistemas de validación de formularios personalizados para aplicaciones empresariales",
          "Implementé soluciones complejas de gestión de estado para aplicaciones SPA",
        ],
      },
      experience: {
        EN: "5+ years of professional experience",
        ES: "5+ años de experiencia profesional",
      },
    },
    TypeScript: {
      title: "TypeScript",
      description: {
        EN: "Embracing TypeScript has transformed how I build applications. By enforcing strong typing and clear interfaces, I catch issues early and maintain scalable codebases. From migrating large React projects to crafting shared libraries with precise type definitions, I leverage TypeScript to boost developer confidence and productivity.",
        ES: "Adoptar TypeScript ha transformado mi forma de desarrollar aplicaciones. Al utilizar tipado fuerte e interfaces claras, detecto errores desde temprano y mantengo bases de código escalables. Desde migrar grandes proyectos React hasta crear bibliotecas compartidas con definiciones de tipo precisas, aprovecho TypeScript para aumentar la confianza y la productividad del equipo.",
      },
      projects: {
        EN: [
          "Migrated a large-scale React application from JavaScript to TypeScript",
          "Developed a type-safe API client library for a healthcare platform",
          "Created reusable component libraries with comprehensive type definitions",
        ],
        ES: [
          "Migré una aplicación React de gran escala de JavaScript a TypeScript",
          "Desarrollé una biblioteca cliente de API con seguridad de tipos para una plataforma de salud",
          "Creé bibliotecas de componentes reutilizables con definiciones de tipos completas",
        ],
      },
      experience: {
        EN: "3+ years of professional experience",
        ES: "3+ años de experiencia profesional",
      },
    },
    React: {
      title: "React",
      description: {
        EN: "React is my go-to for building dynamic UIs. I've developed everything from compact components to full-scale enterprise dashboards, using hooks, context API, and advanced state managers. My focus is on writing clean, reusable code that scales gracefully and keeps performance rock-solid.",
        ES: "React es mi opción predeterminada para construir interfaces dinámicas. He desarrollado desde componentes compactos hasta paneles empresariales de gran escala, empleando hooks, context API y gestores de estado avanzados. Me enfoco en escribir código limpio y reutilizable que escale de manera eficiente y mantenga un rendimiento óptimo.",
      },
      projects: {
        EN: [
          "Developed a complete SaaS platform with complex user workflows",
          "Built custom hook libraries for common functionality across projects",
          "Created performance-optimized data visualization components",
        ],
        ES: [
          "Desarrollé una plataforma SaaS completa con flujos de trabajo de usuario complejos",
          "Construí bibliotecas de hooks personalizados para funcionalidades comunes en varios proyectos",
          "Creé componentes de visualización de datos optimizados para rendimiento",
        ],
      },
      experience: {
        EN: "4+ years of professional experience",
        ES: "4+ años de experiencia profesional",
      },
    },
    "Node.js": {
      title: "Node.js",
      description: {
        EN: "With Node.js, I build dependable backend systems and scalable APIs. I've architected microservices using Express and NestJS, implemented real-time features with Socket.io, and deployed serverless functions across cloud platforms. My priority is delivering reliable, high-performance services that adapt to evolving requirements.",
        ES: "Con Node.js, construyo sistemas backend confiables y APIs escalables. He diseñado microservicios con Express y NestJS, implementado funcionalidades en tiempo real con Socket.io y desplegado funciones serverless en diversas nubes. Mi prioridad es entregar servicios fiables y de alto rendimiento que se adapten a requisitos cambiantes.",
      },
      projects: {
        EN: [
          "Built a scalable e-commerce API with Express and MongoDB",
          "Developed a real-time notification system using Socket.io",
          "Created serverless functions for various cloud platforms",
        ],
        ES: [
          "Construí una API de comercio electrónico escalable con Express y MongoDB",
          "Desarrollé un sistema de notificaciones en tiempo real usando Socket.io",
          "Creé funciones serverless para varias plataformas en la nube",
        ],
      },
      experience: {
        EN: "4+ years of professional experience",
        ES: "4+ años de experiencia profesional",
      },
    },
    "Google Cloud Platform": {
      title: "Google Cloud Platform",
      description: {
        EN: "On Google Cloud Platform, I design and operate cloud-native architectures that balance scalability and cost-efficiency. From setting up multi-region clusters on GKE to automating CI/CD with Cloud Build and Cloud Run, and optimizing databases with Cloud SQL and Firestore, I ensure robust deployments tailored to business needs.",
        ES: "En Google Cloud Platform, diseño y gestiono arquitecturas cloud-native que equilibran escalabilidad y eficiencia de costos. Desde configurar clústeres multi-región en GKE hasta automatizar CI/CD con Cloud Build y Cloud Run y optimizar bases de datos con Cloud SQL y Firestore, garantizo despliegues sólidos adaptados a las necesidades del negocio.",
      },
      projects: {
        EN: [
          "Architected a multi-region application deployment using GKE",
          "Implemented CI/CD pipelines with Cloud Build and Cloud Run",
          "Designed cost-effective database solutions using Cloud SQL and Firestore",
        ],
        ES: [
          "Diseñé una implementación de aplicación multi-región usando GKE",
          "Implementé pipelines de CI/CD con Cloud Build y Cloud Run",
          "Diseñé soluciones de bases de datos rentables usando Cloud SQL y Firestore",
        ],
      },
      experience: {
        EN: "3+ years of professional experience",
        ES: "3+ años de experiencia profesional",
      },
    },
    "Vertex AI": {
      title: "Vertex AI",
      description: {
        EN: "I specialize in bringing AI to production with Vertex AI. Whether it's training custom models, deploying scalable endpoints, or orchestrating MLOps pipelines, I've delivered solutions for content recommendation, document processing, and conversational agents. My hands-on experience ensures reliable, maintainable AI workflows.",
        ES: "Me especializo en llevar la IA a producción con Vertex AI. Ya sea entrenando modelos personalizados, desplegando endpoints escalables u orquestando pipelines de MLOps, he entregado soluciones para recomendación de contenido, procesamiento de documentos y agentes conversacionales. Mi experiencia práctica garantiza flujos de trabajo de IA fiables y mantenibles.",
      },
      projects: {
        EN: [
          "Developed a content recommendation system using Vertex AI and BigQuery",
          "Implemented a document processing pipeline with Vertex AI Vision",
          "Created a chatbot solution using Vertex AI's generative models",
        ],
        ES: [
          "Desarrollé un sistema de recomendación de contenido usando Vertex AI y BigQuery",
          "Implementé un pipeline de procesamiento de documentos con Vertex AI Vision",
          "Creé una solución de chatbot usando modelos generativos de Vertex AI",
        ],
      },
      experience: {
        EN: "2+ years of professional experience",
        ES: "2+ años de experiencia profesional",
      },
    },
  };
  
  const technologies: TechCategory[] = [
    {
      category: t("tech.languages"),
      icon: <Code2 className="h-6 w-6 text-primary" />,
      skills: ["Python", "JavaScript", "TypeScript", "SQL"],
    },
    {
      category: t("tech.frontend"),
      icon: <Layout className="h-6 w-6 text-primary" />,
      skills: ["React", "Redux", "Tailwind CSS", "HTML5", "CSS3"],
    },
    {
      category: t("tech.backend"),
      icon: <Server className="h-6 w-6 text-primary" />,
      skills: ["FastAPI", "Flask", "Node.js (Express)"],
    },
    {
      category: t("tech.databases"),
      icon: <Database className="h-6 w-6 text-primary" />,
      skills: ["PostgreSQL", "MongoDB", "Firebase Firestore", "Realtime DB"],
    },
    {
      category: t("tech.cloud"),
      icon: <Cloud className="h-6 w-6 text-primary" />,
      skills: ["Google Cloud Platform", "Docker", "GitHub Actions", "CI/CD"],
    },
    {
      category: t("tech.testing"),
      icon: <TestTube className="h-6 w-6 text-primary" />,
      skills: ["PyTest", "Jest", "Cypress"],
    },
    {
      category: t("tech.ai"),
      icon: <Brain className="h-6 w-6 text-primary" />,
      skills: ["OpenAI", "Vertex AI", "Aporia", "Portkey"],
    },
    {
      category: t("tech.marketing"),
      icon: <BarChart className="h-6 w-6 text-primary" />,
      skills: ["Google Ads", "Meta Ads", "Google Analytics", "SEO/SEM", "Mailchimp", "HubSpot"],
    },
    {
      category: t("tech.design"),
      icon: <Paintbrush className="h-6 w-6 text-primary" />,
      skills: ["Adobe Illustrator", "Canva", "Sony Vegas"],
    },
  ]

  const handleTechClick = (tech: string, categoryIndex: number) => {
    if (expandedTech === tech) {
      setExpandedTech(null)
    } else {
      setExpandedTech(tech)
      setExpandedCategory(categoryIndex)
    }
  }

  const getTechDescription = (tech: string): TechDescription => {
    const description = techDescriptions[tech]
    if (description) {
      return description
    }

    // For technologies without detailed descriptions, create a generic one
    return {
      title: tech,
      description: {
        EN: `I have extensive experience with ${tech}, using it in various professional projects to deliver high-quality solutions.`,
        ES: `Tengo amplia experiencia con ${tech}, utilizándolo en varios proyectos profesionales para entregar soluciones de alta calidad.`,
      },
      projects: {
        EN: ["Enterprise client projects", "SaaS platform development", "Technical architecture design"],
        ES: ["Proyectos de clientes empresariales", "Desarrollo de plataformas SaaS", "Diseño de arquitectura técnica"],
      },
      experience: {
        EN: "Professional experience",
        ES: "Experiencia profesional",
      },
    }
  }

  return (
    <section id="technologies" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("tech.title")}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("tech.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, categoryIndex) => (
              <motion.div
                key={tech.category}
                variants={itemVariants}
                className="bg-card rounded-lg shadow-sm border border-border overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {tech.icon}
                    <h3 className="text-xl font-semibold ml-3">{tech.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tech.skills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => handleTechClick(skill, categoryIndex)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          expandedTech === skill
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-primary/20 hover:text-primary"
                        }`}
                      >
                        {skill}
                        {expandedTech === skill ? (
                          <ChevronUp className="inline-block ml-1 h-3 w-3" />
                        ) : (
                          <ChevronDown className="inline-block ml-1 h-3 w-3" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Expanded Tech Description */}
                <AnimatePresence>
                  {expandedTech && expandedCategory === categoryIndex && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border bg-muted/30"
                    >
                      <div className="p-6 space-y-4">
                        <div className="flex items-center">
                          <h4 className="text-lg font-semibold text-primary">
                            {getTechDescription(expandedTech).title}
                          </h4>
                        </div>

                        <p className="text-muted-foreground">
                          {
                            getTechDescription(expandedTech).description[
                              language as keyof TechDescription["description"]
                            ]
                          }
                        </p>

                        <div>
                          <h5 className="font-medium mb-2">
                            {language === "EN" ? "Projects & Applications" : "Proyectos y Aplicaciones"}
                          </h5>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            {getTechDescription(expandedTech).projects[
                              language as keyof TechDescription["projects"]
                            ].map((project, index) => (
                              <li key={index}>{project}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-primary/10 p-3 rounded-lg">
                          <p className="font-medium">
                            <span className="text-primary">✓</span>{" "}
                            {
                              getTechDescription(expandedTech).experience[
                                language as keyof TechDescription["experience"]
                              ]
                            }
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
