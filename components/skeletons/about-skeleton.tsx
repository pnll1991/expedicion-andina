import { Skeleton } from "@/components/ui/skeleton"

export function AboutSkeleton() {
  return (
    <section className="relative py-16 pb-56 md:py-24">
      <div className="container grid items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-full" />

          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Skeleton className="aspect-square w-full rounded-xl" />
      </div>
    </section>
  )
}
