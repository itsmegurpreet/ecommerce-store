"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Product, ProductVariant } from "@/types";
import { useCart } from "@/context/CartContext";

export function ProductActions({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
        product.variants?.[0] ?? null,
    );
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const maxQty =
        product.stockCount !== undefined
            ? Math.min(product.stockCount, 10)
            : 10;

    const handleAdd = () => {
        for (let i = 0; i < quantity; i++) addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="space-y-lg">
            {/* Variant selector */}
            {product.variants && product.variants.length > 0 && (
                <div>
                    <p className="font-label-md text-label-md mb-sm text-on-surface-variant">
                        Colour:{" "}
                        <span className="font-semibold text-primary">{selectedVariant?.name}</span>
                    </p>
                    <div className="flex flex-wrap gap-sm">
                        {product.variants.map((v) => (
                            <button
                                key={v.name}
                                onClick={() => setSelectedVariant(v)}
                                title={v.name}
                                aria-label={`Select ${v.name}`}
                                aria-pressed={selectedVariant?.name === v.name}
                                className={`cursor-pointer h-8 w-8 rounded-full border-2 transition-all ${
                                    selectedVariant?.name === v.name
                                        ? "border-primary scale-110 shadow-sm"
                                        : "border-outline-variant/50 hover:border-primary"
                                }`}
                                style={{ backgroundColor: v.value }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Quantity */}
            <div>
                <p className="font-label-md text-label-md mb-sm text-on-surface-variant">
                    Quantity
                </p>
                <div className="flex items-center rounded-md border border-outline-variant/50 w-fit">
                    <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="cursor-pointer px-md py-sm text-on-surface-variant transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Decrease quantity"
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-semibold text-primary">{quantity}</span>
                    <button
                        onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                        disabled={quantity >= maxQty}
                        className="cursor-pointer px-md py-sm text-on-surface-variant transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Increase quantity"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Add to cart */}
            <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex w-full cursor-pointer items-center justify-center gap-sm rounded-md py-md font-label-md text-label-md uppercase tracking-widest transition-all ${
                    !product.inStock
                        ? "cursor-not-allowed bg-surface-container text-on-surface-variant"
                        : added
                          ? "bg-secondary/80 text-on-secondary"
                          : "bg-secondary text-on-secondary hover:opacity-90 active:scale-[0.98]"
                }`}
            >
                {!product.inStock ? (
                    "Out of Stock"
                ) : added ? (
                    "Added to Cart ✓"
                ) : (
                    <>
                        <ShoppingBag className="h-4 w-4" />
                        Add to Cart
                    </>
                )}
            </button>
        </div>
    );
}
