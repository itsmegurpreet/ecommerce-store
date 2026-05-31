"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { X, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
    const { isAuthenticated } = useAuth();
    const { items, removeItem } = useWishlist();
    const { addItem } = useCart();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/account/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return (
        <section className="bg-surface min-h-screen pb-xxl">
            <div className="border-b border-outline-variant/20 bg-surface-container-low">
                <div className="mx-auto max-w-7xl px-gutter py-xxl">
                    <Link
                        href="/account"
                        className="mb-md inline-flex items-center gap-xs font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
                    >
                        <ChevronLeft className="h-3.5 w-3.5" />
                        Account
                    </Link>
                    <p className="font-label-md text-label-md mb-sm uppercase tracking-widest text-secondary">
                        Saved items
                    </p>
                    <h1 className="font-serif text-headline-md font-semibold text-primary">
                        Your Wishlist
                    </h1>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-gutter pt-xl">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center gap-md py-section text-center">
                        <p className="font-body-md text-on-surface-variant">
                            Nothing saved to your wishlist yet.
                        </p>
                        <Link
                            href="/shop"
                            className="mt-sm inline-flex items-center rounded-md bg-secondary px-xl py-md font-label-md text-label-md uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {items.map((product) => (
                            <div
                                key={product.id}
                                className="group relative rounded-xl border border-outline-variant/30 bg-surface-container-low overflow-hidden"
                            >
                                <button
                                    onClick={() => removeItem(product.id)}
                                    className="absolute top-sm right-sm z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-on-surface-variant opacity-0 backdrop-blur transition-all group-hover:opacity-100 hover:text-primary"
                                    aria-label={`Remove ${product.name}`}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                                <Link href={`/product/${product.slug}`}>
                                    <div className="relative aspect-[4/3] overflow-hidden bg-white">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />
                                    </div>
                                </Link>
                                <div className="p-md">
                                    <Link href={`/product/${product.slug}`}>
                                        <h3 className="font-body-md font-medium text-primary transition-opacity hover:opacity-70">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <div className="mt-sm flex items-center justify-between gap-sm">
                                        <p className="font-semibold text-primary">
                                            ₹{product.price.toLocaleString("en-IN")}
                                        </p>
                                        {product.inStock ? (
                                            <button
                                                onClick={() => {
                                                    addItem(product);
                                                    removeItem(product.id);
                                                }}
                                                className="cursor-pointer flex items-center gap-xs rounded-md bg-secondary px-sm py-xs font-label-sm text-label-sm text-white transition-opacity hover:opacity-90"
                                            >
                                                <ShoppingBag className="h-3 w-3" />
                                                Add to Cart
                                            </button>
                                        ) : (
                                            <span className="font-label-sm text-label-sm text-on-surface-variant/60">
                                                Out of stock
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
