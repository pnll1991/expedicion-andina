"use client"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImageWithLoader } from "@/components/ui/image-with-loader"
import { MapPinIcon, CalendarIcon, UsersIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { allExcursions } from "@/data/excursions"
import { GoogleReviewsCarousel } from "@/components/google-reviews-carousel"

export default function HomePage() {
  /*—  Bloquear scroll cuando el menú mobile está abierto —*/

  /*— Hero —*/
  const subtitle = "Tu puerta de entrada a la aventura: montañismo, trekking, y cursos especializados."

  /*— Utilidades varias —*/
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  /*— Parallax para la imagen de "Sobre Nosotros" —*/
  const aboutImgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: aboutImgRef,
    offset: ["start end", "end start"],
  })
  const rotate = useTransform(scrollYProgress, [0, 1], ["-5deg", "5deg"])
  
  /*— Parallax para el Hero —*/
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  })
  const heroScale = useTransform(heroScrollYProgress, [0, 1], [1, 1.1])
  const heroOpacity = useTransform(heroScrollYProgress, [0, 0.5], [1, 0])

  /*— Variants de animaciones reutilizables —*/
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  /*— Refs/observadores para disparar animaciones en vista —*/
  const exTitleRef = useRef(null)
  const abTitleRef = useRef(null)
  const exGridRef = useRef(null)
  const abListRef = useRef(null)

  const isExTitleIn = useInView(exTitleRef, { once: true, amount: 0.5 })
  const isAbTitleIn = useInView(abTitleRef, { once: true, amount: 0.5 })
  const isExGridIn = useInView(exGridRef, { once: true, amount: 0.05 })
  const isAbListIn = useInView(abListRef, { once: true, amount: 0.3 })

  /*— Excursiones destacadas (omitimos algunas) —*/
  const featuredExcursions = allExcursions
    .filter((x) => !["kayak-lago-montana", "caminata-bosque-alpino", "escalada-atardecer"].includes(x.slug))
    .sort((a, b) => {
      // Ordenar por pinned primero
      const aPinned = (a as any).pinned ? 0 : 1
      const bPinned = (b as any).pinned ? 0 : 1
      return aPinned - bPinned
    })

  return (
    <div className="flex min-h-dvh flex-col bg-brand-light-sand">
      <main className="flex-1">
        {/* ---------------- HERO ---------------- */}
        <section ref={heroSectionRef as any} className="relative flex h-[85vh] w-full items-center justify-center text-center text-white overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              scale: heroScale,
              opacity: heroOpacity,
            }}
          >
            <ImageWithLoader
              src="/hero-montanas-nubladas-patagonia.webp"
              alt="Impresionantes montañas de la Patagonia"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ transform: "scale(1.1)" }}
              quality={85}
            />
          </motion.div>
          
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          
          {/* Floating particles (stars/lights) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/30"
                style={{
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          {/* Fog/Mist effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                style={{
                  left: `${i * 33}%`,
                }}
                animate={{
                  x: ["-100%", "300%"],
                }}
                transition={{
                  duration: 15 + i * 5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 3,
                  ease: "linear",
                }}
              />
            ))}
          </div>
          
          {/* Mountain silhouette effect */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          
          {/* Spotlight effect (simulating trekking light) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 30% 40%, transparent 20%, rgba(0,0,0,0.3) 50%)",
            }}
            animate={{
              background: [
                "radial-gradient(circle at 30% 40%, transparent 20%, rgba(0,0,0,0.3) 50%)",
                "radial-gradient(circle at 70% 60%, transparent 20%, rgba(0,0,0,0.3) 50%)",
                "radial-gradient(circle at 30% 40%, transparent 20%, rgba(0,0,0,0.3) 50%)",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          
          {/* Glowing trail effect */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <motion.div
              className="absolute top-1/2 left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-orange-400/50 to-transparent blur-sm"
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/3 right-1/3 w-1 h-24 bg-gradient-to-b from-transparent via-yellow-400/40 to-transparent blur-sm"
              animate={{
                y: [-15, 15, -15],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1,
                ease: "easeInOut",
              }}
            />
          </div>
          <div className="relative z-10 container px-4 md:px-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-shadow-lg font-heading text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
              style={{ textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}
            >
              Trekking en San Rafael: Descubrí Tu Próxima Aventura Andina
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mx-auto mt-4 max-w-2xl text-lg text-gray-100 md:text-xl"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="mt-8"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 px-8 py-4 text-lg font-bold border-0 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                <Link href="#excursions">Explorar Excursiones</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <ChevronDownIcon className="h-8 w-8 text-white" />
            </motion.div>
          </motion.div>
        </section>

        {/* ---------------- EXCURSIONES ---------------- */}
        <section id="excursions" className="bg-white py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 space-y-3 text-center">
              <motion.h2
                ref={exTitleRef}
                initial="hidden"
                animate={isExTitleIn ? "visible" : "hidden"}
                variants={itemVariants}
                className="font-bold text-brand-deep-teal text-3xl md:text-4xl"
              >
                Excursiones Destacadas
              </motion.h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Aventuras seleccionadas que muestran lo mejor que nuestra región tiene para ofrecer.
              </p>
            </div>

            <motion.div
              ref={exGridRef}
              initial="hidden"
              animate={isExGridIn ? "visible" : "hidden"}
              variants={containerVariants}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {featuredExcursions.map((excursion) => (
                <motion.div key={excursion.slug} variants={itemVariants} className="flex h-full">
                  <Card className="group flex h-full flex-col overflow-hidden border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative h-56 overflow-hidden flex-shrink-0">
                      <ImageWithLoader
                        src={excursion.img || "/placeholder.svg"}
                        alt={excursion.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {(excursion as any).showBadges !== false && (
                        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                          <span className="rotate-3 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-md">
                            NUEVA
                          </span>
                          <span className="-rotate-3 rounded-full bg-yellow-400 px-2 py-1 text-xs font-bold text-brand-deep-teal shadow-md">
                            CUPOS LIMITADOS
                          </span>
                        </div>
                      )}
                    </div>

                    <CardContent className="flex flex-1 flex-col space-y-4 p-6">
                      <h3 className="font-heading text-xl font-bold text-brand-deep-teal">{excursion.title}</h3>
                      <p className="text-gray-600 flex-grow">{excursion.desc}</p>
                      <div className="flex items-center justify-between pt-2 text-sm text-gray-500 flex-shrink-0">
                        <span>{excursion.duration}</span>
                        {excursion.price && (
                          <span className="text-lg font-bold text-brand-deep-teal">{excursion.price}</span>
                        )}
                      </div>

                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-300 py-3 text-sm font-semibold border-0 shadow-md hover:shadow-lg hover:scale-105 transform flex-shrink-0"
                      >
                        <Link href={`/excursions/${excursion.slug}`}>Ver más info</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ---------------- SOBRE NOSOTROS ---------------- */}
        <section id="about" className="relative py-16 pb-56 md:py-24">
          {/* ↑ pb-56 crea ~14 rem de espacio antes de la flecha */}
          <div className="container grid items-center gap-12 px-4 md:grid-cols-2 md:px-6">
            <div className="space-y-6">
              <motion.h2
                ref={abTitleRef}
                initial="hidden"
                animate={isAbTitleIn ? "visible" : "hidden"}
                variants={itemVariants}
                className="text-3xl font-bold text-brand-deep-teal md:text-4xl"
              >
                ¿Por qué elegir Expedición Andina?
              </motion.h2>

              <p className="text-lg text-gray-600">Porque combinamos aventura real con una logística cuidada…</p>

              <motion.ul
                ref={abListRef}
                initial="hidden"
                animate={isAbListIn ? "visible" : "hidden"}
                variants={containerVariants}
                className="space-y-6"
              >
                {[
                  {
                    icon: <MapPinIcon className="h-6 w-6" />,
                    title: "Guías Locales Expertos",
                    desc: "Nuestros guías habilitados conocen el terreno, la historia y los secretos de la región.",
                    badge: "Habilitados",
                  },
                  {
                    icon: <CalendarIcon className="h-6 w-6" />,
                    title: "Itinerarios a Medida",
                    desc: "Personalizamos los viajes para que se ajusten a tu nivel de habilidad e intereses.",
                  },
                  {
                    icon: <UsersIcon className="h-6 w-6" />,
                    title: "Grupos Conectados",
                    desc: "Disfruta de la montaña con personas que comparten tu pasión.",
                  },
                ].map((item) => (
                  <motion.li key={item.title} variants={itemVariants} className="flex items-start gap-4">
                    <div className="mt-1 rounded-full bg-brand-sky-blue/10 p-3 text-brand-deep-teal">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-heading text-lg font-semibold text-brand-deep-teal">{item.title}</h4>
                        {item.badge && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">
                        {item.desc.includes("habilitados") ? (
                          <>
                            {item.desc.split("habilitados")[0]}
                            <span className="font-semibold text-brand-deep-teal">habilitados</span>
                            {item.desc.split("habilitados")[1]}
                          </>
                        ) : (
                          item.desc
                        )}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              ref={aboutImgRef}
              style={{ rotate }}
              className="relative aspect-square overflow-hidden rounded-xl shadow-lg"
            >
              <ImageWithLoader
                src="/grupo-excursion-expedicion-andina.webp"
                alt="Grupo de excursionistas felices"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* ---------- Flecha scroll-up ---------- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={scrollToTop}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <ChevronUpIcon className="h-8 w-8 text-brand-deep-teal" />
            </motion.div>
          </motion.div>
        </section>

        {/* ---------------- RESEÑAS DE GOOGLE ---------------- */}
        <section id="reviews" className="bg-white py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="font-bold text-brand-deep-teal text-3xl md:text-4xl mb-3">
                Quienes ya pisaron el sendero
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Descubre las experiencias de quienes ya vivieron la aventura con nosotros
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <GoogleReviewsCarousel
                rating={5.0}
                totalReviews={25}
                googleMapsUrl="https://maps.app.goo.gl/DjfZtzKqLkPWHVVg8"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
