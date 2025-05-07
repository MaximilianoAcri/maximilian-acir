"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Award, BookOpen, Calendar, Lightbulb } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { t, language } = useLanguage()

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

  const certifications = [
    {
      provider: "CoderHouse",
      certifications: ["Full-Stack Development", "Growth Marketing", "Social Ads"],
      year: "2021",
    },
    {
      provider: "Google",
      certifications: ["Digital Marketing", "Ads (Search & Display)", "Analytics"],
      year: "2022",
    },
    {
      provider: "Meta",
      certifications: ["Facebook B2B", "Business Manager"],
      year: "2022",
    },
  ]

  const education = [
    {
      institution: {
        EN: "Universidad Nacional de La Matanza (UNLaM)",
        ES: "Universidad Nacional de La Matanza (UNLaM)",
      },
      degree: {
        EN: "Technical Degree in Labor Relations",
        ES: "Técnico en Relaciones Laborales",
      },
      year: "2018-2020",
    },
  ]

  const continuousEducation = {
    title: {
      EN: "Continuous Learning",
      ES: "Aprendizaje Continuo",
    },
    description: {
      EN: "Over 5 years of intensive training in web development, programming languages, and generative AI technologies (LLMs), always staying updated with the latest tools in the market.",
      ES: "Más de 5 años de formación intensiva en desarrollo web, lenguajes de programación y tecnologías de inteligencia artificial generativa (LLMs), manteniéndome siempre actualizado con las últimas herramientas del mercado.",
    },
    areas: [
      {
        EN: "AI/ML Workshops",
        ES: "Talleres de IA/ML",
      },
      {
        EN: "Cloud Architecture",
        ES: "Arquitectura Cloud",
      },
      {
        EN: "Tech Conferences",
        ES: "Conferencias Tech",
      },
      {
        EN: "Online Courses",
        ES: "Cursos Online",
      },
    ],
  }

  return (
    <section id="certifications" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("cert.title")}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("cert.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-6">
                <Award className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-2xl font-bold">{t("cert.professional")}</h3>
              </div>

              <div className="space-y-6">
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.provider}
                    variants={itemVariants}
                    className="bg-card rounded-lg p-6 border border-border"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-semibold">{cert.provider}</h4>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{cert.year}</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {cert.certifications.map((certification) => (
                        <li key={certification} className="flex items-center text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                          {certification}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-6">
                <BookOpen className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-2xl font-bold">{t("cert.education")}</h3>
              </div>

              <div className="space-y-6">
                {education.map((edu) => (
                  <motion.div
                    key={typeof edu.institution === "string" ? edu.institution : edu.institution.EN}
                    variants={itemVariants}
                    className="bg-card rounded-lg p-6 border border-border"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-semibold">
                        {typeof edu.institution === "string"
                          ? edu.institution
                          : edu.institution[language as keyof typeof edu.institution]}
                      </h4>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{edu.year}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {typeof edu.degree === "string" ? edu.degree : edu.degree[language as keyof typeof edu.degree]}
                    </p>
                  </motion.div>
                ))}

                <motion.div variants={itemVariants} className="bg-primary/10 rounded-lg p-6 border border-primary/20">
                  <div className="flex items-center mb-4">
                    <Lightbulb className="h-5 w-5 text-primary mr-2" />
                    <h4 className="text-xl font-semibold">
                      {continuousEducation.title[language as keyof typeof continuousEducation.title]}
                    </h4>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {continuousEducation.description[language as keyof typeof continuousEducation.description]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {continuousEducation.areas.map((area, index) => (
                      <span key={index} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                        {typeof area === "string" ? area : area[language as keyof typeof area]}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
