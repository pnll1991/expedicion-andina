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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" prefetch={false}>
          <Image
            src="/expedicion-andina-logo-header.jpg"
            alt="Expedición Andina Logo Montaña y Brújula"
            width={40}
            height={40}
            priority
          />
          <span className="font-heading font-bold text-xl text-brand-deep-teal">Expedición Andina</span>
        </Link>
        <div className="flex items-center gap-4">
          {" "}
          {/* This div now groups nav and mobile button */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-deep-teal">
            <Link href="/#excursions" className="hover:text-brand-sky-blue transition-colors" prefetch={false}>
              Excursiones
            </Link>
            <Link href="/#about" className="hover:text-brand-sky-blue transition-colors" prefetch={false}>
              Sobre Nosotros
            </Link>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
            >
              <Link href="https://wa.me/5492625642793" target="_blank" rel="noopener noreferrer">
                Contactanos
              </Link>
            </Button>
          </nav>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-gray-300 text-brand-deep-teal hover:bg-gray-100 bg-transparent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-40 bg-white shadow-lg md:hidden"
          >
            <nav className="flex flex-col items-center gap-6 py-8">
              <Link
                href="/#excursions"
                className="text-brand-deep-teal font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Excursiones
              </Link>
              <Link
                href="/#about"
                className="text-brand-deep-teal font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nosotros
              </Link>
              <Link
                href="https://wa.me/5492625642793"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-deep-teal font-medium text-lg"
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
