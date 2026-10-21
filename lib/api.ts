import { Category, Product } from "@/types";

const BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchWithFallback<T>(endpoint: string, options?: RequestInit): Promise<T> {
  let lastError: any = null;

  for (const base of BASE_URLS) {
    try {
      const url = `${base}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
      const res = await fetch(url, {
        next: { revalidate: 60 },
        ...options,
      });

      if (res.ok) {
        const data = await res.json();
        return data as T;
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(`Failed to fetch from all API mirrors for endpoint: ${endpoint}. Last error: ${lastError?.message}`);
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await fetchWithFallback<Product[]>("/products");
    return Array.isArray(products) ? products : [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const products = await fetchWithFallback<Product[]>(`/products?category=${encodeURIComponent(categorySlug)}`);
    if (Array.isArray(products) && products.length > 0) {
      return products;
    }
    // Fallback filter if API endpoint returns empty or all
    const all = await getAllProducts();
    return all.filter((p) => p.category === categorySlug);
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    const all = await getAllProducts();
    return all.filter((p) => p.category === categorySlug);
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await fetchWithFallback<Category[]>("/categories");
    if (Array.isArray(categories) && categories.length > 0) {
      return categories;
    }
    return DEFAULT_CATEGORIES;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return DEFAULT_CATEGORIES;
  }
}

export async function getProduct(idOrSlug: string | number): Promise<Product | null> {
  try {
    const isNumeric = !isNaN(Number(idOrSlug));

    if (isNumeric) {
      try {
        const product = await fetchWithFallback<Product>(`/products/${idOrSlug}`);
        if (product && product.id) {
          return product;
        }
      } catch (e) {
        // Fallback to searching all products
      }
    }

    // Try finding by slug or id in all products
    const allProducts = await getAllProducts();
    const found = allProducts.find(
      (p) => p.slug === String(idOrSlug) || String(p.id) === String(idOrSlug)
    );

    if (!found) return null;

    // Fetch individual product details to get markets breakdown if not present
    if (!found.markets || found.markets.length === 0) {
      try {
        const full = await fetchWithFallback<Product>(`/products/${found.id}`);
        if (full && full.markets) {
          return full;
        }
      } catch {
        // return found without markets
      }
    }

    return found;
  } catch (error) {
    console.error(`Error fetching product ${idOrSlug}:`, error);
    return null;
  }
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];
