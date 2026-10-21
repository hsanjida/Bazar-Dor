import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="w-24 h-24 rounded-3xl bg-emerald-50 text-bazar-primary flex items-center justify-center text-4xl mb-6 border border-emerald-200 shadow-sm animate-bounce">
        🛒
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-bazar-text mb-3">
        ৪০৪ — পৃষ্ঠা খুঁজে পাওয়া যায়নি
      </h1>
      <p className="text-base sm:text-lg text-bazar-muted max-w-md mb-8 leading-relaxed">
        আপনি যে পৃষ্ঠাটি খুঁজছেন তা সরানো হয়েছে, নাম পরিবর্তিত হয়েছে বা সাময়িকভাবে অনুপলব্ধ।
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-base font-semibold text-[#f3fbf4] bg-bazar-primary hover:bg-bazar-primary-hover shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>হোম পেজে ফিরে যান</span>
      </Link>
    </div>
  );
}
