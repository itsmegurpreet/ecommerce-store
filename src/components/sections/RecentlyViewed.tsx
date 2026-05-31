"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";

interface Props {
    /** ID of the product currently being viewed — excluded from the strip */
    currentProductId: string;
}

export function RecentlyViewed({ currentProductId }: Props) {
    const { recentProducts, trackProduct } = useRecentlyViewed();

    // Record this visit on mount
    useEffect(() => {
        trackProduct(currentProductId);
    }, [currentProductId, trackProduct]);

    const strip = recentProducts.filter((p) => p.id !== currentProductId).slice(0, 6);

    if (strip.length === 0) return null;

    return (
        <section className="mt-section">
            <h2 className="font-serif text-headline-md font-semibold text-primary mb-xl">
                Recently Viewed
            </h2>
            <div className="flex gap-md overflow-x-auto pb-sm scrollbar-hide">
                {strip.map((product) => {
                    const discount = product.originalPrice
                        ? Math.round((1 - product.price / product.originalPrice) * 100)
                        : null;

                    return (
                        <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="group flex-shrink-0 w-[160px] space-y-sm"
                        >
                            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface-container-low">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    sizes="160px"
                                />
                                {discount && (
                                    <span className="absolute top-xs left-xs rounded-full bg-secondary px-xs py-[2px] font-label-sm text-[10px] text-white">
                                        −{discount}%
                                    </span>
                                )}
                            </div>
                            <div>
                                <p className="font-label-md text-label-md text-primary leading-snug line-clamp-2 group-hover:opacity-70 transition-opacity">
                                    {product.name}
                                </p>
                                <div className="flex items-baseline gap-xs mt-[2px]">
                                    <p className="font-label-md text-label-md font-semibold text-primary">
                                        ₹{product.price.toLocaleString("en-IN")}
                                    </p>
                                    {product.originalPrice && (
                                        <p className="font-label-sm text-label-sm text-on-surface-variant line-through">
                                            ₹{product.originalPrice.toLocaleString("en-IN")}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
