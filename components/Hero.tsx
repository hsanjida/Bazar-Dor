"use client";

import React from "react";
import Image from "next/image";
import { getTodayBanglaDate } from "@/lib/bangla";

export function Hero() {
  const todayDate = getTodayBanglaDate();

  const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("সব-পণ্য") || document.getElementById("all-products");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#fafcfa] border-b border-bazar-border py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Text Content */}
          <div className="md:col-span-7 flex flex-col items-start gap-4 sm:gap-6">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bazar-primary-light border border-emerald-200 text-bazar-primary text-xs sm:text-sm font-semibold tracking-wide">
              <span>📅</span>
              <span>{todayDate}</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-bazar-text leading-[1.25] tracking-tight">
              আজকের বাজারের দাম <br className="hidden sm:inline" /> এক নজরে
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-bazar-muted leading-relaxed max-w-2xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#সব-পণ্য"
                onClick={handleScrollToProducts}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-base font-semibold text-[#f3fbf4] bg-bazar-primary hover:bg-bazar-primary-hover shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>সব পণ্য দেখুন</span>
                <span className="text-lg">↓</span>
              </a>
            </div>
          </div>

          {/* Right Banner Image */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-84 p-4">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর বাস্কেট"
                width={380}
                height={320}
                priority
                className="object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
