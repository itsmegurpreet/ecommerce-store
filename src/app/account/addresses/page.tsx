"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, ChevronLeft, Plus, Pencil, Trash2, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const STORAGE_KEY = "smartdeskhub_addresses";

const INDIAN_STATES = [
    "Andhra Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat",
    "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
    "Maharashtra","Odisha","Punjab","Rajasthan","Tamil Nadu","Telangana",
    "Uttar Pradesh","Uttarakhand","West Bengal",
];

interface Address {
    id: string;
    label: string;
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
}

const empty: Omit<Address, "id" | "isDefault"> = {
    label: "Home", name: "", phone: "", street: "", city: "", state: "", pincode: "",
};

function inputCls(err?: boolean) {
    return [
        "w-full rounded-md border bg-surface px-md py-sm font-body-md text-on-surface",
        "placeholder:text-on-surface-variant/40 outline-none transition-colors focus:border-primary",
        err ? "border-error" : "border-outline-variant/50",
    ].join(" ");
}

function loadAddresses(email: string): Address[] {
    try {
        const raw = localStorage.getItem(`${STORAGE_KEY}_${email}`);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

function saveAddresses(email: string, addresses: Address[]) {
    try { localStorage.setItem(`${STORAGE_KEY}_${email}`, JSON.stringify(addresses)); } catch {}
}

export default function AddressesPage() {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({ ...empty });
    const [errors, setErrors] = useState<Partial<typeof empty>>({});

    useEffect(() => {
        if (!isAuthenticated) { router.replace("/account/login"); return; }
        if (user) setAddresses(loadAddresses(user.email));
    }, [isAuthenticated, user, router]);

    if (!user) return null;

    const persist = (updated: Address[]) => {
        setAddresses(updated);
        saveAddresses(user.email, updated);
    };

    const validate = () => {
        const e: Partial<typeof empty> = {};
        if (!form.name.trim()) e.name = "Required";
        if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Valid 10-digit mobile required";
        if (!form.street.trim()) e.street = "Required";
        if (!form.city.trim()) e.city = "Required";
        if (!form.state) e.state = "Required";
        if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Valid 6-digit pincode required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        if (editingId) {
            persist(addresses.map((a) => a.id === editingId ? { ...a, ...form } : a));
        } else {
            const isFirst = addresses.length === 0;
            persist([...addresses, { ...form, id: crypto.randomUUID(), isDefault: isFirst }]);
        }
        resetForm();
    };

    const handleDelete = (id: string) => {
        const updated = addresses.filter((a) => a.id !== id);
        // If we deleted the default, make first remaining the default
        if (updated.length > 0 && !updated.some((a) => a.isDefault)) {
            updated[0].isDefault = true;
        }
        persist(updated);
    };

    const handleSetDefault = (id: string) => {
        persist(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
    };

    const handleEdit = (address: Address) => {
        setEditingId(address.id);
        setForm({ label: address.label, name: address.name, phone: address.phone, street: address.street, city: address.city, state: address.state, pincode: address.pincode });
        setShowForm(true);
    };

    const resetForm = () => {
        setForm({ ...empty }); setErrors({}); setEditingId(null); setShowForm(false);
    };

    const f = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm((prev) => ({ ...prev, [k]: e.target.value }));

    return (
        <section className="bg-surface min-h-screen pb-xxl">
            <div className="border-b border-outline-variant/20 bg-surface-container-low">
                <div className="mx-auto max-w-7xl px-gutter py-xxl">
                    <Link href="/account" className="mb-md inline-flex items-center gap-xs font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary">
                        <ChevronLeft className="h-3.5 w-3.5" />Account
                    </Link>
                    <p className="font-label-md text-label-md mb-sm uppercase tracking-widest text-secondary">Delivery</p>
                    <h1 className="font-serif text-headline-md font-semibold text-primary">Saved Addresses</h1>
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-gutter pt-xl space-y-lg">
                {/* Address cards */}
                {addresses.length > 0 && (
                    <div className="space-y-md">
                        {addresses.map((addr) => (
                            <div key={addr.id} className={`rounded-xl border p-lg transition-colors ${addr.isDefault ? "border-secondary/40 bg-secondary/5" : "border-outline-variant/30 bg-surface-container-low"}`}>
                                <div className="flex items-start justify-between gap-md">
                                    <div className="space-y-xs">
                                        <div className="flex items-center gap-sm">
                                            <MapPin className="h-4 w-4 text-secondary flex-shrink-0" />
                                            <span className="font-label-md text-label-md uppercase tracking-wider text-primary">{addr.label}</span>
                                            {addr.isDefault && (
                                                <span className="rounded-full bg-secondary/10 px-sm py-[2px] font-label-sm text-[11px] text-secondary">Default</span>
                                            )}
                                        </div>
                                        <p className="font-body-md font-medium text-primary">{addr.name}</p>
                                        <p className="font-body-md text-on-surface-variant">{addr.street}</p>
                                        <p className="font-body-md text-on-surface-variant">{addr.city}, {addr.state} — {addr.pincode}</p>
                                        <p className="font-body-md text-on-surface-variant">{addr.phone}</p>
                                    </div>
                                    <div className="flex flex-shrink-0 items-center gap-sm">
                                        <button onClick={() => handleEdit(addr)} className="cursor-pointer rounded p-xs text-on-surface-variant transition-colors hover:text-primary" aria-label="Edit">
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => handleDelete(addr.id)} className="cursor-pointer rounded p-xs text-on-surface-variant transition-colors hover:text-error" aria-label="Delete">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                {!addr.isDefault && (
                                    <button onClick={() => handleSetDefault(addr.id)} className="mt-md cursor-pointer flex items-center gap-xs font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-secondary">
                                        <Check className="h-3.5 w-3.5" />
                                        Set as default
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Add button */}
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="cursor-pointer flex items-center gap-sm rounded-xl border border-dashed border-outline-variant/60 px-lg py-md w-full font-label-md text-label-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                    >
                        <Plus className="h-4 w-4" />
                        Add new address
                    </button>
                )}

                {/* Form */}
                {showForm && (
                    <form onSubmit={handleSave} noValidate className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-xl space-y-md">
                        <h2 className="font-serif text-[1.25rem] font-semibold text-primary">
                            {editingId ? "Edit Address" : "New Address"}
                        </h2>

                        {/* Label selector */}
                        <div className="flex gap-sm">
                            {["Home", "Work", "Other"].map((l) => (
                                <button type="button" key={l} onClick={() => setForm((p) => ({ ...p, label: l }))}
                                    className={`cursor-pointer rounded-full border px-md py-xs font-label-sm text-label-sm transition-colors ${form.label === l ? "border-primary bg-primary text-white" : "border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary"}`}>
                                    {l}
                                </button>
                            ))}
                        </div>

                        <div className="grid gap-md sm:grid-cols-2">
                            <Field label="Full Name" error={errors.name}>
                                <input type="text" value={form.name} onChange={f("name")} placeholder="Gurpreet Singh" className={inputCls(!!errors.name)} autoComplete="name" />
                            </Field>
                            <Field label="Mobile Number" error={errors.phone}>
                                <input type="tel" value={form.phone} onChange={f("phone")} placeholder="98765 43210" className={inputCls(!!errors.phone)} autoComplete="tel" />
                            </Field>
                            <Field label="Street Address" error={errors.street} className="sm:col-span-2">
                                <input type="text" value={form.street} onChange={f("street")} placeholder="14, MG Road" className={inputCls(!!errors.street)} autoComplete="street-address" />
                            </Field>
                            <Field label="City" error={errors.city}>
                                <input type="text" value={form.city} onChange={f("city")} placeholder="New Delhi" className={inputCls(!!errors.city)} autoComplete="address-level2" />
                            </Field>
                            <Field label="Pincode" error={errors.pincode}>
                                <input type="text" inputMode="numeric" value={form.pincode} onChange={(e) => setForm((p) => ({ ...p, pincode: e.target.value.replace(/\D/g, "") }))} placeholder="110001" maxLength={6} className={inputCls(!!errors.pincode)} autoComplete="postal-code" />
                            </Field>
                            <Field label="State" error={errors.state} className="sm:col-span-2">
                                <select value={form.state} onChange={f("state")} className={inputCls(!!errors.state)}>
                                    <option value="">Select state</option>
                                    {INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                                </select>
                            </Field>
                        </div>

                        <div className="flex gap-sm pt-xs">
                            <button type="submit" className="cursor-pointer rounded-md bg-primary px-xl py-sm font-label-md text-label-md uppercase tracking-widest text-white transition-opacity hover:opacity-80">
                                {editingId ? "Save Changes" : "Add Address"}
                            </button>
                            <button type="button" onClick={resetForm} className="cursor-pointer rounded-md border border-outline-variant/50 px-xl py-sm font-label-md text-label-md uppercase tracking-widest text-on-surface-variant transition-colors hover:border-primary hover:text-primary">
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {addresses.length === 0 && !showForm && (
                    <p className="text-center font-body-md text-on-surface-variant py-xl">
                        No addresses saved yet. Add one above.
                    </p>
                )}
            </div>
        </section>
    );
}

function Field({ label, error, children, className = "" }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
    return (
        <div className={className}>
            <label className="mb-xs block font-label-md text-label-md text-on-surface-variant">{label}</label>
            {children}
            {error && <p className="mt-xs font-label-sm text-label-sm text-error">{error}</p>}
        </div>
    );
}

