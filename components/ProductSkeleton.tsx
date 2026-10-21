import React from "react";

export function ProductSkeleton() {
  return (
    <div className="bg-[#fafcfa] border border-bazar-border rounded-2xl p-4 sm:p-5 animate-pulse">
      {/* Top Row Skeleton */}
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gray-200 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>

      {/* Bottom Row Skeleton */}
      <div className="flex items-end justify-between pt-3 border-t border-bazar-border/60">
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-200 rounded w-16" />
          <div className="h-6 bg-gray-200 rounded w-20" />
        </div>
        <div className="w-16 h-6 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
