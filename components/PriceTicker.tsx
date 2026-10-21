"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatBanglaPrice, formatBanglaFloat, getBanglaTickerUnit } from "@/lib/bangla";

interface PriceTickerProps {
  products: Product[];
}

export function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  // Duplicate the list to ensure perfectly seamless marquee scroll
  const displayProducts = [...products, ...products];

  return (
    <div className="w-full bg-[#fafcfa] border-b border-bazar-border overflow-hidden py-2 text-sm select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {displayProducts.map((p, index) => {
          const isUp = p.change?.dir === "up";
          const isDown = p.change?.dir === "down";
          const changePct = p.change?.pct ?? 0;

          return (
            <Link
              key={`${p.id}-${index}`}
              href={`/product/${p.slug || p.id}`}
              className="inline-flex items-center gap-2 px-5 py-0.5 border-r border-bazar-border/60 hover:bg-black/5 transition-colors whitespace-nowrap group"
            >
              <span className="text-base">{p.categoryIcon || p.image || "🛒"}</span>
              <span className="font-medium text-bazar-text group-hover:text-bazar-primary transition-colors">
                {p.nameBn}
              </span>
              <span className="text-bazar-muted">
                {formatBanglaPrice(p.today)} {getBanglaTickerUnit(p.unit)}
              </span>

              {/* Badge */}
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded ${
                  isUp
                    ? "text-bazar-up bg-bazar-up-bg"
                    : isDown
                    ? "text-bazar-down bg-bazar-down-bg"
                    : "text-bazar-muted bg-gray-100"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {formatBanglaFloat(changePct)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
