"use client"

import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Review {
  authorName: string
  authorPhoto: string | null
  rating: number
  text: string
  time: number
  relativeTimeDescription: string
}

interface GoogleReviewsCarouselProps {
  rating?: number
  totalReviews?: number
  googleMapsUrl?: string
  placeId?: string
  reviews?: Review[]
}

export function GoogleReviewsCarousel({
  rating: initialRating,
  totalReviews: initialTotalReviews,
  googleMapsUrl = "https://maps.app.goo.gl/DjfZtzKqLkPWHVVg8",
  placeId,
  reviews: initialReviews,
}: GoogleReviewsCarouselProps) {
  const [rating, setRating] = useState(initialRating || 5.0)
  const [totalReviews, setTotalReviews] = useState(initialTotalReviews || 0)
  const [reviews, setReviews] = useState<Review[]>(initialReviews || [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Intentar obtener datos de Google si hay placeId
  useEffect(() => {
    if (placeId && !initialRating) {
      setIsLoading(true)
      fetch(`/api/google-reviews?placeId=${placeId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.rating) setRating(data.rating)
          if (data.totalReviews) setTotalReviews(data.totalReviews)
          if (data.reviews && data.reviews.length > 0) {
            setReviews(data.reviews)
          }
        })
        .catch(() => {
          // Si falla, mantener valores por defecto
        })
        .finally(() => setIsLoading(false))
    }
  }, [placeId, initialRating])

  // Reseñas de ejemplo si no hay reseñas reales
  const exampleReviews: Review[] = [
    {
      authorName: "María González",
      authorPhoto: null,
      rating: 5,
      text: "Una experiencia increíble! Los guías son muy profesionales y conocen perfectamente la zona. La excursión superó todas mis expectativas.",
      time: Date.now(),
      relativeTimeDescription: "hace 2 semanas",
    },
    {
      authorName: "Carlos Rodríguez",
      authorPhoto: null,
      rating: 5,
      text: "Excelente organización y atención. El paisaje es espectacular y la logística fue impecable. Sin duda volveré.",
      time: Date.now(),
      relativeTimeDescription: "hace 1 mes",
    },
    {
      authorName: "Ana Martínez",
      authorPhoto: null,
      rating: 5,
      text: "Los mejores guías de la región. Muy seguros, conocedores y divertidos. La aventura fue perfecta desde el inicio hasta el final.",
      time: Date.now(),
      relativeTimeDescription: "hace 3 semanas",
    },
  ]

  const displayReviews = reviews.length > 0 ? reviews : exampleReviews

  // Resetear índice si cambia el array de reseñas
  useEffect(() => {
    if (currentIndex >= displayReviews.length) {
      setCurrentIndex(0)
    }
  }, [displayReviews.length, currentIndex])

  // Auto-rotar reseñas cada 5 segundos
  useEffect(() => {
    if (displayReviews.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % displayReviews.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [displayReviews.length])

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % displayReviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + displayReviews.length) % displayReviews.length)
  }

  const currentReview = displayReviews[currentIndex] || displayReviews[0]

  // Validar que exista una reseña
  if (!currentReview || displayReviews.length === 0) {
    return null
  }

  return (
    <div className="w-full space-y-8">
      {/* Rating general minimalista */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-3"
      >
        <div className="flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
        {isLoading ? (
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mx-auto" />
        ) : (
          <>
            <p className="text-4xl font-bold font-heading text-brand-deep-teal">
              {rating.toFixed(1)}
            </p>
            {totalReviews > 0 && (
              <p className="text-sm text-gray-500">
                {totalReviews} {totalReviews === 1 ? "reseña" : "reseñas"} en{" "}
                <Link
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-deep-teal hover:underline"
                >
                  Google
                </Link>
              </p>
            )}
          </>
        )}
      </motion.div>

      {/* Carrusel de reseñas minimalista */}
      <div className="relative max-w-3xl mx-auto">
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center space-y-6 py-8"
            >
              {/* Texto de la reseña */}
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed px-4">
                "{currentReview?.text || ""}"
              </p>

              {/* Autor */}
              <div className="flex flex-col items-center gap-2">
                <p className="font-medium text-brand-deep-teal">
                  {currentReview?.authorName || ""}
                </p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < (currentReview?.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-xs text-gray-400">
                    {currentReview?.relativeTimeDescription || ""}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

            {/* Controles minimalistas */}
            {displayReviews.length > 1 && (
              <>
                <button
                  onClick={prevReview}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-brand-deep-teal transition-colors"
                  aria-label="Reseña anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextReview}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-brand-deep-teal transition-colors"
                  aria-label="Siguiente reseña"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Indicadores minimalistas */}
          {displayReviews.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {displayReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-brand-deep-teal w-8"
                      : "bg-gray-300 w-1 hover:bg-gray-400"
                  }`}
                  aria-label={`Ir a reseña ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
    </div>
  )
}
