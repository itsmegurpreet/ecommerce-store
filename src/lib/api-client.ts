/**
 * Client-side API fetcher utilities.
 * Used by client components ("use client") to fetch data from API routes.
 * Server components should import from `@/lib/services/*` directly.
 */

import type { Brand, Category, Product, Testimonial } from "@/types";

async function apiFetch<T>(path: string): Promise<T> {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`API error ${res.status} for ${path}`);
    return res.json() as Promise<T>;
}

export const apiClient = {
    products: {
        list: () => apiFetch<Product[]>("/api/products"),
        bySlug: (slug: string) => apiFetch<Product>(`/api/products/${slug}`),
        search: (query: string) =>
            apiFetch<Product[]>(`/api/products?search=${encodeURIComponent(query)}`),
        trending: () => apiFetch<Product[]>("/api/products?trending=true"),
        bestSellers: () => apiFetch<Product[]>("/api/products?badge=bestseller"),
    },
    categories: {
        list: () => apiFetch<Category[]>("/api/categories"),
    },
    brands: {
        list: () => apiFetch<Brand[]>("/api/brands"),
    },
    testimonials: {
        list: () => apiFetch<Testimonial[]>("/api/testimonials"),
    },
    bundles: {
        forProduct: (productId: string) =>
            apiFetch<Product>(`/api/bundles/${productId}`),
    },
};
