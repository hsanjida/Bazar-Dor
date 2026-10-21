"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatBanglaPrice, formatBanglaFloat, getBanglaUnit } from "@/lib/bangla";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const changePct = product.change?.pct ?? 0;

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="group block bg-[#fafcfa] hover:bg-white border border-bazar-border hover:border-emerald-300 rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Top Row: Icon + Name + Unit */}
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-12 h-12 rounded-xl bg-bazar-bg flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
          {product.categoryIcon || product.image || "🛒"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-bazar-text truncate group-hover:text-bazar-primary transition-colors">
            {product.nameBn}
          </h3>
          <p className="text-xs text-bazar-muted mt-0.5">
            {getBanglaUnit(product.unit)}
          </p>
        </div>
      </div>

      {/* Bottom Row: Today's Price + Change Badge */}
      <div className="flex items-end justify-between pt-2 border-t border-bazar-border/60">
        <div>
          <span className="block text-xs text-bazar-muted mb-0.5">
            আজকের দাম
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-bold text-bazar-text">
              {formatBanglaPrice(product.today)}
            </span>
            <span className="text-sm font-medium text-bazar-muted">
              টাকা
            </span>
          </div>
        </div>

        {/* Change Badge */}
        <div
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
            isUp
              ? "text-bazar-up bg-bazar-up-bg border border-red-100"
              : isDown
              ? "text-bazar-down bg-bazar-down-bg border border-emerald-100"
              : "text-bazar-text bg-gray-100 border border-gray-200"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{formatBanglaFloat(changePct)}%</span>
        </div>
      </div>
    </Link>
  );
}
