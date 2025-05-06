"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Code2, Layout, Server, Database, Cloud, TestTube, Brain, BarChart, Paintbrush } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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
  const [selectedTech, setSelectedTech] = useState<TechDescription | null>(null)

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
        EN: "I've used Python extensively for backend development, data processing, and AI/ML applications. It's my go-to language for building robust server-side applications and data pipelines.",
        ES: "He utilizado Python extensivamente para desarrollo backend, procesamiento de datos y aplicaciones de IA/ML. Es mi lenguaje preferido para construir aplicaciones robustas del lado del servidor y pipelines de datos.",
      },
      projects: {
        EN: [
          "Developed a recommendation engine using scikit-learn and pandas",
          "Built RESTful APIs with FastAPI for several client projects",
          "Created data processing pipelines for marketing analytics",
        ],
        ES: [
          "Desarrollé un motor de recomendaciones usando scikit-learn y pandas",
          "Construí APIs RESTful con FastAPI para varios proyectos de clientes",
          "Creé pipelines de procesamiento de datos para análisis de marketing",
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
        EN: "JavaScript is essential in my tech stack for creating interactive web applications. I use it daily for frontend development, animations, and client-side functionality.",
        ES: "JavaScript es esencial en mi stack tecnológico para crear aplicaciones web interactivas. Lo uso diariamente para desarrollo frontend, animaciones y funcionalidad del lado del cliente.",
      },
      projects: {
        EN: [
          "Built interactive dashboards with React and vanilla JS",
          "Implemented complex form validations and user interactions",
          "Created custom animations and transitions for web applications",
        ],
        ES: [
          "Construí dashboards interactivos con React y JS vanilla",
          "Implementé validaciones de formularios complejas e interacciones de usuario",
          "Creé animaciones y transiciones personalizadas para aplicaciones web",
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
        EN: "I've embraced TypeScript for its strong typing system which helps catch errors early in development. It's now my preferred language for all new JavaScript projects.",
        ES: "He adoptado TypeScript por su sistema de tipado fuerte que ayuda a detectar errores temprano en el desarrollo. Ahora es mi lenguaje preferido para todos los nuevos proyectos de JavaScript.",
      },
      projects: {
        EN: [
          "Migrated legacy JS codebases to TypeScript",
          "Built enterprise-level React applications with complex state management",
          "Developed type-safe APIs and backend services",
        ],
        ES: [
          "Migré bases de código JS heredadas a TypeScript",
          "Construí aplicaciones React de nivel empresarial con gestión de estado compleja",
          "Desarrollé APIs y servicios backend con seguridad de tipos",
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
        EN: "React is my framework of choice for building modern user interfaces. I leverage its component-based architecture to create reusable, maintainable UI elements.",
        ES: "React es mi framework preferido para construir interfaces de usuario modernas. Aprovecho su arquitectura basada en componentes para crear elementos de UI reutilizables y mantenibles.",
      },
      projects: {
        EN: [
          "Developed a complete SaaS platform with React and Next.js",
          "Built custom hooks and context providers for state management",
          "Created responsive dashboards with complex data visualizations",
        ],
        ES: [
          "Desarrollé una plataforma SaaS completa con React y Next.js",
          "Construí hooks personalizados y proveedores de contexto para gestión de estado",
          "Creé dashboards responsivos con visualizaciones de datos complejas",
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
        EN: "I use Node.js to build scalable backend services and APIs. Its event-driven architecture makes it perfect for handling concurrent connections efficiently.",
        ES: "Utilizo Node.js para construir servicios backend y APIs escalables. Su arquitectura basada en eventos lo hace perfecto para manejar conexiones concurrentes de manera eficiente.",
      },
      projects: {
        EN: [
          "Built RESTful and GraphQL APIs for various client projects",
          "Developed real-time applications with Socket.io",
          "Created microservices for e-commerce platforms",
        ],
        ES: [
          "Construí APIs RESTful y GraphQL para varios proyectos de clientes",
          "Desarrollé aplicaciones en tiempo real con Socket.io",
          "Creé microservicios para plataformas de comercio electrónico",
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
        EN: "I've deployed and managed applications on GCP, leveraging its powerful services for scalable, reliable cloud infrastructure.",
        ES: "He desplegado y gestionado aplicaciones en GCP, aprovechando sus potentes servicios para una infraestructura en la nube escalable y confiable.",
      },
      projects: {
        EN: [
          "Deployed containerized applications with Google Kubernetes Engine",
          "Set up CI/CD pipelines with Cloud Build",
          "Implemented serverless architectures with Cloud Functions",
        ],
        ES: [
          "Desplegué aplicaciones en contenedores con Google Kubernetes Engine",
          "Configuré pipelines de CI/CD con Cloud Build",
          "Implementé arquitecturas serverless con Cloud Functions",
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
        EN: "I've used Google's Vertex AI to build, deploy, and scale machine learning models. It's a powerful platform for end-to-end ML workflows.",
        ES: "He utilizado Vertex AI de Google para construir, desplegar y escalar modelos de machine learning. Es una plataforma potente para flujos de trabajo de ML de extremo a extremo.",
      },
      projects: {
        EN: [
          "Deployed custom ML models for natural language processing",
          "Built and trained models for image classification",
          "Implemented automated ML pipelines for continuous model improvement",
        ],
        ES: [
          "Desplegué modelos ML personalizados para procesamiento de lenguaje natural",
          "Construí y entrené modelos para clasificación de imágenes",
          "Implementé pipelines ML automatizados para mejora continua de modelos",
        ],
      },
      experience: {
        EN: "2+ years of professional experience",
        ES: "2+ años de experiencia profesional",
      },
    },
  }

  const technologies = [
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

  const handleTechClick = (tech: string) => {
    const description = techDescriptions[tech]
    if (description) {
      setSelectedTech(description)
    } else {
      // For technologies without detailed descriptions, create a generic one
      setSelectedTech({
        title: tech,
        description: {
          EN: `I have extensive experience with ${tech}, using it in various professional projects.`,
          ES: `Tengo amplia experiencia con ${tech}, utilizándolo en varios proyectos profesionales.`,
        },
        projects: {
          EN: ["Multiple client projects", "Personal development", "Team collaborations"],
          ES: ["Múltiples proyectos de clientes", "Desarrollo personal", "Colaboraciones en equipo"],
        },
        experience: {
          EN: "Professional experience",
          ES: "Experiencia profesional",
        },
      })
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
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.category}
                variants={itemVariants}
                className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border"
              >
                <div className="flex items-center mb-4">
                  {tech.icon}
                  <h3 className="text-xl font-semibold ml-3">{tech.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tech.skills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleTechClick(skill)}
                      className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Technology Description Dialog */}
      <Dialog open={!!selectedTech} onOpenChange={(open) => !open && setSelectedTech(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              <span className="text-primary mr-2">#</span> {selectedTech?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <p>{selectedTech?.description[language]}</p>

            <div>
              <h4 className="font-semibold text-primary mb-2">
                {language === "EN" ? "Projects & Applications" : "Proyectos y Aplicaciones"}
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                {selectedTech?.projects[language].map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </div>

            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="font-medium">
                <span className="text-primary">✓</span> {selectedTech?.experience[language]}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
