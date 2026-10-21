"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Product, Category } from "@/types";
import { getAllProducts, getCategories, DEFAULT_CATEGORIES } from "@/lib/api";
import { PriceTicker } from "@/components/PriceTicker";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/ProductSkeleton";
import { toBanglaNumber } from "@/lib/bangla";
import { ChevronDown, ArrowLeft } from "lucide-react";

type SortOption = "default" | "low-to-high" | "high-to-low";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getCategories(),
        ]);

        setAllProducts(productsData);

        const foundCategory =
          categoriesData.find((c) => c.slug === slug || c.id === slug) ||
          DEFAULT_CATEGORIES.find((c) => c.slug === slug || c.id === slug) ||
          null;

        setCategory(foundCategory);
      } catch (err) {
        console.error("Error loading category data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      loadData();
    }
  }, [slug]);

  // Filter products by category
  const categoryProducts = useMemo(() => {
    if (!slug) return [];
    return allProducts.filter((p) => p.category === slug);
  }, [allProducts, slug]);

  // Sort products correctly by numeric price
  const sortedProducts = useMemo(() => {
    const list = [...categoryProducts];
    if (sortBy === "low-to-high") {
      return list.sort((a, b) => a.today - b.today);
    }
    if (sortBy === "high-to-low") {
      return list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [categoryProducts, sortBy]);

  // If loading, show skeleton
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
          <div className="bg-[#fafcfa] border border-bazar-border rounded-2xl p-6 animate-pulse space-y-3">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    );
  }

  // If category not found or has no products -> Empty / 404 state with CTA back to home
  if (!category || categoryProducts.length === 0) {
    return (
      <div className="flex flex-col min-h-[70vh] items-center justify-center px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-3xl mb-4 border border-red-100">
          🔍
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-bazar-text mb-2">
          কোনো পণ্য পাওয়া যায়নি
        </h1>
        <p className="text-bazar-muted max-w-md mb-8">
          দুঃখিত, এই ক্যাটাগরিতে এই মুহূর্তে কোনো পণ্য তালিকাভুক্ত নেই অথবা ক্যাটাগরিটি সঠিক নয়।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#f3fbf4] bg-bazar-primary hover:bg-bazar-primary-hover shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Ticker Strip */}
      <PriceTicker products={allProducts} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 w-full">
        {/* Category Header Card */}
        <div className="bg-[#fafcfa] border border-bazar-border rounded-2xl p-6 sm:p-8 flex items-center gap-4 sm:gap-6 shadow-sm">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-bazar-bg flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0">
            {category.icon}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-bazar-text">
              {category.nameBn}
            </h1>
            <p className="text-sm sm:text-base text-bazar-muted mt-1">
              {toBanglaNumber(categoryProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Controls & Product Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm font-medium text-bazar-muted">
            মোট {toBanglaNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
          </p>

          {/* Sort Dropdown (Challenge C1) */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-bazar-text">সাজান:</span>
            <div className="relative inline-block text-left">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-[#fafcfa] border border-bazar-border hover:border-emerald-300 rounded-xl px-4 py-2 pr-9 text-sm font-semibold text-bazar-text shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer transition-colors"
              >
                <option value="default">ডিফল্ট</option>
                <option value="low-to-high">দাম: কম থেকে বেশি</option>
                <option value="high-to-low">দাম: বেশি থেকে কম</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-bazar-muted">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={`cat-${product.id}`} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
