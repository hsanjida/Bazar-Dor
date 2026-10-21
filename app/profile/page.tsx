"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { ArrowLeft, LogOut, CheckCircle2, User, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut, updateUser, isLoading } = useAuth();

  const [nameInput, setNameInput] = useState("");
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.replace("/signin?redirect=/profile");
    } else if (user) {
      setNameInput(user.name || "");
    }
  }, [user, isLoading, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");

    if (!nameInput.trim()) {
      toast.error("নাম ফাঁকা রাখা যাবে না");
      return;
    }

    setUpdating(true);
    try {
      const res = await updateUser(nameInput.trim());
      if (res.success) {
        setSuccessMsg("আপনার প্রোফাইলের নাম সফলভাবে আপডেট করা হয়েছে!");
        toast.success("প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!");
      } else {
        toast.error(res.error || "আপডেট ব্যর্থ হয়েছে");
      }
    } catch {
      toast.error("একটি ত্রুটি ঘটেছে");
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
  };

  if (isLoading || !user) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-bazar-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-2xl space-y-8">
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-bazar-text">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm text-bazar-muted">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন এবং আপডেট করুন।
          </p>
        </div>

        {/* User Card */}
        <div className="bg-[#fafcfa] border border-bazar-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-bazar-primary flex items-center justify-center text-2xl font-bold border border-emerald-200 flex-shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-bazar-text">
                {user.name}
              </h2>
              <p className="text-sm text-bazar-muted">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>সাইন আউট</span>
          </button>
        </div>

        {/* Update Information Form (Challenge C3) */}
        <div className="bg-[#fafcfa] border border-bazar-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-bazar-border pb-3">
            <h3 className="text-lg font-bold text-bazar-text">
              তথ্য আপডেট
            </h3>
            <p className="text-xs text-bazar-muted">
              BetterAuth ব্যবহার করে নাম পরিবর্তন করুন।
            </p>
          </div>

          {successMsg && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-bazar-text">
                আপনার নাম
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="আপনার নাম লিখুন"
                  required
                  className="w-full bg-white border border-bazar-border rounded-xl px-4 py-2.5 text-sm text-bazar-text focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                />
                <User className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5 opacity-60">
              <label className="block text-sm font-medium text-bazar-text">
                ইমেইল (অপরিবর্তনযোগ্য)
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full bg-gray-50 border border-bazar-border rounded-xl px-4 py-2.5 text-sm text-bazar-muted cursor-not-allowed"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={updating}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-[#f3fbf4] bg-bazar-primary hover:bg-bazar-primary-hover shadow-sm transition-all disabled:opacity-50"
              >
                {updating && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>আপডেট</span>
              </button>
            </div>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-bazar-muted hover:text-bazar-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
