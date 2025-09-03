import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Lato } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { InfiniteScrollBanner } from "@/components/ui/infinite-scroll-banner"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700"],
  display: "swap",
})

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Trekking en San Rafael | Expedición Andina - Aventuras en Mendoza",
  description:
    "Descubre las mejores experiencias de trekking y aventura en San Rafael, Mendoza con Expedición Andina. Guías expertos, paisajes impresionantes y excursiones inolvidables en el corazón de los Andes. ¡Tu próxima aventura te espera!",
  keywords: [
    "Trekking San Rafael",
    "Excursiones San Rafael",
    "Aventura Mendoza",
    "Montañismo San Rafael",
    "Senderismo Mendoza",
    "Expediciones Andes",
    "Turismo Aventura San Rafael",
    "Guías de montaña Mendoza",
    "Viajes de aventura Argentina",
  ],
  icons: {
    icon: "/expedicion-andina-logo-circle.png", // Favicon
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} ${lato.variable} font-sans`}>
        <InfiniteScrollBanner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
