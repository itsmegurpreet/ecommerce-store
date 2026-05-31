"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
    product: Product;
    index?: number;
}

export function ProductCard({ product }: ProductCardProps) {
    const [added, setAdded] = useState(false);
    const filledStars = Math.round(product.rating);
    const isExternal = product.image.startsWith("http");
    const { addItem } = useCart();
    const { toggleItem, isWishlisted } = useWishlist();
    const wishlisted = isWishlisted(product.id);

    const handleQuickAdd = () => {
        addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="group">
            <div className="mb-lg relative aspect-[4/5] overflow-hidden rounded-lg bg-white shadow-sm">
                <Link href={`/product/${product.slug}`} className="absolute inset-0 z-0">
                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            loading="lazy"
                            unoptimized={isExternal}
                        />
                    ) : (
                        <div className="bg-surface-container-high absolute inset-0" />
                    )}
                </Link>

                {/* Wishlist */}
                <button
                    onClick={() => toggleItem(product)}
                    className="top-md right-md text-primary absolute z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 opacity-0 backdrop-blur transition-all group-hover:opacity-100 hover:scale-110"
                    aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    aria-pressed={wishlisted}
                >
                    <svg
                        className="h-5 w-5"
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

                {/* Quick Add */}
                <div className="p-lg absolute bottom-0 z-10 w-full translate-y-full bg-white/95 backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0">
                    <button
                        onClick={handleQuickAdd}
                        className="py-md bg-primary font-label-md text-label-md hover:bg-on-surface-variant w-full cursor-pointer rounded-lg tracking-widest text-white uppercase transition-colors"
                    >
                        {added ? "ADDED ✓" : "Quick Add"}
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="mb-sm flex flex-col gap-[3px]">
                <Link href={`/product/${product.slug}`}>
                    <h4 className="text-primary text-[17px] leading-snug font-medium transition-opacity hover:opacity-70">
                        {product.name}
                    </h4>
                </Link>
                {/* Stars */}
                <div className="text-secondary flex">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            className="h-[13px] w-[13px]"
                            fill={i < filledStars ? "currentColor" : "none"}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                        </svg>
                    ))}
                </div>
            </div>
            <p className="font-body-md text-on-surface-variant mt-xs mb-sm">
                {product.brand || product.category}
            </p>
            <p className="font-body-lg text-primary font-bold">
                ₹{product.price.toLocaleString("en-IN")}
            </p>
        </div>
    );
}
