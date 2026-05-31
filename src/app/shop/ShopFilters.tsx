"use client";

import { FilterState } from "./ShopContent";
import { Star, ChevronDown } from "lucide-react";
import { useState } from "react";

interface ShopFiltersProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

// Slugs must match products.ts categorySlug values exactly
const categories = [
    { label: "Workspace", value: "workspace" },
    { label: "Travel Gear", value: "travel-gear" },
    { label: "Tech", value: "tech" },
    { label: "Accessories", value: "accessories" },
    { label: "Bundles", value: "bundles" },
];

// INR price ranges covering the ₹2,499–₹28,990 product catalogue
const priceRanges = [
    { label: "Under ₹3,000", min: 0, max: 2999 },
    { label: "₹3,000 – ₹8,000", min: 3000, max: 8000 },
    { label: "₹8,000 – ₹15,000", min: 8000, max: 15000 },
    { label: "₹15,000 – ₹25,000", min: 15000, max: 25000 },
    { label: "Over ₹25,000", min: 25000, max: 50000 },
];

const badges = [
    { label: "New Arrivals", value: "new" },
    { label: "Bestsellers", value: "bestseller" },
];

function FilterSection({
    title,
    defaultOpen = true,
    children,
}: {
    title: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="mb-md border-b border-outline-variant/30 pb-md last:mb-0 last:border-none last:pb-0">
            <button
                onClick={() => setOpen(!open)}
                className="mb-sm flex w-full cursor-pointer items-center justify-between text-left"
            >
                <span className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
                    {title}
                </span>
                <ChevronDown
                    className={`h-3.5 w-3.5 text-on-surface-variant transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>
            {open && <div>{children}</div>}
        </div>
    );
}

export function ShopFilters({ filters, setFilters }: ShopFiltersProps) {
    const toggleCategory = (slug: string) => {
        setFilters((prev) => ({
            ...prev,
            categories: prev.categories.includes(slug)
                ? prev.categories.filter((c) => c !== slug)
                : [...prev.categories, slug],
        }));
    };

    const setPriceRange = (min: number, max: number) => {
        setFilters((prev) => {
            const isSame = prev.priceRange[0] === min && prev.priceRange[1] === max;
            return { ...prev, priceRange: isSame ? [0, 50000] : [min, max] };
        });
    };

    const setRating = (rating: number) => {
        setFilters((prev) => ({
            ...prev,
            ratings: prev.ratings === rating ? null : rating,
        }));
    };

    const toggleBadge = (badge: string) => {
        setFilters((prev) => ({
            ...prev,
            badges: prev.badges.includes(badge)
                ? prev.badges.filter((b) => b !== badge)
                : [...prev.badges, badge],
        }));
    };

    const activeItemCls = "bg-primary text-on-primary font-medium";
    const inactiveItemCls =
        "text-on-surface-variant hover:text-on-surface hover:bg-surface-container";

    return (
        <nav aria-label="Product filters">
            {/* Category */}
            <FilterSection title="Category">
                <div className="space-y-0.5">
                    {categories.map((cat) => {
                        const active = filters.categories.includes(cat.value);
                        return (
                            <button
                                key={cat.value}
                                onClick={() => toggleCategory(cat.value)}
                                className={`block w-full cursor-pointer rounded-md px-sm py-xs text-left font-body-md transition-colors ${
                                    active ? activeItemCls : inactiveItemCls
                                }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Price */}
            <FilterSection title="Price">
                <div className="space-y-0.5">
                    {priceRanges.map((range) => {
                        const active =
                            filters.priceRange[0] === range.min &&
                            filters.priceRange[1] === range.max;
                        return (
                            <button
                                key={range.label}
                                onClick={() => setPriceRange(range.min, range.max)}
                                className={`block w-full cursor-pointer rounded-md px-sm py-xs text-left font-body-md transition-colors ${
                                    active ? activeItemCls : inactiveItemCls
                                }`}
                            >
                                {range.label}
                            </button>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Rating */}
            <FilterSection title="Rating" defaultOpen={false}>
                <div className="space-y-0.5">
                    {[4, 3].map((rating) => {
                        const active = filters.ratings === rating;
                        return (
                            <button
                                key={rating}
                                onClick={() => setRating(rating)}
                                className={`flex w-full cursor-pointer items-center gap-xs rounded-md px-sm py-xs text-left font-body-md transition-colors ${
                                    active ? activeItemCls : inactiveItemCls
                                }`}
                            >
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-3 w-3 ${
                                                i < rating
                                                    ? active
                                                        ? "fill-on-primary text-on-primary"
                                                        : "fill-secondary text-secondary"
                                                    : active
                                                      ? "fill-on-primary/30 text-on-primary/30"
                                                      : "fill-outline-variant text-outline-variant"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span>& up</span>
                            </button>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Tags */}
            <FilterSection title="Tags" defaultOpen={false}>
                <div className="space-y-0.5">
                    {badges.map((badge) => {
                        const active = filters.badges.includes(badge.value);
                        return (
                            <label
                                key={badge.value}
                                className={`flex cursor-pointer items-center gap-sm rounded-md px-sm py-xs font-body-md transition-colors ${
                                    active ? activeItemCls : inactiveItemCls
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={active}
                                    onChange={() => toggleBadge(badge.value)}
                                    className="h-3.5 w-3.5 rounded accent-primary border-outline-variant"
                                />
                                {badge.label}
                            </label>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Availability */}
            <FilterSection title="Availability" defaultOpen={false}>
                <label
                    className={`flex cursor-pointer items-center gap-sm rounded-md px-sm py-xs font-body-md transition-colors ${
                        filters.inStockOnly ? activeItemCls : inactiveItemCls
                    }`}
                >
                    <input
                        type="checkbox"
                        checked={filters.inStockOnly}
                        onChange={() =>
                            setFilters((prev) => ({ ...prev, inStockOnly: !prev.inStockOnly }))
                        }
                        className="h-3.5 w-3.5 rounded accent-primary border-outline-variant"
                    />
                    In stock only
                </label>
            </FilterSection>
        </nav>
    );
}
