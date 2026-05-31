"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Product } from "@/types";
import { apiClient } from "@/lib/api-client";

const STORAGE_KEY = "smartdeskhub_recently_viewed";
const MAX_ITEMS = 8;

interface RecentlyViewedContextValue {
    recentProducts: Product[];
    trackProduct: (id: string) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(null);

function loadIds(): string[] {
    if (typeof window === "undefined") return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
        return [];
    }
}

function saveIds(ids: string[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
        // ignore
    }
}

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
    const [ids, setIds] = useState<string[]>(() => loadIds());
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    useEffect(() => {
        apiClient.products.list().then(setAllProducts).catch(console.error);
    }, []);

    const trackProduct = useCallback((id: string) => {
        setIds((prev) => {
            const next = [id, ...prev.filter((i) => i !== id)].slice(0, MAX_ITEMS);
            saveIds(next);
            return next;
        });
    }, []);

    const recentProducts = ids
        .map((id) => allProducts.find((p) => p.id === id))
        .filter((p): p is Product => p !== undefined);

    return (
        <RecentlyViewedContext.Provider value={{ recentProducts, trackProduct }}>
            {children}
        </RecentlyViewedContext.Provider>
    );
}

export function useRecentlyViewed(): RecentlyViewedContextValue {
    const ctx = useContext(RecentlyViewedContext);
    if (!ctx) throw new Error("useRecentlyViewed must be used inside <RecentlyViewedProvider>");
    return ctx;
}
