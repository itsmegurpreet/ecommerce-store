"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Package, ChevronLeft, RotateCcw, ShoppingCart, ChevronDown, ChevronUp, X, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { apiClient } from "@/lib/api-client";
import type { Product } from "@/types";

// ─── Demo order data ──────────────────────────────────────────────────────────
// In production these would come from a backend API.
const DEMO_ORDERS = [
    {
        id: "UC-2026-004821",
        date: "25 May 2026",
        status: "Delivered" as const,
        total: 13498,
        shipping: 0,
        items: [
            { productId: "3", quantity: 1 },
            { productId: "1", quantity: 1 },
        ],
    },
    {
        id: "UC-2026-003910",
        date: "10 May 2026",
        status: "Delivered" as const,
        total: 8999,
        shipping: 0,
        items: [
            { productId: "5", quantity: 1 },
        ],
    },
    {
        id: "UC-2026-003145",
        date: "28 Apr 2026",
        status: "Delivered" as const,
        total: 2599,
        shipping: 149,
        items: [
            { productId: "25", quantity: 1 },
            { productId: "26", quantity: 1 },
        ],
    },
];

const STATUS_COLORS: Record<string, string> = {
    Delivered: "bg-secondary/10 text-secondary",
    Shipped: "bg-blue-50 text-blue-700",
    Processing: "bg-amber-50 text-amber-700",
    Cancelled: "bg-error/10 text-error",
};

const RETURN_REASONS = [
    "Item arrived damaged",
    "Wrong item delivered",
    "Item not as described",
    "Changed my mind",
    "Defective / not working",
    "Other",
];

type ReturnState = "idle" | "selecting" | "submitted";

interface ReturnForm {
    orderId: string;
    selectedItems: string[];
    reason: string;
    comments: string;
}

export default function OrdersPage() {
    const { isAuthenticated } = useAuth();
    const { addItem } = useCart();
    const router = useRouter();
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [returnState, setReturnState] = useState<ReturnState>("idle");
    const [returnForm, setReturnForm] = useState<ReturnForm>({ orderId: "", selectedItems: [], reason: "", comments: "" });
    const [reorderedId, setReorderedId] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) router.replace("/account/login");
    }, [isAuthenticated, router]);

    useEffect(() => {
        apiClient.products.list().then(setAllProducts).catch(console.error);
    }, []);

    if (!isAuthenticated) return null;

    const handleReorder = (order: typeof DEMO_ORDERS[0]) => {
        order.items.forEach(({ productId, quantity }) => {
            const p = allProducts.find((pr) => pr.id === productId);
            if (p) for (let i = 0; i < quantity; i++) addItem(p);
        });
        setReorderedId(order.id);
        setTimeout(() => setReorderedId(null), 3000);
    };

    const startReturn = (orderId: string) => {
        setReturnForm({ orderId, selectedItems: [], reason: "", comments: "" });
        setReturnState("selecting");
    };

    const toggleReturnItem = (productId: string) => {
        setReturnForm((prev) => ({
            ...prev,
            selectedItems: prev.selectedItems.includes(productId)
                ? prev.selectedItems.filter((id) => id !== productId)
                : [...prev.selectedItems, productId],
        }));
    };

    const submitReturn = (e: React.FormEvent) => {
        e.preventDefault();
        setReturnState("submitted");
    };

    const returnOrder = DEMO_ORDERS.find((o) => o.id === returnForm.orderId);

    return (
        <section className="bg-surface min-h-screen pb-xxl">
            <div className="border-b border-outline-variant/20 bg-surface-container-low">
                <div className="mx-auto max-w-7xl px-gutter py-xxl">
                    <Link href="/account" className="mb-md inline-flex items-center gap-xs font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary">
                        <ChevronLeft className="h-3.5 w-3.5" />Account
                    </Link>
                    <p className="font-label-md text-label-md mb-sm uppercase tracking-widest text-secondary">History</p>
                    <h1 className="font-serif text-headline-md font-semibold text-primary">Your Orders</h1>
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-gutter pt-xl space-y-md">
                {DEMO_ORDERS.map((order) => {
                    const isExpanded = expandedOrder === order.id;
                    const isReordered = reorderedId === order.id;

                    return (
                        <div key={order.id} className="rounded-xl border border-outline-variant/30 bg-surface-container-low overflow-hidden">
                            {/* Order header */}
                            <div className="flex flex-wrap items-center gap-md p-lg">
                                <div className="flex-1 min-w-0 space-y-xs">
                                    <div className="flex items-center gap-sm flex-wrap">
                                        <p className="font-label-md text-label-md font-semibold text-primary">{order.id}</p>
                                        <span className={`rounded-full px-sm py-[2px] font-label-sm text-[11px] ${STATUS_COLORS[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="font-label-sm text-label-sm text-on-surface-variant">{order.date} · ₹{order.total.toLocaleString("en-IN")}</p>
                                </div>
                                <div className="flex items-center gap-sm flex-shrink-0">
                                    {/* Reorder */}
                                    <button
                                        onClick={() => handleReorder(order)}
                                        className="cursor-pointer flex items-center gap-xs rounded-md border border-outline-variant/50 px-md py-xs font-label-sm text-label-sm text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                                    >
                                        {isReordered ? <Check className="h-3.5 w-3.5 text-secondary" /> : <ShoppingCart className="h-3.5 w-3.5" />}
                                        {isReordered ? "Added to cart" : "Reorder"}
                                    </button>
                                    {/* Return */}
                                    <button
                                        onClick={() => startReturn(order.id)}
                                        className="cursor-pointer flex items-center gap-xs rounded-md border border-outline-variant/50 px-md py-xs font-label-sm text-label-sm text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                                    >
                                        <RotateCcw className="h-3.5 w-3.5" />
                                        Return
                                    </button>
                                    {/* Expand toggle */}
                                    <button
                                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                                        className="cursor-pointer rounded p-xs text-on-surface-variant transition-colors hover:text-primary"
                                        aria-label={isExpanded ? "Collapse" : "Expand"}
                                    >
                                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Expanded items */}
                            {isExpanded && (
                                <div className="border-t border-outline-variant/20 divide-y divide-outline-variant/10">
                                    {order.items.map(({ productId, quantity }) => {
                                        const product = allProducts.find((p) => p.id === productId);
                                        if (!product) return null;
                                        return (
                                            <div key={productId} className="flex gap-md px-lg py-md">
                                                <div className="relative h-14 w-12 flex-shrink-0 overflow-hidden rounded-md bg-surface-container">
                                                    <Image src={product.image} alt={product.name} fill className="object-cover" sizes="48px" />
                                                </div>
                                                <div className="flex flex-1 items-center justify-between gap-sm">
                                                    <div>
                                                        <Link href={`/product/${product.slug}`} className="font-body-md text-primary leading-snug hover:opacity-70 transition-opacity">
                                                            {product.name}
                                                        </Link>
                                                        <p className="font-label-sm text-label-sm text-on-surface-variant">Qty: {quantity}</p>
                                                    </div>
                                                    <p className="font-body-md font-medium text-primary whitespace-nowrap">
                                                        ₹{(product.price * quantity).toLocaleString("en-IN")}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="flex justify-between px-lg py-md">
                                        <p className="font-body-md text-on-surface-variant">Shipping</p>
                                        <p className={`font-body-md ${order.shipping === 0 ? "text-secondary" : "text-primary"}`}>
                                            {order.shipping === 0 ? "Free" : `₹${order.shipping}`}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Return request modal */}
            {returnState !== "idle" && (
                <>
                    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => { setReturnState("idle"); }} />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-md">
                        <div className="relative w-full max-w-[32rem] rounded-2xl bg-surface p-xl shadow-2xl max-h-[90vh] overflow-y-auto">
                            <button onClick={() => setReturnState("idle")} className="absolute top-lg right-lg cursor-pointer text-on-surface-variant hover:text-primary">
                                <X className="h-5 w-5" />
                            </button>

                            {returnState === "submitted" ? (
                                <div className="py-lg text-center space-y-md">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 mx-auto">
                                        <Check className="h-8 w-8 text-secondary" />
                                    </div>
                                    <h2 className="font-serif text-headline-md font-semibold text-primary">Return Requested</h2>
                                    <p className="font-body-md text-on-surface-variant max-w-xs mx-auto">
                                        We&apos;ve received your return request for order{" "}
                                        <strong className="text-primary">{returnForm.orderId}</strong>. You&apos;ll receive a prepaid shipping label at your registered email within one business day.
                                    </p>
                                    <button onClick={() => setReturnState("idle")} className="cursor-pointer rounded-md bg-primary px-xl py-sm font-label-md text-label-md uppercase tracking-widest text-white transition-opacity hover:opacity-80">
                                        Done
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={submitReturn} className="space-y-lg" noValidate>
                                    <div>
                                        <h2 className="font-serif text-[1.375rem] font-semibold text-primary">Request a Return</h2>
                                        <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">Order {returnForm.orderId}</p>
                                    </div>

                                    {/* Item selection */}
                                    <div className="space-y-sm">
                                        <p className="font-label-md text-label-md text-on-surface-variant">Select items to return</p>
                                        {returnOrder?.items.map(({ productId, quantity }) => {
                                            const product = allProducts.find((p) => p.id === productId);
                                            if (!product) return null;
                                            const checked = returnForm.selectedItems.includes(productId);
                                            return (
                                                <label key={productId} className={`flex cursor-pointer items-center gap-md rounded-md border p-md transition-colors ${checked ? "border-primary bg-surface-container" : "border-outline-variant/50 hover:bg-surface-container-low"}`}>
                                                    <input type="checkbox" checked={checked} onChange={() => toggleReturnItem(productId)} className="accent-primary h-4 w-4" />
                                                    <div className="relative h-12 w-10 flex-shrink-0 overflow-hidden rounded bg-surface-container">
                                                        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="40px" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-body-md text-primary leading-snug">{product.name}</p>
                                                        <p className="font-label-sm text-label-sm text-on-surface-variant">Qty: {quantity}</p>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>

                                    {/* Reason */}
                                    <div className="space-y-xs">
                                        <label className="font-label-md text-label-md text-on-surface-variant">Reason for return</label>
                                        <select
                                            required
                                            value={returnForm.reason}
                                            onChange={(e) => setReturnForm((p) => ({ ...p, reason: e.target.value }))}
                                            className="w-full rounded-md border border-outline-variant/50 bg-surface px-md py-sm font-body-md text-on-surface outline-none transition-colors focus:border-primary"
                                        >
                                            <option value="">Select a reason</option>
                                            {RETURN_REASONS.map((r) => <option key={r}>{r}</option>)}
                                        </select>
                                    </div>

                                    {/* Comments */}
                                    <div className="space-y-xs">
                                        <label className="font-label-md text-label-md text-on-surface-variant">Additional comments <span className="text-on-surface-variant/50">(optional)</span></label>
                                        <textarea
                                            rows={3}
                                            value={returnForm.comments}
                                            onChange={(e) => setReturnForm((p) => ({ ...p, comments: e.target.value }))}
                                            placeholder="Describe the issue in detail…"
                                            className="w-full resize-none rounded-md border border-outline-variant/50 bg-surface px-md py-sm font-body-md text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/40 focus:border-primary"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={returnForm.selectedItems.length === 0 || !returnForm.reason}
                                        className="cursor-pointer w-full rounded-md bg-primary py-md font-label-md text-label-md uppercase tracking-widest text-white transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        Submit Return Request
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
