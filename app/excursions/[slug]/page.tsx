import { allExcursions } from "@/data/excursions"
import ExcursionDetailPageClient from "./ExcursionDetailPageClient"

// Generate static params for all excursions
export async function generateStaticParams() {
  return allExcursions.map((excursion) => ({
    slug: excursion.slug,
  }))
}

export default function ExcursionDetailPage({ params }: { params: { slug: string } }) {
  return <ExcursionDetailPageClient params={params} />
}
