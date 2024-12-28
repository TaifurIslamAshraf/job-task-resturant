import { Skeleton } from "../ui/skeleton";
import { ProductSkeleton } from "./SkeletonLoading";

export default function Loading() {
  return (
    <div className="min-h-screen px-20 pt-6">
      <div className="mt-20 flex gap-8 relative">
        {[1, 2].map((categoryIndex) => (
          <div key={categoryIndex}>
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
