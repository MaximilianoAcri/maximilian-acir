"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { t } = useLanguage()

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

  return (
    <section id="about" className="py-20 bg-muted/30 dark:bg-muted/10" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("about.title")}</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-2xl">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Maximiliano Ezequiel Acri"
                  width={500}
                  height={500}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full -z-10"></div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4">{t("about.subtitle")}</h3>
              <p className="text-muted-foreground mb-6">{t("about.p1")}</p>
              <p className="text-muted-foreground mb-6">{t("about.p2")}</p>
              <p className="text-muted-foreground mb-6">{t("about.p3")}</p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div>
                  <h4 className="font-semibold mb-2">{t("about.location")}</h4>
                  <p className="text-muted-foreground">Buenos Aires, Argentina</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t("about.experience")}</h4>
                  <p className="text-muted-foreground">{t("about.years")}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t("about.email")}</h4>
                  <p className="text-muted-foreground">maximilianoacri1@gmail.com</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t("about.languages")}</h4>
                  <p className="text-muted-foreground">{t("about.langs")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
