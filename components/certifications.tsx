"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Award, BookOpen, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { t } = useLanguage()

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
      institution: "Universidad Nacional de La Matanza (UNLaM)",
      degree: "15 subjects in Labor Relations",
      year: "2018-2020",
    },
  ]

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
                    key={edu.institution}
                    variants={itemVariants}
                    className="bg-card rounded-lg p-6 border border-border"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-semibold">{edu.institution}</h4>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{edu.year}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{edu.degree}</p>
                  </motion.div>
                ))}

                <motion.div variants={itemVariants} className="bg-primary/10 rounded-lg p-6 border border-primary/20">
                  <h4 className="text-xl font-semibold mb-4">{t("cert.continuous")}</h4>
                  <p className="text-muted-foreground mb-4">{t("cert.continuous.desc")}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                      {t("cert.workshops")}
                    </span>
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">{t("cert.cloud")}</span>
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                      {t("cert.conferences")}
                    </span>
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
