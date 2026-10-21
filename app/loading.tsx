import React from "react";
import { ProductGridSkeleton } from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        <div className="bg-[#fafcfa] border border-bazar-border rounded-2xl p-8 animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
