"use client";

import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export function WishlistDrawer() {
    const { items, isOpen, closeWishlist, removeItem } = useWishlist();
    const { addItem } = useCart();

    return (
        <>
            {/* Backdrop */}
            <div
                aria-hidden="true"
                className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                }`}
                onClick={closeWishlist}
            />

            {/* Drawer */}
            <aside
                aria-label="Wishlist"
                className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-[26rem] flex-col bg-surface shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-outline-variant/30 px-lg py-md">
                    <div className="flex items-center gap-sm">
                        <Heart className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold text-primary">
                            Wishlist
                            {items.length > 0 && (
                                <span className="ml-1.5 font-normal text-on-surface-variant">
                                    ({items.length})
                                </span>
                            )}
                        </h2>
                    </div>
                    <button
                        onClick={closeWishlist}
                        className="cursor-pointer rounded p-xs text-on-surface-variant transition-colors hover:text-primary"
                        aria-label="Close wishlist"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Empty state */}
                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-md px-lg text-center">
                        <Heart className="h-14 w-14 text-outline-variant" />
                        <p className="font-body-md text-on-surface-variant">
                            Nothing saved yet.
                        </p>
                        <button
                            onClick={closeWishlist}
                            className="cursor-pointer font-label-md text-label-md text-secondary underline underline-offset-4 transition-opacity hover:opacity-70"
                        >
                            Browse products
                        </button>
                    </div>
                ) : (
                    <>
                        <ul className="flex-1 divide-y divide-outline-variant/20 overflow-y-auto px-lg">
                            {items.map((product) => (
                                <li key={product.id} className="flex gap-md py-lg">
                                    <Link
                                        href={`/product/${product.slug}`}
                                        onClick={closeWishlist}
                                        className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md bg-surface-container"
                                    >
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-opacity hover:opacity-80"
                                            sizes="80px"
                                        />
                                    </Link>
                                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                                        <div className="flex items-start justify-between gap-xs">
                                            <Link
                                                href={`/product/${product.slug}`}
                                                onClick={closeWishlist}
                                                className="font-body-md font-medium leading-snug text-primary transition-opacity hover:opacity-70"
                                            >
                                                {product.name}
                                            </Link>
                                            <button
                                                onClick={() => removeItem(product.id)}
                                                className="cursor-pointer flex-shrink-0 text-on-surface-variant transition-colors hover:text-primary"
                                                aria-label={`Remove ${product.name} from wishlist`}
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between gap-sm">
                                            <p className="font-semibold text-primary">
                                                ₹{product.price.toLocaleString("en-IN")}
                                            </p>
                                            {product.inStock ? (
                                                <button
                                                    onClick={() => {
                                                        addItem(product);
                                                        removeItem(product.id);
                                                        closeWishlist();
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
                                </li>
                            ))}
                        </ul>

                        <div className="border-t border-outline-variant/30 px-lg pb-xl pt-md">
                            <button
                                onClick={closeWishlist}
                                className="cursor-pointer w-full rounded-md border border-outline-variant/50 py-sm text-center font-label-md text-label-md uppercase tracking-widest text-on-surface-variant transition-colors hover:bg-surface-container"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
}
