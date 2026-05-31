import type { Testimonial } from "@/types";
import { testimonials as mockTestimonials } from "@/data/testimonials";

/**
 * Toggle this flag to switch between mock data and real backend.
 * Set to `false` once a real API is available and fill in the
 * NEXT_PUBLIC_API_BASE_URL environment variable.
 */
const USE_MOCK_DATA = true;

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function getTestimonials(): Promise<Testimonial[]> {
    if (USE_MOCK_DATA) {
        return mockTestimonials;
    }
    const res = await fetch(`${API_BASE}/testimonials`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Failed to fetch testimonials: ${res.status}`);
    return res.json() as Promise<Testimonial[]>;
}
