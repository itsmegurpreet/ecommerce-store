import type { Product } from "@/types";
import { products as mockProducts } from "@/data/products";
import { productBundleMap } from "@/data/bundleMap";

/**
 * Toggle this flag to switch between mock data and real backend.
 * Set to `false` once a real API is available and fill in the
 * NEXT_PUBLIC_API_BASE_URL environment variable.
 */
const USE_MOCK_DATA = true;

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

/** Returns the bundle product for a given product ID, or null if none exists. */
export async function getBundleForProduct(productId: string): Promise<Product | null> {
    if (USE_MOCK_DATA) {
        const bundleId = productBundleMap[productId];
        if (!bundleId) return null;
        return mockProducts.find((p) => p.id === bundleId) ?? null;
    }
    const res = await fetch(`${API_BASE}/bundles/${productId}`, { next: { revalidate: 60 } });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to fetch bundle for product ${productId}: ${res.status}`);
    return res.json() as Promise<Product>;
}
