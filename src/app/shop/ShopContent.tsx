"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import type { Product } from "@/types";
import { ProductCard } from "@/components/sections/ProductCard";
import { ShopFilters } from "./ShopFilters";
import { ShopToolbar } from "./ShopToolbar";
import { SlidersHorizontal, X } from "lucide-react";

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

export interface FilterState {
    categories: string[];
    priceRange: [number, number];
    ratings: number | null;
    badges: string[];
    inStockOnly: boolean;
}

const PRODUCTS_PER_PAGE = 12;

function buildInitialFilters(defaultCategory?: string): FilterState {
    return {
        categories: defaultCategory ? [defaultCategory] : [],
        priceRange: [0, 50000],
        ratings: null,
        badges: [],
        inStockOnly: false,
    };
}

interface ShopContentProps {
    defaultCategory?: string;
}

export function ShopContent({ defaultCategory }: ShopContentProps) {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<FilterState>(() =>
        buildInitialFilters(defaultCategory),
    );
    const [sort, setSort] = useState<SortOption>("featured");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        apiClient.products.list().then(setAllProducts).catch(console.error);
    }, []);

    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filters.categories.length > 0) count++;
        if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
        if (filters.ratings !== null) count++;
        if (filters.badges.length > 0) count++;
        if (filters.inStockOnly) count++;
        return count;
    }, [filters]);

    const filteredProducts = useMemo(() => {
        let result = [...allProducts];

        // Category filter
        if (filters.categories.length > 0) {
            result = result.filter((p) => filters.categories.includes(p.categorySlug));
        }

        // Price filter
        result = result.filter(
            (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
        );

        // Rating filter
        if (filters.ratings !== null) {
            result = result.filter((p) => p.rating >= filters.ratings!);
        }

        // Badge filter
        if (filters.badges.length > 0) {
            result = result.filter((p) => p.badge && filters.badges.includes(p.badge));
        }

        // In stock filter
        if (filters.inStockOnly) {
            result = result.filter((p) => p.inStock);
        }

        // Sort
        switch (sort) {
            case "price-asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;
            case "newest":
                result.sort((a, b) => (b.badge === "new" ? 1 : 0) - (a.badge === "new" ? 1 : 0));
                break;
            default:
                // featured — bestsellers first
                result.sort(
                    (a, b) =>
                        (b.badge === "bestseller" ? 2 : b.badge === "new" ? 1 : 0) -
                        (a.badge === "bestseller" ? 2 : a.badge === "new" ? 1 : 0),
                );
        }

        return result;
    }, [filters, sort, allProducts]);

    // Reset to page 1 whenever filters or sort changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filters, sort]);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE,
    );

    const clearFilters = useCallback(() => {
        setFilters(buildInitialFilters(defaultCategory));
    }, [defaultCategory]);

    return (
        <div className="mx-auto max-w-7xl px-gutter pt-xl">
            <div className="flex gap-10 lg:gap-14">
                {/* Desktop Sidebar */}
                <aside className="hidden w-60 flex-shrink-0 pt-2 lg:block">
                    <ShopFilters filters={filters} setFilters={setFilters} />
                </aside>

                {/* Main Content */}
                <div className="min-w-0 flex-1">
                    <ShopToolbar
                        sort={sort}
                        setSort={setSort}
                        resultCount={filteredProducts.length}
                        activeFilterCount={activeFilterCount}
                        onClearFilters={clearFilters}
                        onOpenMobileFilters={() => setMobileFiltersOpen(true)}
                    />

                    {/* Product Grid */}
                    {paginatedProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
                                {paginatedProducts.map((product, i) => (
                                    <ProductCard key={product.id} product={product} index={i} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-16 mb-8 flex items-center justify-center gap-2">
                                    <button
                                        onClick={() =>
                                            setCurrentPage((p) => Math.max(1, p - 1))
                                        }
                                        disabled={currentPage === 1}
                                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-outline-variant/50 text-on-surface-variant transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-40"
                                        aria-label="Previous page"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                        (page) => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-md font-label-md text-label-md transition-colors ${
                                                    page === currentPage
                                                        ? "bg-primary text-on-primary"
                                                        : "border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container"
                                                }`}
                                                aria-label={`Page ${page}`}
                                                aria-current={
                                                    page === currentPage ? "page" : undefined
                                                }
                                            >
                                                {page}
                                            </button>
                                        ),
                                    )}

                                    <button
                                        onClick={() =>
                                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                                        }
                                        disabled={currentPage === totalPages}
                                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-outline-variant/50 text-on-surface-variant transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-40"
                                        aria-label="Next page"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

                            {totalPages <= 1 && <div className="pb-20" />}
                        </>
                    ) : (
                        <div className="py-32 text-center">
                            <p className="font-body-md text-on-surface-variant mb-md">
                                No products match your filters.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="font-label-md text-label-md cursor-pointer text-secondary underline underline-offset-4 transition-opacity hover:opacity-70"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {mobileFiltersOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-50 bg-black/30 lg:hidden"
                            onClick={() => setMobileFiltersOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            className="bg-surface border-outline-variant/30 fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] overflow-y-auto border-r lg:hidden"
                        >
                            <div className="border-outline-variant/30 flex items-center justify-between border-b px-5 py-4">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal className="h-4 w-4 text-on-surface-variant" />
                                    <span className="font-label-md text-label-md text-primary">Filters</span>
                                </div>
                                <button
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="cursor-pointer hover:bg-surface-container rounded-lg p-1.5 text-on-surface-variant transition-colors"
                                    aria-label="Close filters"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="px-5 py-6">
                                <ShopFilters filters={filters} setFilters={setFilters} />
                            </div>
                            <div className="bg-surface border-outline-variant/30 sticky bottom-0 flex gap-3 border-t px-5 py-4">
                                <button
                                    onClick={clearFilters}
                                    className="cursor-pointer border-outline-variant/50 hover:bg-surface-container flex-1 rounded-md border py-2.5 font-label-md text-label-md text-on-surface-variant transition-colors"
                                >
                                    Clear all
                                </button>
                                <button
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="cursor-pointer bg-primary flex-1 rounded-md py-2.5 font-label-md text-label-md text-on-primary transition-opacity hover:opacity-90"
                                >
                                    Show {filteredProducts.length} results
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
