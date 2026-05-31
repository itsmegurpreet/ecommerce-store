import type { Product } from "@/types";
import { products as mockProducts } from "@/data/products";

/**
 * Toggle this flag to switch between mock data and real backend.
 * Set to `false` once a real API is available and fill in the
 * NEXT_PUBLIC_API_BASE_URL environment variable.
 */
const USE_MOCK_DATA = true;

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function getProducts(): Promise<Product[]> {
    if (USE_MOCK_DATA) {
        return mockProducts;
    }
    const res = await fetch(`${API_BASE}/products`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
    return res.json() as Promise<Product[]>;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    if (USE_MOCK_DATA) {
        return mockProducts.find((p) => p.slug === slug) ?? null;
    }
    const res = await fetch(`${API_BASE}/products/${slug}`, { next: { revalidate: 60 } });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to fetch product ${slug}: ${res.status}`);
    return res.json() as Promise<Product>;
}

export async function getProductById(id: string): Promise<Product | null> {
    if (USE_MOCK_DATA) {
        return mockProducts.find((p) => p.id === id) ?? null;
    }
    const res = await fetch(`${API_BASE}/products?id=${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const list = (await res.json()) as Product[];
    return list[0] ?? null;
}

export async function getBestSellers(): Promise<Product[]> {
    if (USE_MOCK_DATA) {
        return mockProducts.filter((p) => p.badge === "bestseller");
    }
    const res = await fetch(`${API_BASE}/products?badge=bestseller`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Failed to fetch best sellers: ${res.status}`);
    return res.json() as Promise<Product[]>;
}

export async function getTrendingProducts(): Promise<Product[]> {
    if (USE_MOCK_DATA) {
        return mockProducts.filter((p) => p.badge === "bestseller" || p.badge === "new");
    }
    const res = await fetch(`${API_BASE}/products?trending=true`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Failed to fetch trending products: ${res.status}`);
    return res.json() as Promise<Product[]>;
}
