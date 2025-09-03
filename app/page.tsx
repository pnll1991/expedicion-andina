"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPinIcon, CalendarIcon, UsersIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { allExcursions } from "@/data/excursions"

export default function HomePage() {
  /*—  Bloquear scroll cuando el menú mobile está abierto —*/

  /*— Hero —*/
  const subtitle = "Tu puerta de entrada a la aventura: montañismo, trekking, y cursos especializados."

  /*— Utilidades varias —*/
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  /*— Parallax para la imagen de “Sobre Nosotros” —*/
  const aboutImgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: aboutImgRef,
    offset: ["start end", "end start"],
  })
  const rotate = useTransform(scrollYProgress, [0, 1], ["-5deg", "5deg"])

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
  const featuredExcursions = allExcursions.filter(
    (x) => !["kayak-lago-montana", "caminata-bosque-alpino", "escalada-atardecer"].includes(x.slug),
  )

  return (
    <div className="flex min-h-dvh flex-col bg-brand-light-sand">
      <main className="flex-1">
        {/* ---------------- HERO ---------------- */}
        <section className="relative flex h-[85vh] w-full items-center justify-center text-center text-white">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/hero-montanas-nubladas-patagonia.jpg"
              alt="Impresionantes montañas de la Patagonia"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              quality={75}
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/40" />
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
                className="h-auto transform px-8 py-3 font-bold transition-transform hover:scale-105 bg-brand-sky-blue text-brand-deep-teal hover:bg-brand-sky-blue/90"
              >
                <Link href="#excursions">Explorar Excursiones</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20" // Changed bottom-16 to bottom-4 and added z-20
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
                <motion.div key={excursion.slug} variants={itemVariants}>
                  <Card className="group overflow-hidden border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={excursion.img || "/placeholder.svg"}
                        alt={excursion.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                        <span className="rotate-3 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-md">
                          NUEVA
                        </span>
                        <span className="-rotate-3 rounded-full bg-yellow-400 px-2 py-1 text-xs font-bold text-brand-deep-teal shadow-md">
                          CUPOS LIMITADOS
                        </span>
                      </div>
                    </div>

                    <CardContent className="space-y-4 p-6">
                      <h3 className="font-heading text-xl font-bold text-brand-deep-teal">{excursion.title}</h3>
                      <p className="text-gray-600">{excursion.desc}</p>
                      <div className="flex items-center justify-between pt-2 text-sm text-gray-500">
                        <span>{excursion.duration}</span>
                        <span className="text-lg font-bold text-brand-deep-teal">{excursion.price}</span>
                      </div>

                      <Button
                        asChild
                        variant="outline"
                        className="w-full bg-transparent border-brand-sky-blue text-brand-sky-blue hover:bg-brand-sky-blue hover:text-brand-deep-teal"
                      >
                        <Link href={`/excursions/${excursion.slug}`}>Ver Detalles</Link>
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
                    desc: "Nuestros guías conocen el terreno, la historia y los secretos de la región.",
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
                    <div className="mt-1 rounded-full bg-brand-sky-blue/10 p-3 text-brand-sky-blue">{item.icon}</div>
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-brand-deep-teal">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
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
              <Image
                src="/grupo-excursion-expedicion-andina.jpg"
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
      </main>
    </div>
  )
}
