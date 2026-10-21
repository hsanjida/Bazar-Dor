"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { DEFAULT_CATEGORIES } from "@/lib/api";
import { getTodayBanglaDate } from "@/lib/bangla";
import { User, LogOut, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const todayDate = getTodayBanglaDate();

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await signOut();
    toast.success("সাইন আউট সফল হয়েছে");
  };

  return (
    <header className="w-full bg-[#fafcfa] border-b border-bazar-border sticky top-0 z-40 transition-all">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Logo and Date */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-bazar-primary flex items-center justify-center text-white text-xl shadow-sm group-hover:scale-105 transition-transform">
            🛒
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-bazar-text leading-tight tracking-tight">
              বাজার দর
            </h1>
            <p className="text-xs text-bazar-muted hidden sm:block">
              {todayDate}
            </p>
          </div>
        </Link>

        {/* Right Auth Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-black/5 transition-colors border border-transparent hover:border-bazar-border"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-bazar-primary flex items-center justify-center font-bold text-sm">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="text-sm font-medium text-bazar-text max-w-[120px] truncate">
                  {user.name || "ব্যবহারকারী"}
                </span>
                <ChevronDown className="w-4 h-4 text-bazar-muted" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-bazar-border py-2 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-bazar-border">
                      <p className="text-xs text-bazar-muted">লগইন করা হয়েছে</p>
                      <p className="text-sm font-semibold text-bazar-text truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-bazar-muted truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-bazar-text hover:bg-bazar-primary-light transition-colors"
                    >
                      <User className="w-4 h-4 text-bazar-primary" />
                      আমার প্রোফাইল
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      সাইন আউট
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/signin"
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-sm font-semibold text-bazar-text hover:text-bazar-primary rounded-full hover:bg-black/5 transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-sm font-semibold text-[#f3fbf4] bg-bazar-primary hover:bg-bazar-primary-hover rounded-full shadow-sm transition-all hover:shadow"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Categories Row */}
      <div className="border-t border-bazar-border bg-[#fafcfa]/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1.5 sm:gap-2 min-w-max">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                pathname === "/"
                  ? "bg-bazar-primary text-[#f3fbf4] shadow-sm"
                  : "text-bazar-text hover:bg-black/5"
              }`}
            >
              🏠 সব পণ্য
            </Link>
            {DEFAULT_CATEGORIES.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-bazar-primary text-[#f3fbf4] shadow-sm font-semibold"
                      : "text-bazar-text hover:bg-black/5"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
