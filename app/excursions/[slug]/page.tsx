import { notFound } from "next/navigation"
import { allExcursions } from "@/data/excursions"
import { Button } from "@/components/ui/button"
import { ImageWithLoader } from "@/components/ui/image-with-loader"
import Link from "next/link"

// Generate static params for all excursions
export async function generateStaticParams() {
  return allExcursions.map((excursion) => ({
    slug: excursion.slug,
  }))
}

export default function ExcursionDetailPage({ params }: { params: { slug: string } }) {
  const excursion = allExcursions.find((e) => e.slug === params.slug)

  if (!excursion) {
    notFound()
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

              {excursion.price && (
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
              )}
              {!excursion.price && excursion.details.priceDetails && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-brand-deep-teal">Información de Precio</h2>
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
                </div>
              )}

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
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-300 px-8 py-4 text-lg font-bold border-0 shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    Reservar por WhatsApp
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-lg order-1 lg:order-2 lg:sticky lg:top-8">
              <ImageWithLoader
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
