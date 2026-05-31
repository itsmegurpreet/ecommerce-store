"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Tag, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

const FREE_SHIPPING_THRESHOLD = 2999;
const SHIPPING_COST = 149;

export function CartDrawer() {
    const {
        items, isOpen, closeCart, removeItem, updateQuantity,
        totalPrice, totalItems, coupon, discountAmount, finalPrice,
        applyCoupon, removeCoupon,
    } = useCart();

    const [mounted, setMounted] = useState(false);
    const [couponInput, setCouponInput] = useState("");
    const [couponStatus, setCouponStatus] = useState<"idle" | "ok" | "invalid" | "already_applied">("idle");

    useEffect(() => { setMounted(true); }, []);

    const displayCount = mounted ? totalItems : 0;

    const handleApplyCoupon = () => {
        if (!couponInput.trim()) return;
        const result = applyCoupon(couponInput);
        setCouponStatus(result);
        if (result === "ok") setCouponInput("");
    };

    const shippingFee = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const toFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
    const progressPct = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);

    return (
        <>
            {/* Backdrop */}
            <div
                aria-hidden="true"
                className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                }`}
                onClick={closeCart}
            />

            {/* Drawer */}
            <aside
                aria-label="Shopping cart"
                className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-[26rem] flex-col bg-surface shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-outline-variant/30 px-lg py-md">
                    <div className="flex items-center gap-sm">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold text-primary">
                            Cart
                            {displayCount > 0 && (
                                <span className="ml-1.5 font-normal text-on-surface-variant">
                                    ({displayCount})
                                </span>
                            )}
                        </h2>
                    </div>
                    <button
                        onClick={closeCart}
                        className="cursor-pointer rounded p-xs text-on-surface-variant transition-colors hover:text-primary"
                        aria-label="Close cart"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Empty state */}
                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-md px-lg text-center">
                        <ShoppingBag className="h-14 w-14 text-outline-variant" />
                        <p className="font-body-md text-on-surface-variant">Nothing in here yet.</p>
                        <button
                            onClick={closeCart}
                            className="cursor-pointer font-label-md text-label-md text-secondary underline underline-offset-4 transition-opacity hover:opacity-70"
                        >
                            Browse products
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Items list */}
                        <ul className="flex-1 divide-y divide-outline-variant/20 overflow-y-auto px-lg">
                            {items.map((item) => (
                                <li key={item.product.id} className="flex gap-md py-lg">
                                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md bg-surface-container">
                                        <Image
                                            src={item.product.image}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </div>
                                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                                        <div className="flex items-start justify-between gap-xs">
                                            <Link
                                                href={`/product/${item.product.slug}`}
                                                onClick={closeCart}
                                                className="font-body-md font-medium leading-snug text-primary transition-opacity hover:opacity-70"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <button
                                                onClick={() => removeItem(item.product.id)}
                                                className="cursor-pointer flex-shrink-0 text-on-surface-variant transition-colors hover:text-primary"
                                                aria-label={`Remove ${item.product.name}`}
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            {/* Quantity stepper */}
                                            <div className="flex items-center rounded border border-outline-variant/50">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product.id,
                                                            item.quantity - 1,
                                                        )
                                                    }
                                                    className="cursor-pointer p-xs text-on-surface-variant transition-colors hover:text-primary"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="h-3.5 w-3.5" />
                                                </button>
                                                <span className="w-6 text-center text-sm font-medium text-primary">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product.id,
                                                            item.quantity + 1,
                                                        )
                                                    }
                                                    className="cursor-pointer p-xs text-on-surface-variant transition-colors hover:text-primary"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                            <p className="font-semibold text-primary">
                                                ₹
                                                {(item.product.price * item.quantity).toLocaleString(
                                                    "en-IN",
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Footer */}
                        <div className="space-y-md border-t border-outline-variant/30 px-lg pb-xl pt-md">
                            {/* Free shipping progress */}
                            <div className="rounded-md bg-surface-container-low px-md py-sm space-y-xs">
                                {toFreeShipping > 0 ? (
                                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                                        Add{" "}
                                        <span className="font-semibold text-primary">
                                            ₹{toFreeShipping.toLocaleString("en-IN")}
                                        </span>{" "}
                                        more for free shipping
                                    </p>
                                ) : (
                                    <p className="font-label-sm text-label-sm text-secondary font-semibold">
                                        You've unlocked free shipping!
                                    </p>
                                )}
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-outline-variant/30">
                                    <div
                                        className="h-full rounded-full bg-secondary transition-all duration-500"
                                        style={{ width: `${progressPct}%` }}
                                    />
                                </div>
                            </div>

                            {/* Coupon input */}
                            {coupon ? (
                                <div className="flex items-center justify-between rounded-md border border-secondary/40 bg-secondary/5 px-md py-sm">
                                    <div className="flex items-center gap-xs">
                                        <Tag className="h-3.5 w-3.5 text-secondary" />
                                        <span className="font-label-md text-label-md text-secondary">
                                            {coupon.code} — {coupon.percent}% off
                                        </span>
                                    </div>
                                    <button
                                        onClick={removeCoupon}
                                        className="cursor-pointer text-on-surface-variant transition-colors hover:text-primary"
                                        aria-label="Remove coupon"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-xs">
                                    <div className="flex gap-xs">
                                        <input
                                            type="text"
                                            value={couponInput}
                                            onChange={(e) => {
                                                setCouponInput(e.target.value.toUpperCase());
                                                setCouponStatus("idle");
                                            }}
                                            onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                                            placeholder="Coupon code"
                                            className="min-w-0 flex-1 rounded-md border border-outline-variant/50 bg-surface px-md py-sm font-label-md text-sm text-primary outline-none transition-colors placeholder:text-on-surface-variant/40 focus:border-primary"
                                        />
                                        <button
                                            onClick={handleApplyCoupon}
                                            className="cursor-pointer flex items-center gap-xs rounded-md border border-outline-variant/50 px-md py-sm font-label-md text-label-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                                        >
                                            Apply
                                            <ChevronRight className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                    {couponStatus === "invalid" && (
                                        <p className="font-label-sm text-label-sm text-error">Invalid coupon code.</p>
                                    )}
                                    {couponStatus === "already_applied" && (
                                        <p className="font-label-sm text-label-sm text-on-surface-variant">That coupon is already applied.</p>
                                    )}
                                </div>
                            )}

                            {/* Totals */}
                            <div className="space-y-xs">
                                <div className="flex items-center justify-between">
                                    <p className="font-body-md text-on-surface-variant">Subtotal</p>
                                    <p className="font-body-md text-primary">₹{totalPrice.toLocaleString("en-IN")}</p>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex items-center justify-between">
                                        <p className="font-body-md text-secondary">Discount ({coupon?.percent}%)</p>
                                        <p className="font-body-md text-secondary">−₹{discountAmount.toLocaleString("en-IN")}</p>
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <p className="font-body-md text-on-surface-variant">Shipping</p>
                                    <p className="font-body-md text-primary">
                                        {shippingFee === 0 ? (
                                            <span className="text-secondary">Free</span>
                                        ) : (
                                            `₹${shippingFee}`
                                        )}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between border-t border-outline-variant/20 pt-xs">
                                    <p className="font-body-lg font-semibold text-primary">Total</p>
                                    <p className="font-body-lg font-bold text-primary">
                                        ₹{(finalPrice + shippingFee).toLocaleString("en-IN")}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                onClick={closeCart}
                                className="block w-full rounded-md bg-secondary py-md text-center font-label-md text-label-md uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                            >
                                Checkout
                            </Link>
                            <button
                                onClick={closeCart}
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
