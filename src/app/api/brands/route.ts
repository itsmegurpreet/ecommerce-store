import { NextResponse } from "next/server";
import { getBrands } from "@/lib/services/brands.service";

export async function GET() {
    try {
        return NextResponse.json(await getBrands());
    } catch (err) {
        console.error("[GET /api/brands]", err);
        return NextResponse.json({ error: "Failed to load brands" }, { status: 500 });
    }
}
