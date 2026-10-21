"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types";
import { getProduct, getAllProducts } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { PriceTicker } from "@/components/PriceTicker";
import {
  toBanglaNumber,
  formatBanglaPrice,
  formatBanglaFloat,
  getBanglaUnit,
} from "@/lib/bangla";
import { ChevronRight, ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { user, isLoading: authLoading } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Protected route check
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("পণ্যর বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.replace(`/signin?redirect=/product/${slug}`);
    }
  }, [user, authLoading, router, slug]);

  // Load product data
  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      try {
        const [prod, productsList] = await Promise.all([
          getProduct(slug),
          getAllProducts(),
        ]);
        setProduct(prod);
        setAllProducts(productsList);
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  // While checking auth or loading product data
  if (authLoading || isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-6">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="bg-[#fafcfa] border border-bazar-border rounded-2xl p-8 animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-1/3" />
            <div className="h-5 bg-gray-200 rounded w-1/4" />
            <div className="h-16 bg-gray-200 rounded w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-28 bg-gray-200 rounded-2xl animate-pulse" />
            <div className="h-28 bg-gray-200 rounded-2xl animate-pulse" />
            <div className="h-28 bg-gray-200 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirecting...
  if (!user) {
    return null;
  }

  // If product not found
  if (!product) {
    return (
      <div className="flex flex-col min-h-[70vh] items-center justify-center px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-3xl mb-4 border border-red-100">
          ❌
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-bazar-text mb-2">
          পণ্যটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-bazar-muted max-w-md mb-8">
          অনুরোধকৃত পণ্যের তথ্য পাওয়া যায়নি। অনুগ্রহ করে হোম পেজে ফিরে গিয়ে পুনরায় চেষ্টা করুন।
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

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const changePct = product.change?.pct ?? 0;

  // Price calculations
  const markets = product.markets || [];
  let minPrice = product.today;
  let minMarket = "প্রধান বাজার";
  let maxPrice = product.today;
  let maxMarket = "প্রধান বাজার";

  if (markets.length > 0) {
    const mins = markets.map((m) => m.min);
    const maxs = markets.map((m) => m.max);
    minPrice = Math.min(...mins);
    maxPrice = Math.max(...maxs);

    const cheapest = markets.find((m) => m.min === minPrice);
    if (cheapest) minMarket = cheapest.market;

    const priciest = markets.find((m) => m.max === maxPrice);
    if (priciest) maxMarket = priciest.market;
  }

  // Day difference note
  const priceDiff = product.today - product.yesterday;
  const isHigher = priceDiff > 0;
  const isLower = priceDiff < 0;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Ticker Strip */}
      <PriceTicker products={allProducts} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-bazar-muted flex-wrap">
          <Link href="/" className="hover:text-bazar-primary transition-colors">
            হোম
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link
            href={`/category/${product.category}`}
            className="hover:text-bazar-primary transition-colors"
          >
            {product.categoryNameBn || product.category}
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="font-semibold text-bazar-text">{product.nameBn}</span>
        </nav>

        {/* Top Summary Card (Figma Exact) */}
        <div className="bg-[#fafcfa] border border-bazar-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left Info */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-bazar-bg flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0">
                {product.categoryIcon || product.image || "🍚"}
              </div>
              <div className="space-y-1 sm:space-y-1.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bazar-text">
                  {product.nameBn}
                </h1>
                <p className="text-sm sm:text-base text-bazar-muted">
                  {getBanglaUnit(product.unit)} ·{" "}
                  <span className="text-bazar-primary font-medium">
                    {product.categoryNameBn || product.category}
                  </span>
                </p>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm pt-1">
                  {isHigher ? (
                    <span className="text-bazar-up font-medium flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      গতকালের তুলনায় আজ দাম বেড়েছে · {formatBanglaPrice(priceDiff)} টাকা
                    </span>
                  ) : isLower ? (
                    <span className="text-bazar-down font-medium flex items-center gap-1">
                      <TrendingDown className="w-4 h-4" />
                      গতকালের তুলনায় আজ দাম কমেছে · {formatBanglaPrice(Math.abs(priceDiff))} টাকা
                    </span>
                  ) : (
                    <span className="text-bazar-muted flex items-center gap-1">
                      <Minus className="w-4 h-4" />
                      গতকালের তুলনায় আজ দাম অপরিবর্তিত
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Price Display Box */}
            <div className="bg-bazar-bg/70 border border-bazar-border rounded-2xl p-5 flex flex-col items-start md:items-end justify-center min-w-[200px]">
              <span className="text-xs font-semibold text-bazar-muted uppercase tracking-wider mb-1">
                আজকের দাম
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-bazar-text">
                  {formatBanglaPrice(product.today)}
                </span>
                <span className="text-sm font-medium text-bazar-muted">
                  টাকা / {product.unit === "kg" ? "কেজি" : product.unit === "litre" ? "লিটার" : product.unit === "dozen" ? "ডজন" : "পিস"}
                </span>
              </div>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    isUp
                      ? "text-bazar-up bg-bazar-up-bg border border-red-200"
                      : isDown
                      ? "text-bazar-down bg-bazar-down-bg border border-emerald-200"
                      : "text-bazar-text bg-gray-100 border border-gray-200"
                  }`}
                >
                  <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
                  <span>{formatBanglaFloat(changePct)}%</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: দামের সারসংক্ষেপ (Price Summary Stats) */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-bazar-text">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Min Price Card */}
            <div className="bg-[#fafcfa] border border-bazar-border rounded-2xl p-5 sm:p-6 shadow-sm hover:border-emerald-300 transition-colors">
              <span className="text-xs font-medium text-bazar-muted block mb-1">
                সর্বনিম্ন দাম
              </span>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-bazar-down">
                  {formatBanglaPrice(minPrice)}
                </span>
                <span className="text-sm font-semibold text-bazar-down">টাকা</span>
              </div>
              <p className="text-xs text-bazar-muted truncate">
                সবচেয়ে কম দামের বাজার: <span className="font-medium text-bazar-text">{minMarket}</span>
              </p>
            </div>

            {/* Max Price Card */}
            <div className="bg-[#fafcfa] border border-bazar-border rounded-2xl p-5 sm:p-6 shadow-sm hover:border-red-300 transition-colors">
              <span className="text-xs font-medium text-bazar-muted block mb-1">
                সর্বাধিক দাম
              </span>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-bazar-up">
                  {formatBanglaPrice(maxPrice)}
                </span>
                <span className="text-sm font-semibold text-bazar-up">টাকা</span>
              </div>
              <p className="text-xs text-bazar-muted truncate">
                সবচেয়ে বেশি দামের বাজার: <span className="font-medium text-bazar-text">{maxMarket}</span>
              </p>
            </div>

            {/* Average Price Card */}
            <div className="bg-[#fafcfa] border border-bazar-border rounded-2xl p-5 sm:p-6 shadow-sm hover:border-emerald-300 transition-colors">
              <span className="text-xs font-medium text-bazar-muted block mb-1">
                গড় দাম
              </span>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-bazar-primary">
                  {formatBanglaPrice(product.today)}
                </span>
                <span className="text-sm font-semibold text-bazar-primary">টাকা</span>
              </div>
              <p className="text-xs text-bazar-muted">
                {getBanglaUnit(product.unit)}-এর হিসাবে
              </p>
            </div>
          </div>
        </div>

        {/* Section: বাজারভিত্তিক আজকের দাম (Market Breakdown Table) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-bazar-text">
              বাজারভিত্তিক আজকের দাম
            </h2>
            <span className="text-xs font-medium text-bazar-muted">
              মোট {toBanglaNumber(markets.length)}টি বাজার
            </span>
          </div>

          <div className="bg-[#fafcfa] border border-bazar-border rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-bazar-border bg-bazar-bg/50 text-bazar-text text-xs uppercase tracking-wider font-bold">
                    <th className="px-5 py-4">বাজার</th>
                    <th className="px-5 py-4">বিভাগ</th>
                    <th className="px-5 py-4">সর্বনিম্ন</th>
                    <th className="px-5 py-4">সর্বাধিক</th>
                    <th className="px-5 py-4">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bazar-border/60">
                  {markets.length > 0 ? (
                    markets.map((m, idx) => {
                      const avg = Math.round((m.min + m.max) / 2);
                      const isAlternate = idx % 2 === 1;
                      return (
                        <tr
                          key={`${m.market}-${idx}`}
                          className={`hover:bg-emerald-50/50 transition-colors ${
                            isAlternate ? "bg-bazar-bg/30" : "bg-white"
                          }`}
                        >
                          <td className="px-5 py-4 font-semibold text-bazar-text whitespace-nowrap">
                            {m.market}
                          </td>
                          <td className="px-5 py-4 text-bazar-muted whitespace-nowrap">
                            {m.division}
                          </td>
                          <td className="px-5 py-4 font-medium text-bazar-down whitespace-nowrap">
                            {formatBanglaPrice(m.min)} টাকা
                          </td>
                          <td className="px-5 py-4 font-medium text-bazar-up whitespace-nowrap">
                            {formatBanglaPrice(m.max)} টাকা
                          </td>
                          <td className="px-5 py-4 font-bold text-bazar-text whitespace-nowrap">
                            {formatBanglaPrice(avg)} টাকা
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-5 py-8 text-center text-bazar-muted">
                        বাজারভিত্তিক তথ্য এখনো উপলব্ধ নয়।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
