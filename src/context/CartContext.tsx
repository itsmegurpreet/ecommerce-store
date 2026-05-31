"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/types";

export interface CartItem {
    product: Product;
    quantity: number;
}

type CouponResult = "ok" | "invalid" | "already_applied";

interface ActiveCoupon {
    code: string;
    /** 0–100 percentage discount */
    percent: number;
}

interface CartContextValue {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    totalItems: number;
    totalPrice: number;
    coupon: ActiveCoupon | null;
    discountAmount: number;
    finalPrice: number;
    applyCoupon: (code: string) => CouponResult;
    removeCoupon: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "smartdeskhub_cart";
const COUPON_STORAGE_KEY = "smartdeskhub_coupon";

/** Demo coupon codes. In production these would be validated server-side. */
const VALID_COUPONS: Record<string, number> = {
    SMART10: 10,
    FIRST15: 15,
    SAVE20: 20,
    WELCOME: 5,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
    // Initialize from localStorage on first client render (lazy initializer is client-only)
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return [];
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? (JSON.parse(stored) as CartItem[]) : [];
        } catch {
            return [];
        }
    });
    const [isOpen, setIsOpen] = useState(false);
    const [coupon, setCoupon] = useState<ActiveCoupon | null>(() => {
        if (typeof window === "undefined") return null;
        try {
            const stored = localStorage.getItem(COUPON_STORAGE_KEY);
            return stored ? (JSON.parse(stored) as ActiveCoupon) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        try {
            if (coupon) {
                localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
            } else {
                localStorage.removeItem(COUPON_STORAGE_KEY);
            }
        } catch {
            // ignore
        }
    }, [coupon]);

    // Persist to localStorage on every items change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            // ignore write errors
        }
    }, [items]);

    const addItem = useCallback((product: Product) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.product.id === product.id);
            if (existing) {
                return prev.map((i) =>
                    i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
        setIsOpen(true);
    }, []);

    const removeItem = useCallback((productId: string) => {
        setItems((prev) => prev.filter((i) => i.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        setItems((prev) =>
            quantity <= 0
                ? prev.filter((i) => i.product.id !== productId)
                : prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
        );
    }, []);

    const clearCart = useCallback(() => setItems([]), []);
    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);

    const applyCoupon = useCallback((code: string): CouponResult => {
        const normalized = code.trim().toUpperCase();
        if (coupon?.code === normalized) return "already_applied";
        const percent = VALID_COUPONS[normalized];
        if (!percent) return "invalid";
        setCoupon({ code: normalized, percent });
        return "ok";
    }, [coupon]);

    const removeCoupon = useCallback(() => setCoupon(null), []);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const discountAmount = coupon ? Math.round(totalPrice * (coupon.percent / 100)) : 0;
    const finalPrice = totalPrice - discountAmount;

    return (
        <CartContext.Provider
            value={{
                items,
                isOpen,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                openCart,
                closeCart,
                totalItems,
                totalPrice,
                coupon,
                discountAmount,
                finalPrice,
                applyCoupon,
                removeCoupon,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextValue {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
    return ctx;
}
