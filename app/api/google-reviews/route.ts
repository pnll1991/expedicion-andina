import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const placeId = searchParams.get("placeId")

  if (!placeId) {
    return NextResponse.json(
      { error: "placeId is required" },
      { status: 400 }
    )
  }

  // Nota: Para usar esto necesitas una API key de Google Places API
  // Puedes obtenerla en: https://console.cloud.google.com/
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    // Si no hay API key, retornar valores por defecto con reseñas de ejemplo
    return NextResponse.json({
      rating: 5.0,
      totalReviews: 0,
      reviews: [],
      message: "Google Places API key not configured",
    })
  }

  try {
    // Obtener detalles del lugar incluyendo reseñas
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${apiKey}`
    )

    const data = await response.json()

    if (data.status === "OK" && data.result) {
      // Formatear las reseñas
      const reviews = (data.result.reviews || []).map((review: any) => ({
        authorName: review.author_name,
        authorPhoto: review.profile_photo_url || null,
        rating: review.rating,
        text: review.text,
        time: review.time,
        relativeTimeDescription: review.relative_time_description,
      }))

      return NextResponse.json({
        rating: data.result.rating || 5.0,
        totalReviews: data.result.user_ratings_total || 0,
        reviews: reviews.slice(0, 10), // Limitar a 10 reseñas
      })
    }

    return NextResponse.json({
      rating: 5.0,
      totalReviews: 0,
      reviews: [],
      error: "Could not fetch reviews",
    })
  } catch (error) {
    console.error("Error fetching Google reviews:", error)
    return NextResponse.json(
      {
        rating: 5.0,
        totalReviews: 0,
        reviews: [],
        error: "Failed to fetch reviews",
      },
      { status: 500 }
    )
  }
}
