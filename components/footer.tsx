"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, MessageSquare } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="bg-muted/50 dark:bg-muted/20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="#hero" className="text-xl font-bold tracking-tight hover:text-primary">
              Max<span className="text-primary">Acri</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">{t("hero.title")}</p>
          </div>

          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="https://linkedin.com/in/maximilianoeacri"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/MaximilianoAcri"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="mailto:maximilianoacri1@gmail.com"
              className="hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://wa.link/gc7p05"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="WhatsApp"
            >
              <MessageSquare className="h-5 w-5" />
            </a>
          </div>

          <div className="text-sm text-muted-foreground">
            © {currentYear} Maximiliano Acri. {t("footer.rights")}
          </div>
        </div>
      </div>
    </footer>
  )
}
