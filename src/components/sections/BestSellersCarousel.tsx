"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export function BestSellersCarousel() {
    const [bestSellers, setBestSellers] = useState<Product[]>([]);

    useEffect(() => {
        apiClient.products.bestSellers().then(setBestSellers).catch(console.error);
    }, []);

    return (
        <section className="py-section px-gutter bg-surface-container-low">
            <div className="mx-auto max-w-7xl">
                <div className="mb-xxl flex items-end justify-between">
                    <div>
                        <span className="font-label-sm text-label-sm text-secondary mb-xs block tracking-[0.2em] uppercase">
                            Our Favorites
                        </span>
                        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
                            Bestsellers
                        </h2>
                    </div>
                    <Link
                        href="/shop"
                        className="font-label-md text-label-md text-primary border-primary/30 hover:border-primary border-b pb-1 tracking-widest uppercase transition-all"
                    >
                        View All
                    </Link>
                </div>

                <div className="gap-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {bestSellers.slice(0, 4).map((product, i) => (
                        <ProductCard key={product.id} product={product} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
