"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function TrendingProducts() {
    const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

    useEffect(() => {
        apiClient.products.trending().then(setTrendingProducts).catch(console.error);
    }, []);

    return (
        <section className="bg-muted/30 py-20 sm:py-28">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <p className="text-muted-foreground/70 mb-3 text-[12px] font-medium tracking-widest uppercase">
                            Trending Now
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            What people are buying
                        </h2>
                    </div>
                    <Link
                        href="/shop"
                        className="text-muted-foreground hover:text-foreground hidden items-center gap-1.5 text-[14px] transition-colors sm:flex"
                    >
                        Shop all
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
                    {trendingProducts.map((product, i) => (
                        <ProductCard key={product.id} product={product} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
