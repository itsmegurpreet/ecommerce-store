import { type NextRequest, NextResponse } from "next/server";
import { getProducts, getBestSellers, getTrendingProducts } from "@/lib/services/products.service";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const badge = searchParams.get("badge");
    const trending = searchParams.get("trending");
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const id = searchParams.get("id");
    const limitParam = searchParams.get("limit");

    try {
        if (trending === "true") {
            return NextResponse.json(await getTrendingProducts());
        }

        if (badge === "bestseller") {
            return NextResponse.json(await getBestSellers());
        }

        let products = await getProducts();

        if (id) {
            products = products.filter((p) => p.id === id);
        }

        if (category) {
            products = products.filter((p) => p.categorySlug === category);
        }

        if (search) {
            const q = search.toLowerCase();
            products = products.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q),
            );
        }

        if (badge) {
            products = products.filter((p) => p.badge === badge);
        }

        if (limitParam) {
            const limit = parseInt(limitParam, 10);
            if (!isNaN(limit) && limit > 0) {
                products = products.slice(0, limit);
            }
        }

        return NextResponse.json(products);
    } catch (err) {
        console.error("[GET /api/products]", err);
        return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
    }
}
