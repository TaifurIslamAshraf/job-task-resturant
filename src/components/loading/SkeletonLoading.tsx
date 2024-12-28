import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-3 h-[358px] max-w-[217px] w-full flex flex-col justify-between gap-4">
      <div>
        <Skeleton className="w-full h-[170px] rounded-lg" />
        <Skeleton className="h-6 w-20 mt-2" />
        <Skeleton className="h-4 w-32 mt-2" />
      </div>
      <Skeleton className="w-full h-[52px] rounded-xl" />
    </div>
  );
};
