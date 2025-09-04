import { Skeleton } from "@/components/ui/skeleton"

export function HeroSkeleton() {
  return (
    <section className="relative flex h-[85vh] w-full items-center justify-center text-center">
      <div className="absolute inset-0 bg-gray-300 animate-pulse" />
      <div className="relative z-10 container px-4 md:px-6">
        <Skeleton className="mx-auto h-16 w-full max-w-4xl mb-4" />
        <Skeleton className="mx-auto h-6 w-full max-w-2xl mb-8" />
        <Skeleton className="mx-auto h-12 w-48 rounded-full" />
      </div>
    </section>
  )
}
