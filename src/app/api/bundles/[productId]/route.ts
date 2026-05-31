import { type NextRequest, NextResponse } from "next/server";
import { getBundleForProduct } from "@/lib/services/bundles.service";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ productId: string }> },
) {
    const { productId } = await params;
    try {
        const bundle = await getBundleForProduct(productId);
        if (!bundle) {
            return NextResponse.json({ error: "No bundle found for this product" }, { status: 404 });
        }
        return NextResponse.json(bundle);
    } catch (err) {
        console.error(`[GET /api/bundles/${productId}]`, err);
        return NextResponse.json({ error: "Failed to load bundle" }, { status: 500 });
    }
}
