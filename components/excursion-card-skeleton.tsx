import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ExcursionCardSkeleton() {
  return (
    <Card className="overflow-hidden border-gray-200 bg-white">
      <Skeleton className="h-56 w-full rounded-none" />
      
      <CardContent className="space-y-4 p-6">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>

        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  )
}
