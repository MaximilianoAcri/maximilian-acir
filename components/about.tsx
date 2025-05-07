"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function About() {
  const containerRef = useRef(null)
  const { t } = useLanguage()

  // Usar diferentes variantes de animación para diferentes elementos
  const titleAnimation = useScrollAnimation({ variant: "fadeIn", threshold: 0.1 })
  const imageAnimation = useScrollAnimation({ variant: "slideLeft", threshold: 0.3, duration: 0.7 })
  const contentAnimation = useScrollAnimation({ variant: "slideRight", threshold: 0.3, duration: 0.7 })
  const infoAnimation = useScrollAnimation({ variant: "slideUp", threshold: 0.2, delay: 0.3 })

  return (
    <section id="about" className="py-20 bg-muted/30 dark:bg-muted/10" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={titleAnimation.ref}
            initial="hidden"
            animate={titleAnimation.isInView ? "visible" : "hidden"}
            variants={titleAnimation.variants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("about.title")}</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              ref={imageAnimation.ref}
              initial="hidden"
              animate={imageAnimation.isInView ? "visible" : "hidden"}
              variants={imageAnimation.variants}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-2xl">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Maximiliano Ezequiel Acri"
                  width={500}
                  height={500}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full -z-10"
                animate={imageAnimation.isInView ? { scale: [0, 1], opacity: [0, 1] } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              ></motion.div>
              <motion.div
                className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full -z-10"
                animate={imageAnimation.isInView ? { scale: [0, 1], opacity: [0, 1] } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              ></motion.div>
            </motion.div>

            <motion.div
              ref={contentAnimation.ref}
              initial="hidden"
              animate={contentAnimation.isInView ? "visible" : "hidden"}
              variants={contentAnimation.variants}
            >
              <h3 className="text-2xl font-bold mb-4">{t("about.subtitle")}</h3>
              <p className="text-muted-foreground mb-6">{t("about.p1")}</p>
              <p className="text-muted-foreground mb-6">{t("about.p2")}</p>
              <p className="text-muted-foreground mb-6">{t("about.p3")}</p>

              <motion.div
                ref={infoAnimation.ref}
                initial="hidden"
                animate={infoAnimation.isInView ? "visible" : "hidden"}
                variants={infoAnimation.variants}
                className="grid grid-cols-2 gap-4 mt-8"
              >
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
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
