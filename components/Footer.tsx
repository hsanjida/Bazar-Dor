import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-[#fafcfa] border-t border-bazar-border mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Left Text */}
          <p className="text-sm font-medium text-bazar-text">
            🛒 বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          {/* Right Disclaimer */}
          <p className="text-xs sm:text-sm text-bazar-muted italic">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </div>
    </footer>
  );
}
