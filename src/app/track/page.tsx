"use client";

import { useState, FormEvent } from "react";
import { Search, Package, Truck, CheckCircle2, Clock } from "lucide-react";

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("");
    const [email, setEmail] = useState("");
    const [searched, setSearched] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSearched(true);
    };

    return (
        <section className="bg-surface min-h-screen pb-xxl">
            <div className="border-b border-outline-variant/20 bg-surface-container-low">
                <div className="mx-auto max-w-7xl px-gutter py-xxl">
                    <p className="font-label-md text-label-md mb-sm uppercase tracking-widest text-secondary">
                        Delivery
                    </p>
                    <h1 className="font-serif text-headline-md font-semibold text-primary">
                        Track Your Order
                    </h1>
                </div>
            </div>

            <div className="mx-auto max-w-[40rem] px-gutter pt-xl">
                <form onSubmit={handleSubmit} className="space-y-md" noValidate>
                    <div className="space-y-xs">
                        <label
                            htmlFor="order-id"
                            className="font-label-md text-label-md text-on-surface-variant"
                        >
                            Order ID
                        </label>
                        <input
                            id="order-id"
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="UC-2026-000123"
                            required
                            className="w-full rounded-lg border border-outline-variant/40 bg-surface px-md py-sm font-body-md text-on-surface outline-none transition-colors focus:border-primary placeholder:text-on-surface-variant/40"
                        />
                    </div>
                    <div className="space-y-xs">
                        <label
                            htmlFor="track-email"
                            className="font-label-md text-label-md text-on-surface-variant"
                        >
                            Email address used when ordering
                        </label>
                        <input
                            id="track-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full rounded-lg border border-outline-variant/40 bg-surface px-md py-sm font-body-md text-on-surface outline-none transition-colors focus:border-primary placeholder:text-on-surface-variant/40"
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex cursor-pointer items-center gap-sm rounded-md bg-secondary px-xl py-md font-label-md text-label-md uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                    >
                        <Search className="h-4 w-4" />
                        Track Order
                    </button>
                </form>

                {searched && (
                    <div className="mt-xl rounded-xl border border-outline-variant/30 bg-surface-container-low p-xl">
                        <p className="font-label-sm text-label-sm text-on-surface-variant mb-lg">
                            Order <strong className="text-primary">{orderId}</strong>
                        </p>

                        {/* Demo timeline — in production this would come from a carrier API */}
                        <div className="relative pl-8 space-y-lg before:absolute before:left-[11px] before:top-1 before:bottom-1 before:w-px before:bg-outline-variant/40">
                            {[
                                { icon: CheckCircle2, label: "Order confirmed", date: "Today, 11:34 am", done: true },
                                { icon: Package, label: "Being packed at warehouse", date: "In progress", done: true },
                                { icon: Truck, label: "Out for dispatch", date: "Expected today", done: false },
                                { icon: Clock, label: "Delivered", date: "Expected in 3–5 business days", done: false },
                            ].map(({ icon: Icon, label, date, done }) => (
                                <div key={label} className="relative flex items-start gap-md">
                                    <span
                                        className={`absolute -left-8 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full ${done ? "bg-secondary text-white" : "bg-surface-container border border-outline-variant/40 text-on-surface-variant"}`}
                                    >
                                        <Icon className="h-3.5 w-3.5" />
                                    </span>
                                    <div>
                                        <p className={`font-label-md text-label-md ${done ? "text-primary" : "text-on-surface-variant"}`}>
                                            {label}
                                        </p>
                                        <p className="font-label-sm text-label-sm text-on-surface-variant/60 mt-[2px]">
                                            {date}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="mt-xl font-label-sm text-label-sm text-on-surface-variant/60">
                            This is a demo. Real-time carrier tracking will be available once payments are integrated.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
