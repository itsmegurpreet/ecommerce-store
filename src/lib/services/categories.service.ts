import type { Category } from "@/types";
import { categories as mockCategories } from "@/data/categories";

/**
 * Toggle this flag to switch between mock data and real backend.
 * Set to `false` once a real API is available and fill in the
 * NEXT_PUBLIC_API_BASE_URL environment variable.
 */
const USE_MOCK_DATA = true;

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function getCategories(): Promise<Category[]> {
    if (USE_MOCK_DATA) {
        return mockCategories;
    }
    const res = await fetch(`${API_BASE}/categories`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
    return res.json() as Promise<Category[]>;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    if (USE_MOCK_DATA) {
        return mockCategories.find((c) => c.slug === slug) ?? null;
    }
    const res = await fetch(`${API_BASE}/categories/${slug}`, { next: { revalidate: 60 } });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to fetch category ${slug}: ${res.status}`);
    return res.json() as Promise<Category>;
}
