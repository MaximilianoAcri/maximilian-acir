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
        EN: "I've used Python extensively for backend development, data processing, and AI/ML applications. My expertise includes FastAPI, Flask, and integrating with various AI services like OpenAI and Vertex AI.",
        ES: "He utilizado Python extensivamente para desarrollo backend, procesamiento de datos y aplicaciones de IA/ML. Mi experiencia incluye FastAPI, Flask e integración con varios servicios de IA como OpenAI y Vertex AI.",
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
        EN: "JavaScript is fundamental to my frontend development workflow. I use it to create interactive UIs, handle API requests, and implement complex client-side logic. I'm proficient in modern ES6+ features and patterns.",
        ES: "JavaScript es fundamental en mi flujo de trabajo de desarrollo frontend. Lo uso para crear interfaces de usuario interactivas, manejar solicitudes API e implementar lógica compleja del lado del cliente. Soy competente en características y patrones modernos de ES6+.",
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
        EN: "TypeScript has become my preferred language for all new JavaScript projects. I leverage its type system to create more robust, maintainable code and catch errors during development rather than runtime.",
        ES: "TypeScript se ha convertido en mi lenguaje preferido para todos los nuevos proyectos de JavaScript. Aprovecho su sistema de tipos para crear código más robusto y mantenible, y detectar errores durante el desarrollo en lugar de en tiempo de ejecución.",
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
        EN: "React is my primary frontend framework. I've built everything from small widgets to enterprise-scale applications using React. I'm experienced with hooks, context, and modern state management solutions.",
        ES: "React es mi framework frontend principal. He construido desde pequeños widgets hasta aplicaciones a escala empresarial usando React. Tengo experiencia con hooks, context y soluciones modernas de gestión de estado.",
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
        EN: "I use Node.js extensively for backend development, building RESTful APIs, microservices, and serverless functions. I'm experienced with Express, NestJS, and various database integrations.",
        ES: "Utilizo Node.js extensivamente para desarrollo backend, construyendo APIs RESTful, microservicios y funciones serverless. Tengo experiencia con Express, NestJS y varias integraciones de bases de datos.",
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
        EN: "I have extensive experience with GCP services, including Compute Engine, Cloud Functions, Cloud Run, and various database offerings. I design and implement cloud-native architectures for scalable applications.",
        ES: "Tengo amplia experiencia con servicios de GCP, incluyendo Compute Engine, Cloud Functions, Cloud Run y varias ofertas de bases de datos. Diseño e implemento arquitecturas cloud-native para aplicaciones escalables.",
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
        EN: "I specialize in integrating AI capabilities into applications using Google's Vertex AI platform. I've worked with custom model training, deployment, and inference for various use cases.",
        ES: "Me especializo en integrar capacidades de IA en aplicaciones usando la plataforma Vertex AI de Google. He trabajado con entrenamiento, despliegue e inferencia de modelos personalizados para varios casos de uso.",
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
  }

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
