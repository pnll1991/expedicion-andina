"use client"

import { Star } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

interface GoogleReviewsProps {
  rating?: number
  totalReviews?: number
  googleMapsUrl?: string
  placeId?: string
}

export function GoogleReviews({
  rating: initialRating,
  totalReviews: initialTotalReviews,
  googleMapsUrl = "https://maps.app.goo.gl/DjfZtzKqLkPWHVVg8",
  placeId,
}: GoogleReviewsProps) {
  const [rating, setRating] = useState(initialRating || 5.0)
  const [totalReviews, setTotalReviews] = useState(initialTotalReviews || 0)
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
        })
        .catch(() => {
          // Si falla, mantener valores por defecto
        })
        .finally(() => setIsLoading(false))
    }
  }, [placeId, initialRating])

  // Calcular estrellas llenas, medias y vacías
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Logo de Google */}
        <div className="flex items-center gap-2 mb-2">
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-sm font-medium text-gray-600">Google</span>
        </div>

        {/* Rating y estrellas */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: fullStars }).map((_, i) => (
              <Star
                key={`full-${i}`}
                className="w-6 h-6 fill-yellow-400 text-yellow-400"
              />
            ))}
            {hasHalfStar && (
              <div className="relative w-6 h-6">
                <Star className="absolute w-6 h-6 fill-gray-200 text-gray-200" />
                <div className="absolute overflow-hidden w-3 h-6">
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            )}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <Star
                key={`empty-${i}`}
                className="w-6 h-6 fill-gray-200 text-gray-200"
              />
            ))}
          </div>

          <div className="space-y-1">
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-9 w-16 bg-gray-200 rounded animate-pulse mx-auto" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mx-auto" />
              </div>
            ) : (
              <>
                <p className="text-3xl font-bold font-heading text-brand-deep-teal">
                  {rating.toFixed(1)}
                </p>
                {totalReviews > 0 && (
                  <p className="text-sm text-gray-600">
                    {totalReviews} {totalReviews === 1 ? "reseña" : "reseñas"}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Botón para ver en Google Maps */}
        <Link
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-brand-deep-teal text-white rounded-lg font-medium hover:bg-brand-sky-blue transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Ver en Google Maps
        </Link>
      </div>
    </motion.div>
  )
}
