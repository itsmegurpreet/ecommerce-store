"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { Product } from "@/types";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function highlight(text: string, query: string): React.ReactNode {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
        <>
            {text.slice(0, idx)}
            <mark className="bg-transparent font-semibold text-primary">
                {text.slice(idx, idx + query.length)}
            </mark>
            {text.slice(idx + query.length)}
        </>
    );
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Load all products once when the modal first opens
    useEffect(() => {
        if (isOpen && allProducts.length === 0) {
            apiClient.products.list().then(setAllProducts).catch(console.error);
        }
    }, [isOpen, allProducts.length]);

    const results: Product[] = (() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return allProducts
            .filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    (p.brand ?? "").toLowerCase().includes(q),
            )
            .slice(0, 8);
    })();

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setQuery("");
        }
    }, [isOpen]);

    // Escape to close
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    // Prevent body scroll while open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleNavigate = useCallback(
        (slug: string) => {
            onClose();
            router.push(`/product/${slug}`);
        },
        [onClose, router],
    );

    const handleShopAll = useCallback(() => {
        onClose();
        router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    }, [onClose, router, query]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex flex-col items-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="mx-auto mt-16 w-full max-w-2xl px-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search input */}
                <div className="flex items-center gap-sm rounded-xl bg-surface shadow-2xl px-lg py-md">
                    <Search className="h-5 w-5 flex-shrink-0 text-on-surface-variant" />
                    <input
                        ref={inputRef}
                        type="search"
                        placeholder="Search for products, categories…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 bg-transparent font-body-lg text-primary placeholder:text-on-surface-variant/50 outline-none"
                        autoComplete="off"
                        spellCheck={false}
                    />
                    {query ? (
                        <button
                            onClick={() => setQuery("")}
                            className="cursor-pointer text-on-surface-variant transition-colors hover:text-primary"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    ) : (
                        <kbd className="hidden rounded border border-outline-variant/40 px-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant/60 sm:block">
                            Esc
                        </kbd>
                    )}
                </div>

                {/* Results */}
                {query.trim().length > 0 && (
                    <div className="mt-2 overflow-hidden rounded-xl bg-surface shadow-2xl">
                        {results.length > 0 ? (
                            <>
                                <ul>
                                    {results.map((product, i) => (
                                        <li key={product.id}>
                                            <button
                                                onClick={() => handleNavigate(product.slug)}
                                                className={`flex w-full cursor-pointer items-center gap-md px-lg py-sm transition-colors hover:bg-surface-container-low ${
                                                    i < results.length - 1
                                                        ? "border-b border-outline-variant/20"
                                                        : ""
                                                }`}
                                            >
                                                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-surface-container">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="48px"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1 text-left">
                                                    <p className="truncate font-body-md font-medium text-primary">
                                                        {highlight(product.name, query.trim())}
                                                    </p>
                                                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                                                        {product.category}
                                                    </p>
                                                </div>
                                                <p className="flex-shrink-0 font-semibold text-primary">
                                                    ₹{product.price.toLocaleString("en-IN")}
                                                </p>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={handleShopAll}
                                    className="flex w-full cursor-pointer items-center justify-center gap-xs border-t border-outline-variant/20 px-lg py-sm font-label-md text-label-md text-secondary transition-colors hover:bg-surface-container-low"
                                >
                                    See all results for &ldquo;{query.trim()}&rdquo;
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                            </>
                        ) : (
                            <div className="px-lg py-xl text-center">
                                <p className="font-body-md text-on-surface-variant">
                                    No products found for &ldquo;{query.trim()}&rdquo;
                                </p>
                                <Link
                                    href="/shop"
                                    onClick={onClose}
                                    className="mt-sm inline-block font-label-md text-label-md text-secondary underline underline-offset-4"
                                >
                                    Browse all products
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
