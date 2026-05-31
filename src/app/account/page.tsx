"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, Heart, MapPin, LogOut, ChevronRight, UserCog, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";

const quickLinks = [
    {
        icon: Package,
        label: "Order History",
        description: "Track and manage your past orders",
        href: "/account/orders",
    },
    {
        icon: Heart,
        label: "Saved Items",
        description: "Products you've added to your wishlist",
        href: "/account/wishlist",
    },
    {
        icon: MapPin,
        label: "Addresses",
        description: "Manage your saved delivery addresses",
        href: "/account/addresses",
    },
    {
        icon: UserCog,
        label: "Profile Settings",
        description: "Edit your name, email, and password",
        href: "/account/profile",
    },
];

export default function AccountPage() {
    const { user, logout, isAuthenticated } = useAuth();
    const { totalItems: wishlistCount, openWishlist } = useWishlist();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/account/login");
        }
    }, [isAuthenticated, router]);

    if (!user) return null;

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <section className="bg-surface min-h-screen pb-xxl">
            <div className="border-b border-outline-variant/20 bg-surface-container-low">
                <div className="mx-auto max-w-7xl px-gutter py-xxl">
                    <p className="font-label-md text-label-md mb-sm uppercase tracking-widest text-secondary">
                        My Account
                    </p>
                    <div className="flex items-center justify-between gap-md">
                        <div className="flex items-center gap-md">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary font-semibold text-lg">
                                {initials}
                            </div>
                            <div>
                                <h1 className="font-serif text-headline-md font-semibold text-primary">
                                    {user.name}
                                </h1>
                                <p className="font-body-md text-on-surface-variant">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="hidden cursor-pointer items-center gap-xs font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary sm:flex"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign out
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-gutter pt-xl">
                <div className="grid gap-6 md:grid-cols-3">
                    {quickLinks.map(({ icon: Icon, label, description, href }) => (
                        <Link
                            key={href}
                            href={href}
                            className="group flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-low p-lg transition-all hover:border-outline-variant hover:shadow-sm"
                        >
                            <div className="flex items-center gap-md">
                                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-container">
                                    <Icon className="h-5 w-5 text-on-surface-variant" />
                                </div>
                                <div>
                                    <p className="font-label-md text-label-md font-semibold text-primary">
                                        {label}
                                    </p>
                                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                                        {description}
                                    </p>
                                </div>
                            </div>
                            <ChevronRight className="h-4 w-4 flex-shrink-0 text-on-surface-variant/50 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    ))}
                </div>

                {/* Summary cards */}
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-lg">
                        <div className="mb-md flex items-center justify-between">
                            <p className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
                                Recent Orders
                            </p>
                            <Link
                                href="/account/orders"
                                className="font-label-sm text-label-sm text-secondary transition-opacity hover:opacity-70"
                            >
                                View all
                            </Link>
                        </div>
                        <div className="flex flex-col items-center gap-sm py-lg text-center">
                            <ShoppingBag className="h-10 w-10 text-outline-variant" />
                            <p className="font-body-md text-on-surface-variant">
                                No orders placed yet.
                            </p>
                            <Link
                                href="/shop"
                                className="font-label-md text-label-md text-secondary underline underline-offset-4 transition-opacity hover:opacity-70"
                            >
                                Start shopping
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-lg">
                        <div className="mb-md flex items-center justify-between">
                            <p className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
                                Wishlist
                            </p>
                            <button
                                onClick={openWishlist}
                                className="cursor-pointer font-label-sm text-label-sm text-secondary transition-opacity hover:opacity-70"
                            >
                                View all
                            </button>
                        </div>
                        {wishlistCount > 0 ? (
                            <p className="font-body-md text-primary">
                                {wishlistCount} {wishlistCount === 1 ? "item" : "items"} saved
                            </p>
                        ) : (
                            <div className="flex flex-col items-center gap-sm py-lg text-center">
                                <Heart className="h-10 w-10 text-outline-variant" />
                                <p className="font-body-md text-on-surface-variant">
                                    Nothing saved yet.
                                </p>
                                <Link
                                    href="/shop"
                                    className="font-label-md text-label-md text-secondary underline underline-offset-4 transition-opacity hover:opacity-70"
                                >
                                    Browse products
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile sign out */}
                <button
                    onClick={handleLogout}
                    className="mt-10 flex cursor-pointer items-center gap-sm font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary sm:hidden"
                >
                    <LogOut className="h-4 w-4" />
                    Sign out
                </button>
            </div>
        </section>
    );
}
