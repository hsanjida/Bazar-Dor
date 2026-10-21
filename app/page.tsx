import React from "react";
import { getAllProducts } from "@/lib/api";
import { PriceTicker } from "@/components/PriceTicker";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { toBanglaNumber } from "@/lib/bangla";

export const revalidate = 60;

export default async function HomePage() {
  const products = await getAllProducts();

  // Top 6 Risers (দাম বেড়েছে ▲)
  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);

  // Top 6 Fallers (দাম কমেছে ▼)
  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Price Ticker marquee below navbar */}
      <PriceTicker products={products} />

      {/* Hero / Banner Section */}
      <Hero />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16 w-full">
        {/* Section A — আজ দাম বেড়েছে ▲ */}
        {risers.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-bazar-border/80">
              <span className="text-xl sm:text-2xl text-bazar-up">▲</span>
              <h2 className="text-xl sm:text-2xl font-bold text-bazar-text">
                আজ দাম বেড়েছে
              </h2>
              <span className="text-xs sm:text-sm font-medium text-bazar-muted ml-auto bg-bazar-up-bg text-bazar-up px-2.5 py-0.5 rounded-full border border-red-200">
                শীর্ষ {toBanglaNumber(risers.length)}টি পণ্য
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {risers.map((product) => (
                <ProductCard key={`riser-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section B — আজ দাম কমেছে ▼ */}
        {fallers.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-bazar-border/80">
              <span className="text-xl sm:text-2xl text-bazar-down">▼</span>
              <h2 className="text-xl sm:text-2xl font-bold text-bazar-text">
                আজ দাম কমেছে
              </h2>
              <span className="text-xs sm:text-sm font-medium text-bazar-muted ml-auto bg-bazar-down-bg text-bazar-down px-2.5 py-0.5 rounded-full border border-emerald-200">
                শীর্ষ {toBanglaNumber(fallers.length)}টি পণ্য
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {fallers.map((product) => (
                <ProductCard key={`faller-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section C — সব পণ্য */}
        <section id="সব-পণ্য" className="space-y-5 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-bazar-border/80">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-bazar-text">
                সব পণ্য
              </h2>
              <p className="text-sm text-bazar-muted mt-1">
                মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={`all-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
