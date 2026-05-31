"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

function NewArrivalCard({
    product,
    featured = false,
}: {
    product: Product;
    featured?: boolean;
}) {
    const { addItem } = useCart();
    const { toggleItem, isWishlisted } = useWishlist();
    const wishlisted = isWishlisted(product.id);

    return (
        <div className="group relative h-full w-full overflow-hidden rounded-xl bg-surface-container">
            {/* Full-cover nav link */}
            <Link
                href={`/product/${product.slug}`}
                className="absolute inset-0 z-0"
                aria-label={product.name}
            >
                <Image
                    src={product.image}
                    alt={`${product.name} — ${product.brand ?? product.category}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes={
                        featured
                            ? "(max-width: 1024px) 100vw, 58vw"
                            : "(max-width: 1024px) 50vw, 21vw"
                    }
                    loading="lazy"
                />
                {/* Two-stop scrim: strong at bottom for text, light at top */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/0" />
            </Link>

            {/* Wishlist */}
            <button
                onClick={() => toggleItem(product)}
                className="absolute top-md right-md z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:scale-110"
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wishlisted}
            >
                <svg
                    className="h-3.5 w-3.5 text-primary"
                    fill={wishlisted ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
            </button>

            {/* Info overlay */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-lg">
                <p className="font-label-sm text-label-sm mb-xs uppercase tracking-[0.15em] text-white/55">
                    {product.category}
                </p>
                <div className="flex items-end justify-between gap-sm">
                    <div className="min-w-0">
                        <p
                            className={`font-semibold leading-snug text-white ${featured ? "text-xl" : "text-[0.9375rem]"}`}
                            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
                        >
                            {product.name}
                        </p>
                        <p className="font-label-md text-label-md mt-xs text-white/75">
                            ₹{product.price.toLocaleString("en-IN")}
                        </p>
                    </div>
                    <button
                        onClick={() => addItem(product)}
                        className="shrink-0 cursor-pointer rounded-full bg-white/95 px-md py-sm font-label-sm text-label-sm text-primary shadow-sm transition-all hover:bg-secondary hover:text-white"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export function NewArrivalsSection() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        apiClient.products
            .list()
            .then((all) => setProducts(all.filter((p) => p.badge === "new").slice(0, 5)))
            .catch(console.error);
    }, []);

    if (products.length === 0) return null;

    const [featured, ...rest] = products;

    return (
        <section className="py-section px-gutter border-t border-outline-variant/10">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-xl flex items-center justify-between gap-xl">
                    <div className="flex items-center gap-xl min-w-0">
                        <div className="shrink-0">
                            <span className="font-label-sm text-label-sm text-secondary mb-xs block tracking-[0.2em] uppercase">
                                Just Landed
                            </span>
                            <h2 className="font-serif text-[2.5rem] font-semibold leading-none tracking-tight text-primary md:text-[3.25rem]">
                                New In
                            </h2>
                        </div>
                        {/* Decorative rule extending from the title */}
                        <div className="hidden h-px flex-1 bg-outline-variant/50 md:block" />
                    </div>
                    <Link
                        href="/shop?badge=new"
                        className="font-label-md text-label-md shrink-0 flex items-center gap-xs text-primary border-b border-primary/30 pb-1 tracking-widest uppercase transition-all hover:border-primary"
                    >
                        All new arrivals
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                {/* Grid — fixed height on desktop so both sides align perfectly */}
                <div className="flex flex-col gap-md lg:h-[540px] lg:flex-row">
                    {/* Featured — 58% width */}
                    <div className="h-72 shrink-0 lg:h-full lg:w-[58%]">
                        <NewArrivalCard product={featured} featured />
                    </div>

                    {/* 2×2 — flex-1 fills remaining width, grid-rows-2 splits height equally */}
                    {rest.length > 0 && (
                        <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-md">
                            {rest.map((product) => (
                                <NewArrivalCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

