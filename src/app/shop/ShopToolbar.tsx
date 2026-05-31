"use client";

import { SortOption } from "./ShopContent";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ShopToolbarProps {
    sort: SortOption;
    setSort: (sort: SortOption) => void;
    resultCount: number;
    activeFilterCount: number;
    onClearFilters: () => void;
    onOpenMobileFilters: () => void;
}

const sortOptions: { label: string; value: SortOption }[] = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Highest Rated", value: "rating" },
    { label: "Newest", value: "newest" },
];

export function ShopToolbar({
    sort,
    setSort,
    resultCount,
    activeFilterCount,
    onClearFilters,
    onOpenMobileFilters,
}: ShopToolbarProps) {
    const [sortOpen, setSortOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentSortLabel = sortOptions.find((o) => o.value === sort)?.label;

    return (
        <div className="flex items-center justify-between gap-4 pt-2 pb-xl">
            <div className="flex items-center gap-sm">
                {/* Mobile filter toggle */}
                <button
                    onClick={onOpenMobileFilters}
                    className="border-outline-variant/50 hover:bg-surface-container flex cursor-pointer items-center gap-sm rounded-md border px-md py-xs font-label-md text-label-md text-on-surface-variant transition-colors lg:hidden"
                >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    Filters
                    {activeFilterCount > 0 && (
                        <span className="bg-secondary text-on-secondary ml-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold">
                            {activeFilterCount}
                        </span>
                    )}
                </button>

                <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {resultCount} {resultCount === 1 ? "product" : "products"}
                </p>

                {activeFilterCount > 0 && (
                    <button
                        onClick={onClearFilters}
                        className="hidden cursor-pointer items-center gap-xs font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-primary sm:flex"
                    >
                        <X className="h-3 w-3" />
                        Clear filters
                    </button>
                )}
            </div>

            {/* Sort dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="border-outline-variant/50 hover:bg-surface-container flex cursor-pointer items-center gap-sm rounded-md border px-md py-xs font-label-md text-label-md text-on-surface-variant transition-colors"
                >
                    <span className="text-on-surface-variant/70 mr-0.5 hidden sm:inline">Sort:</span>
                    {currentSortLabel}
                    <ChevronDown
                        className={`h-3.5 w-3.5 text-on-surface-variant transition-transform duration-200 ${
                            sortOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {sortOpen && (
                    <div className="bg-surface border-outline-variant/30 absolute top-full right-0 z-30 mt-1.5 w-[200px] rounded-md border py-1.5 shadow-lg">
                        {sortOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    setSort(option.value);
                                    setSortOpen(false);
                                }}
                                className={`block w-full cursor-pointer px-md py-xs text-left font-body-md transition-colors ${
                                    sort === option.value
                                        ? "bg-surface-container font-medium text-primary"
                                        : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
