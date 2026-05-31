import type { Brand } from "@/types";
import { brands as mockBrands } from "@/data/brands";
import { USE_MOCK_DATA } from "@/lib/config";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function getBrands(): Promise<Brand[]> {
    if (USE_MOCK_DATA) {
        return mockBrands;
    }
    const res = await fetch(`${API_BASE}/brands`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Failed to fetch brands: ${res.status}`);
    return res.json() as Promise<Brand[]>;
}
