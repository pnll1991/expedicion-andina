"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MenuIcon, XIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" prefetch={false}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-sky-blue/30 to-brand-deep-teal/30 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <Image
                src="/expedicion-andina-logo-header.webp"
                alt="Expedición Andina Logo Montaña y Brújula"
                width={48}
                height={48}
                priority
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <span className="font-heading font-bold text-xl text-brand-deep-teal group-hover:text-brand-sky-blue transition-colors duration-300">
            Expedición Andina
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-deep-teal">
            <Link
              href="/#excursions"
              className="relative px-4 py-2 text-brand-deep-teal hover:text-brand-sky-blue transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-sky-blue after:transition-all after:duration-300 hover:after:w-full"
              prefetch={false}
            >
              Excursiones
            </Link>
            <Link
              href="/#about"
              className="relative px-4 py-2 text-brand-deep-teal hover:text-brand-sky-blue transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-sky-blue after:transition-all after:duration-300 hover:after:w-full"
              prefetch={false}
            >
              Sobre Nosotros
            </Link>
            <Button
              asChild
              className="bg-brand-deep-teal text-white hover:bg-brand-sky-blue transition-colors duration-200 px-6 py-2 text-sm font-medium border-0 shadow-none hover:shadow-none"
            >
              <Link href="https://wa.me/5492625642793" target="_blank" rel="noopener noreferrer">
                Contactanos
              </Link>
            </Button>
          </nav>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden border border-brand-deep-teal/20 text-brand-deep-teal hover:bg-brand-deep-teal hover:text-white transition-all duration-200 shadow-none hover:shadow-none bg-transparent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl shadow-2xl md:hidden border-b border-white/20"
          >
            <nav className="flex flex-col items-center gap-6 py-8">
              <Link
                href="/#excursions"
                className="text-brand-deep-teal font-medium text-lg hover:text-brand-sky-blue transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Excursiones
              </Link>
              <Link
                href="/#about"
                className="text-brand-deep-teal font-medium text-lg hover:text-brand-sky-blue transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nosotros
              </Link>
              <Link
                href="https://wa.me/5492625642793"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-deep-teal text-white hover:bg-brand-sky-blue transition-colors duration-200 px-8 py-3 text-sm font-medium rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contactanos
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
