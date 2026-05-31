import type { Testimonial } from "@/types";
import { testimonials as mockTestimonials } from "@/data/testimonials";
import { USE_MOCK_DATA } from "@/lib/config";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function getTestimonials(): Promise<Testimonial[]> {
    if (USE_MOCK_DATA) {
        return mockTestimonials;
    }
    const res = await fetch(`${API_BASE}/testimonials`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Failed to fetch testimonials: ${res.status}`);
    return res.json() as Promise<Testimonial[]>;
}
