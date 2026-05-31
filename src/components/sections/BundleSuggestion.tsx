import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";
import { getBundleForProduct } from "@/lib/services/bundles.service";
import { Product } from "@/types";

interface Props {
    product: Product;
}

export async function BundleSuggestion({ product }: Props) {
    const bundle = await getBundleForProduct(product.id);
    if (!bundle || !bundle.originalPrice) return null;

    const savings = bundle.originalPrice - bundle.price;
    const savingsPct = Math.round((savings / bundle.originalPrice) * 100);

    return (
        <div className="rounded-xl border border-secondary/25 bg-secondary/5 p-lg">
            <div className="flex items-start gap-sm mb-md">
                <Package className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                <p className="font-label-md text-label-md text-secondary uppercase tracking-wider">
                    This item is part of a bundle
                </p>
            </div>

            <Link href={`/product/${bundle.slug}`} className="group flex gap-md items-center">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-surface-container">
                    <Image
                        src={bundle.image}
                        alt={bundle.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="80px"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-body-md font-medium text-primary leading-snug group-hover:opacity-70 transition-opacity">
                        {bundle.name}
                    </p>
                    <div className="flex items-baseline gap-sm mt-xs flex-wrap">
                        <p className="font-label-md text-label-md font-bold text-primary">
                            ₹{bundle.price.toLocaleString("en-IN")}
                        </p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant line-through">
                            ₹{bundle.originalPrice.toLocaleString("en-IN")}
                        </p>
                        <span className="rounded-full bg-secondary px-sm py-[2px] font-label-sm text-[11px] text-white">
                            Save {savingsPct}%
                        </span>
                    </div>
                    <p className="font-label-sm text-label-sm text-secondary mt-xs">
                        You save ₹{savings.toLocaleString("en-IN")} vs buying separately →
                    </p>
                </div>
            </Link>
        </div>
    );
}
