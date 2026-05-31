"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/types";

interface WishlistContextValue {
    items: Product[];
    isOpen: boolean;
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    toggleItem: (product: Product) => void;
    isWishlisted: (productId: string) => boolean;
    openWishlist: () => void;
    closeWishlist: () => void;
    totalItems: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "smartdeskhub_wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<Product[]>(() => {
        if (typeof window === "undefined") return [];
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? (JSON.parse(stored) as Product[]) : [];
        } catch {
            return [];
        }
    });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            // ignore write errors
        }
    }, [items]);

    const addItem = useCallback((product: Product) => {
        setItems((prev) => {
            if (prev.some((p) => p.id === product.id)) return prev;
            return [...prev, product];
        });
        setIsOpen(true);
    }, []);

    const removeItem = useCallback((productId: string) => {
        setItems((prev) => prev.filter((p) => p.id !== productId));
    }, []);

    const toggleItem = useCallback(
        (product: Product) => {
            setItems((prev) => {
                const exists = prev.some((p) => p.id === product.id);
                if (exists) return prev.filter((p) => p.id !== product.id);
                setIsOpen(true);
                return [...prev, product];
            });
        },
        [],
    );

    const isWishlisted = useCallback(
        (productId: string) => items.some((p) => p.id === productId),
        [items],
    );

    const openWishlist = useCallback(() => setIsOpen(true), []);
    const closeWishlist = useCallback(() => setIsOpen(false), []);

    return (
        <WishlistContext.Provider
            value={{
                items,
                isOpen,
                addItem,
                removeItem,
                toggleItem,
                isWishlisted,
                openWishlist,
                closeWishlist,
                totalItems: items.length,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
    return ctx;
}
