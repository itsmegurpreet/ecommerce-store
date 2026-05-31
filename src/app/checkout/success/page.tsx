"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutSuccessPage() {
    const { clearCart } = useCart();
    const cleared = useRef(false);

    useEffect(() => {
        if (!cleared.current) {
            cleared.current = true;
            clearCart();
        }
    }, [clearCart]);

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-lg px-gutter py-xl text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                <svg
                    className="h-8 w-8 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>
            <div className="space-y-sm">
                <h1 className="font-serif text-[32px] leading-tight font-semibold text-primary md:text-headline-lg">
                    Payment Successful
                </h1>
                <p className="font-body-md text-on-surface-variant mx-auto max-w-96">
                    Your order is confirmed. A receipt has been sent to your email. Your items
                    will arrive in 3–5 business days.
                </p>
            </div>
            <Link
                href="/shop"
                className="rounded-md bg-primary px-xl py-md font-label-md text-label-md uppercase tracking-widest text-white transition-opacity hover:opacity-80"
            >
                Continue Shopping
            </Link>
        </div>
    );
}
