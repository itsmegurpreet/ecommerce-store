import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/services/testimonials.service";

export async function GET() {
    try {
        return NextResponse.json(await getTestimonials());
    } catch (err) {
        console.error("[GET /api/testimonials]", err);
        return NextResponse.json({ error: "Failed to load testimonials" }, { status: 500 });
    }
}
