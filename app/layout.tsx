import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর, বাজারভিত্তিক দাম ও পরিবর্তন জানুন এক ক্লিকে।",
  keywords: ["বাজার দর", "Bazar Dor", "Grocery Prices", "Bangladesh Market Price", "নিত্যপ্রয়োজনীয় পণ্যের দাম"],
  icons: {
    icon: "/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="antialiased min-h-screen flex flex-col bg-bazar-bg text-bazar-text selection:bg-emerald-200 selection:text-emerald-900">
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3500,
              style: {
                background: "#fafcfa",
                color: "#1d271f",
                border: "1px solid #e1e9e2",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
                borderRadius: "1rem",
                fontSize: "14px",
                fontWeight: "500",
                padding: "12px 18px",
              },
              success: {
                iconTheme: {
                  primary: "#05893e",
                  secondary: "#f3fbf4",
                },
              },
              error: {
                iconTheme: {
                  primary: "#d03739",
                  secondary: "#fef2f2",
                },
              },
            }}
          />
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
