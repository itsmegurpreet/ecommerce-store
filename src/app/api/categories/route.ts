import { NextResponse } from "next/server";
import { getCategories } from "@/lib/services/categories.service";

export async function GET() {
    try {
        return NextResponse.json(await getCategories());
    } catch (err) {
        console.error("[GET /api/categories]", err);
        return NextResponse.json({ error: "Failed to load categories" }, { status: 500 });
    }
}
