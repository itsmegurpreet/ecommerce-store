"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Shield, Truck, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";

type PaymentMethod = "cod" | "card";
type DeliveryMethod = "standard" | "express";

interface GuestForm {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
}

const INDIAN_STATES = [
    "Andhra Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
];

// Free shipping threshold matches AnnouncementBar copy
const FREE_SHIPPING_THRESHOLD = 2999;
const SHIPPING_COST = 149;

function inputCls(hasError: boolean) {
    return [
        "w-full rounded-md border bg-surface px-md py-sm",
        "font-body-md text-on-surface placeholder:text-on-surface-variant/50",
        "outline-none transition-colors focus:border-primary",
        hasError ? "border-error" : "border-outline-variant/60",
    ].join(" ");
}

function Field({
    label,
    error,
    children,
    className = "",
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={className}>
            <label className="mb-xs block font-label-md text-label-md text-on-surface-variant">
                {label}
            </label>
            {children}
            {error && <p className="mt-xs font-label-sm text-label-sm text-error">{error}</p>}
        </div>
    );
}

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();

    const [form, setForm] = useState<GuestForm>({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });
    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("standard");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
    const [errors, setErrors] = useState<Partial<GuestForm>>({});
    const [submitted, setSubmitted] = useState(false);

    const shipping =
        deliveryMethod === "express"
            ? 299
            : totalPrice >= FREE_SHIPPING_THRESHOLD
              ? 0
              : SHIPPING_COST;
    const orderTotal = totalPrice + shipping;

    const validate = (): boolean => {
        const e: Partial<GuestForm> = {};
        if (!form.name.trim()) e.name = "Full name is required";
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            e.email = "A valid email address is required";
        if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
            e.phone = "A valid 10-digit Indian mobile number is required";
        if (!form.address.trim()) e.address = "Street address is required";
        if (!form.city.trim()) e.city = "City is required";
        if (!form.state) e.state = "Please select a state";
        if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode))
            e.pincode = "A valid 6-digit pincode is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const submitOrder = (e: React.FormEvent | React.MouseEvent) => {
        e.preventDefault();
        if (!validate()) return;
        clearCart();
        setSubmitted(true);
    };

    // Guard: empty cart (not post-submit)
    if (items.length === 0 && !submitted) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-md px-gutter text-center">
                <p className="font-headline-md text-headline-md text-primary">
                    Your cart is empty.
                </p>
                <Link
                    href="/shop"
                    className="font-label-md text-label-md text-secondary underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                    Back to Shop
                </Link>
            </div>
        );
    }

    // Success screen
    if (submitted) {
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
                        Order Confirmed
                    </h1>
                    <p className="font-body-md text-on-surface-variant mx-auto max-w-[22rem]">
                        A confirmation has been sent to{" "}
                        <strong className="text-primary break-all">{form.email}</strong>. Your order will
                        arrive in 3–5 business days.
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

    return (
        <div className="min-h-screen bg-surface">
            <div className="mx-auto max-w-7xl px-gutter py-xl">
                {/* Back link */}
                <Link
                    href="/shop"
                    className="mb-xl flex items-center gap-xs font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Shop
                </Link>

                <h1 className="font-serif text-headline-lg font-semibold text-primary mb-xxl">
                    Checkout
                </h1>

                <div className="grid grid-cols-1 gap-xl lg:grid-cols-[1fr_420px]">
                    {/* ── Left: Guest form ── */}
                    <form id="checkout-form" onSubmit={submitOrder} noValidate className="space-y-xxl">
                        {/* Contact */}
                        <fieldset className="space-y-lg">
                            <legend className="font-body-lg font-semibold text-primary">
                                Contact Information
                            </legend>
                            <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
                                <Field label="Full Name" error={errors.name}>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm({ ...form, name: e.target.value })
                                        }
                                        placeholder="Gurpreet Singh"
                                        className={inputCls(!!errors.name)}
                                        autoComplete="name"
                                    />
                                </Field>
                                <Field label="Email Address" error={errors.email}>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm({ ...form, email: e.target.value })
                                        }
                                        placeholder="you@example.com"
                                        className={inputCls(!!errors.email)}
                                        autoComplete="email"
                                    />
                                </Field>
                                <Field
                                    label="Mobile Number"
                                    error={errors.phone}
                                    className="sm:col-span-2"
                                >
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) =>
                                            setForm({ ...form, phone: e.target.value })
                                        }
                                        placeholder="98765 43210"
                                        className={inputCls(!!errors.phone)}
                                        autoComplete="tel"
                                    />
                                </Field>
                            </div>
                        </fieldset>

                        {/* Shipping address */}
                        <fieldset className="space-y-lg">
                            <legend className="font-body-lg font-semibold text-primary">
                                Shipping Address
                            </legend>
                            <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
                                <Field
                                    label="Street Address"
                                    error={errors.address}
                                    className="sm:col-span-2"
                                >
                                    <input
                                        type="text"
                                        value={form.address}
                                        onChange={(e) =>
                                            setForm({ ...form, address: e.target.value })
                                        }
                                        placeholder="14, MG Road, Connaught Place"
                                        className={inputCls(!!errors.address)}
                                        autoComplete="street-address"
                                    />
                                </Field>
                                <Field label="City" error={errors.city}>
                                    <input
                                        type="text"
                                        value={form.city}
                                        onChange={(e) =>
                                            setForm({ ...form, city: e.target.value })
                                        }
                                        placeholder="New Delhi"
                                        className={inputCls(!!errors.city)}
                                        autoComplete="address-level2"
                                    />
                                </Field>
                                <Field label="Pincode" error={errors.pincode}>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={form.pincode}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                pincode: e.target.value.replace(/\D/g, ""),
                                            })
                                        }
                                        placeholder="110001"
                                        maxLength={6}
                                        className={inputCls(!!errors.pincode)}
                                        autoComplete="postal-code"
                                    />
                                </Field>
                                <Field
                                    label="State"
                                    error={errors.state}
                                    className="sm:col-span-2"
                                >
                                    <select
                                        value={form.state}
                                        onChange={(e) =>
                                            setForm({ ...form, state: e.target.value })
                                        }
                                        className={inputCls(!!errors.state)}
                                        autoComplete="address-level1"
                                    >
                                        <option value="">Select state</option>
                                        {INDIAN_STATES.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </Field>
                            </div>
                        </fieldset>

                        {/* Payment */}
                        <fieldset className="space-y-lg">
                            <legend className="font-body-lg font-semibold text-primary">
                                Delivery Method
                            </legend>
                            <div className="space-y-sm">
                                {(
                                    [
                                        {
                                            value: "standard" as const,
                                            label: "Standard Delivery",
                                            sub: "3–6 business days",
                                            price:
                                                totalPrice >= FREE_SHIPPING_THRESHOLD
                                                    ? "Free"
                                                    : "₹149",
                                        },
                                        {
                                            value: "express" as const,
                                            label: "Express Delivery",
                                            sub: "1–2 business days",
                                            price: "₹299",
                                        },
                                    ] satisfies {
                                        value: DeliveryMethod;
                                        label: string;
                                        sub: string;
                                        price: string;
                                    }[]
                                ).map(({ value, label, sub, price }) => (
                                    <label
                                        key={value}
                                        className={`flex cursor-pointer items-center gap-md rounded-md border p-md transition-colors ${
                                            deliveryMethod === value
                                                ? "border-primary bg-surface-container"
                                                : "border-outline-variant/50 bg-surface hover:bg-surface-container-low"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="delivery"
                                            value={value}
                                            checked={deliveryMethod === value}
                                            onChange={() => setDeliveryMethod(value)}
                                            className="accent-primary"
                                        />
                                        <div className="flex-1">
                                            <p className="font-label-md text-label-md text-primary">
                                                {label}
                                            </p>
                                            <p className="font-label-sm text-label-sm text-on-surface-variant">
                                                {sub}
                                            </p>
                                        </div>
                                        <p
                                            className={`font-label-md text-label-md ${
                                                price === "Free"
                                                    ? "text-secondary"
                                                    : "text-primary"
                                            }`}
                                        >
                                            {price}
                                        </p>
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        {/* Payment */}
                        <fieldset className="space-y-lg">
                            <legend className="font-body-lg font-semibold text-primary">
                                Payment Method
                            </legend>
                            <div className="space-y-sm">
                                {(
                                    [
                                        {
                                            value: "cod" as const,
                                            label: "Cash on Delivery",
                                            sub: "Pay when your order arrives",
                                        },
                                        {
                                            value: "card" as const,
                                            label: "Credit / Debit Card",
                                            sub: "Visa, Mastercard, RuPay — coming soon",
                                        },
                                    ] satisfies { value: PaymentMethod; label: string; sub: string }[]
                                ).map(({ value, label, sub }) => (
                                    <label
                                        key={value}
                                        className={`flex cursor-pointer items-center gap-md rounded-md border p-md transition-colors ${
                                            paymentMethod === value
                                                ? "border-primary bg-surface-container"
                                                : "border-outline-variant/50 bg-surface hover:bg-surface-container-low"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={value}
                                            checked={paymentMethod === value}
                                            onChange={() => setPaymentMethod(value)}
                                            className="accent-primary"
                                        />
                                        <div>
                                            <p className="font-label-md text-label-md text-primary">
                                                {label}
                                            </p>
                                            <p className="font-label-sm text-label-sm text-on-surface-variant">
                                                {sub}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        {/* Mobile submit button (inside form) */}
                        <button
                            type="submit"
                            className="w-full rounded-md bg-secondary py-md font-label-md text-label-md uppercase tracking-widest text-white transition-opacity hover:opacity-90 lg:hidden"
                        >
                            Place Order · ₹{orderTotal.toLocaleString("en-IN")}
                        </button>
                    </form>

                    {/* ── Right: Order summary ── */}
                    <div className="space-y-lg lg:sticky lg:top-28 lg:self-start">
                        <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low p-lg">
                            <h2 className="font-body-lg mb-lg font-semibold text-primary">
                                Order Summary
                            </h2>

                            {/* Item list */}
                            <ul className="divide-y divide-outline-variant/20">
                                {items.map((item) => (
                                    <li key={item.product.id} className="flex gap-md py-md">
                                        <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden rounded-md bg-surface-container">
                                            <Image
                                                src={item.product.image}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                                sizes="56px"
                                            />
                                            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex flex-1 items-center justify-between gap-sm">
                                            <p className="font-body-md leading-snug text-primary">
                                                {item.product.name}
                                            </p>
                                            <p className="font-body-md font-medium text-primary whitespace-nowrap">
                                                ₹
                                                {(
                                                    item.product.price * item.quantity
                                                ).toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Totals */}
                            <div className="mt-md space-y-sm border-t border-outline-variant/30 pt-md">
                                <div className="flex justify-between">
                                    <p className="font-body-md text-on-surface-variant">
                                        Subtotal
                                    </p>
                                    <p className="font-body-md text-primary">
                                        ₹{totalPrice.toLocaleString("en-IN")}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-body-md text-on-surface-variant">
                                        Shipping
                                    </p>
                                    <p
                                        className={`font-body-md ${shipping === 0 ? "text-secondary" : "text-primary"}`}
                                    >
                                        {shipping === 0 ? "Free" : `₹${shipping}`}
                                    </p>
                                </div>
                                <div className="flex justify-between border-t border-outline-variant/30 pt-sm">
                                    <p className="font-body-lg font-semibold text-primary">
                                        Total
                                    </p>
                                    <p className="font-body-lg font-bold text-primary">
                                        ₹{orderTotal.toLocaleString("en-IN")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Desktop submit (outside form — uses form= attribute) */}
                        <button
                            type="submit"
                            form="checkout-form"
                            className="hidden w-full rounded-md bg-secondary py-md font-label-md text-label-md uppercase tracking-widest text-white transition-opacity hover:opacity-90 lg:block"
                        >
                            Place Order · ₹{orderTotal.toLocaleString("en-IN")}
                        </button>

                        {/* Trust signals */}
                        <div className="space-y-sm">
                            {(
                                [
                                    { Icon: Shield, label: "Secure & encrypted checkout" },
                                    { Icon: Truck, label: "Free delivery above ₹2,999" },
                                    { Icon: RotateCcw, label: "Easy 7-day returns" },
                                ] as const
                            ).map(({ Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-sm text-on-surface-variant"
                                >
                                    <Icon className="h-4 w-4 flex-shrink-0" />
                                    <p className="font-label-sm text-label-sm">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
