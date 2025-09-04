"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { allExcursions } from "@/data/excursions"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

function ExcursionDetailSkeleton() {
  return (
    <div className="flex flex-col min-h-dvh bg-brand-light-sand">
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6 order-2 lg:order-1">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-full" />

              <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>

              <div className="space-y-4">
                <Skeleton className="h-8 w-32" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <Skeleton key={item} className="h-4 w-full" />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Skeleton className="h-8 w-40" />
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <Skeleton key={item} className="h-4 w-full" />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-6 w-48" />
              </div>

              <div className="space-y-4">
                <Skeleton className="h-8 w-32" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Skeleton key={item} className="h-4 w-full" />
                  ))}
                </div>
              </div>

              <Skeleton className="h-12 w-48 rounded-full" />
            </div>

            <Skeleton className="h-[400px] w-full rounded-xl order-1 lg:order-2" />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function ExcursionDetailPageClient({ params }: { params: { slug: string } }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const excursion = allExcursions.find((e) => e.slug === params.slug)

  if (!excursion) {
    notFound()
  }

  if (isLoading) {
    return <ExcursionDetailSkeleton />
  }

  const whatsappNumber = "5492625642793" // Tu número de WhatsApp
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(excursion.details.whatsappMessage || `Hola! Me interesa la excursión ${excursion.title}. ¿Podrían darme más información?`)}`

  return (
    <div className="flex flex-col min-h-dvh bg-brand-light-sand">
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6 order-2 lg:order-1">
              <h1 className="text-4xl font-bold font-heading text-brand-deep-teal">{excursion.title}</h1>
              <p className="text-lg text-gray-700">{excursion.desc}</p>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-brand-deep-teal">Fechas Disponibles</h2>
                {Array.isArray(excursion.details.dates) ? (
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {excursion.details.dates.map((date, index) => (
                      <li key={index}>{date}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">{excursion.details.dates}</p>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-brand-deep-teal">Incluye</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {excursion.details.includes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-brand-deep-teal">Características</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {excursion.details.characteristics.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-brand-deep-teal">Precio</h2>
                {typeof excursion.details.priceDetails === "string" ? (
                  <p className="text-gray-600">{excursion.details.priceDetails}</p>
                ) : (
                  <div className="space-y-1 text-gray-600">
                    <p>
                      <strong>Alojamiento:</strong> {excursion.details.priceDetails.accommodation}
                    </p>
                    <p>
                      <strong>No incluye:</strong> {excursion.details.priceDetails.notIncluded}
                    </p>
                    <p>
                      <strong>Preventa:</strong> {excursion.details.priceDetails.preventa}
                    </p>
                    <p>
                      <strong>Contado:</strong> {excursion.details.priceDetails.contado}
                    </p>
                    <p>
                      <strong>Cuotas:</strong> {excursion.details.priceDetails.cuotas}
                    </p>
                  </div>
                )}
                <p className="text-xl font-bold text-brand-deep-teal">Precio Total: {excursion.price}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-brand-deep-teal">Qué llevar</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {excursion.details.whatToBring.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-green-600 hover:to-green-500 border-0"
                >
                  <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <span className="relative z-10">Reservar por WhatsApp</span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-lg order-1 lg:order-2 lg:sticky lg:top-8">
              <Image
                src={excursion.img || "/placeholder.svg"}
                alt={excursion.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
