"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, User, LogOut, Settings, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { SearchModal } from "@/components/layout/SearchModal";

const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Workspace", href: "/category/workspace" },
    { label: "Travel", href: "/category/travel-gear" },
    { label: "Tech", href: "/category/tech" },
    { label: "Bundles", href: "/category/bundles" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // Defer localStorage-derived values until after hydration to avoid SSR mismatch
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const { totalItems: rawCartItems, openCart } = useCart();
    const { totalItems: rawWishlistCount, openWishlist } = useWishlist();
    const { user: rawUser, logout, isAuthenticated: rawIsAuthenticated } = useAuth();

    // Only expose real counts after client hydration
    const totalItems = mounted ? rawCartItems : 0;
    const wishlistCount = mounted ? rawWishlistCount : 0;
    const isAuthenticated = mounted ? rawIsAuthenticated : false;
    const user = mounted ? rawUser : null;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close user menu on outside click
    useEffect(() => {
        if (!userMenuOpen) return;
        const close = () => setUserMenuOpen(false);
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, [userMenuOpen]);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    function isActive(href: string) {
        if (href === "/shop") return pathname === "/shop" || pathname.startsWith("/shop/");
        return pathname === href || pathname.startsWith(href + "/");
    }

    return (
        <>
            <nav
                className={`border-outline-variant/20 bg-surface/90 sticky top-0 z-50 flex w-full flex-col border-b backdrop-blur-md transition-all duration-300 ease-in-out ${scrolled ? "shadow-md" : "shadow-sm"}`}
            >
                <div className="px-gutter mx-auto flex h-18 w-full max-w-7xl items-center justify-between">
                    {/* Logo + Nav */}
                    <div className="gap-xl flex items-center">
                        <Link href="/" className="flex items-center">
                            <span className="font-serif text-[1.375rem] font-bold tracking-tight text-primary">
                                SmartDeskHub
                            </span>
                        </Link>
                        <div className="gap-lg hidden items-center md:flex">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`font-label-md text-label-md transition-colors ${
                                            active
                                                ? "text-primary border-primary border-b-2 pb-1"
                                                : "text-on-surface-variant hover:text-primary"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="gap-md text-on-surface flex items-center">
                        {/* Search */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="p-xs cursor-pointer transition-opacity hover:opacity-60"
                            aria-label="Search"
                        >
                            <Search className="h-6 w-6" />
                        </button>
                        <button
                            onClick={openWishlist}
                            className="p-xs relative cursor-pointer transition-opacity hover:opacity-60"
                            aria-label={`Wishlist, ${wishlistCount} ${wishlistCount === 1 ? "item" : "items"}`}
                        >
                            <Heart className="h-6 w-6" />
                            {wishlistCount > 0 && (
                                <span className="bg-secondary absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white">
                                    {wishlistCount > 99 ? "99+" : wishlistCount}
                                </span>
                            )}
                        </button>

                        {/* Cart */}
                        <button
                            onClick={openCart}
                            className="p-xs relative cursor-pointer transition-opacity hover:opacity-60"
                            aria-label={`Cart, ${totalItems} ${totalItems === 1 ? "item" : "items"}`}
                        >
                            <ShoppingBag className="h-6 w-6" />
                            {totalItems > 0 && (
                                <span className="bg-secondary absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white">
                                    {totalItems > 99 ? "99+" : totalItems}
                                </span>
                            )}
                        </button>

                        {/* Account */}
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setUserMenuOpen((o) => !o);
                                    }}
                                    className="p-xs cursor-pointer transition-opacity hover:opacity-60"
                                    aria-label="Account menu"
                                >
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary">
                                        {user!.name[0].toUpperCase()}
                                    </div>
                                </button>

                                {userMenuOpen && (
                                    <div
                                        className="bg-surface border-outline-variant/20 absolute top-full right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border shadow-[0_8px_32px_rgba(26,26,26,0.10)]"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {/* User header */}
                                        <div className="border-outline-variant/20 border-b px-[14px] py-[12px]">
                                            <p className="truncate text-[14px] font-semibold leading-snug tracking-tight text-on-surface">
                                                {user!.name}
                                            </p>
                                            <p className="truncate text-[12px] leading-snug text-on-surface-variant mt-[2px]">
                                                {user!.email}
                                            </p>
                                        </div>
                                        {/* Nav links */}
                                        <div className="py-[4px]">
                                            <Link
                                                href="/account"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="hover:bg-surface-container flex w-full items-center gap-[10px] px-[14px] py-[9px] text-[13px] font-medium leading-none text-on-surface-variant transition-colors hover:text-on-surface"
                                            >
                                                <User className="h-[15px] w-[15px] shrink-0" />
                                                My Account
                                            </Link>
                                            <Link
                                                href="/account/orders"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="hover:bg-surface-container flex w-full items-center gap-[10px] px-[14px] py-[9px] text-[13px] font-medium leading-none text-on-surface-variant transition-colors hover:text-on-surface"
                                            >
                                                <ShoppingBag className="h-[15px] w-[15px] shrink-0" />
                                                Orders
                                            </Link>
                                            <Link
                                                href="/account/profile"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="hover:bg-surface-container flex w-full items-center gap-[10px] px-[14px] py-[9px] text-[13px] font-medium leading-none text-on-surface-variant transition-colors hover:text-on-surface"
                                            >
                                                <Settings className="h-[15px] w-[15px] shrink-0" />
                                                Profile Settings
                                            </Link>
                                        </div>
                                        {/* Sign out */}
                                        <div className="border-outline-variant/20 border-t py-[4px]">
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setUserMenuOpen(false);
                                                }}
                                                className="hover:bg-surface-container flex w-full cursor-pointer items-center gap-[10px] px-[14px] py-[9px] text-[13px] font-medium leading-none text-on-surface-variant transition-colors hover:text-error"
                                            >
                                                <LogOut className="h-[15px] w-[15px] shrink-0" />
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/account/login"
                                className="p-xs cursor-pointer transition-opacity hover:opacity-60"
                                aria-label="Sign in"
                            >
                                <User className="h-6 w-6" />
                            </Link>
                        )}

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMobileMenuOpen((o) => !o)}
                            className="p-xs md:hidden cursor-pointer transition-opacity hover:opacity-60"
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile nav panel */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-outline-variant/20 bg-surface">
                        <nav className="px-gutter py-sm flex flex-col">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`py-[13px] border-b border-outline-variant/10 text-[15px] font-medium tracking-wide transition-colors ${
                                            active
                                                ? "text-primary"
                                                : "text-on-surface-variant hover:text-primary"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>
                        {/* Account section */}
                        <div className="border-t border-outline-variant/20 px-gutter py-sm">
                            {isAuthenticated ? (
                                <>
                                    <div className="py-[10px]">
                                        <p className="text-[13px] font-semibold text-on-surface truncate">{user!.name}</p>
                                        <p className="text-[12px] text-on-surface-variant truncate">{user!.email}</p>
                                    </div>
                                    <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-[10px] py-[11px] border-t border-outline-variant/10 text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors">
                                        <User className="h-4 w-4 shrink-0" /> My Account
                                    </Link>
                                    <Link href="/account/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-[10px] py-[11px] border-t border-outline-variant/10 text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors">
                                        <ShoppingBag className="h-4 w-4 shrink-0" /> Orders
                                    </Link>
                                    <Link href="/account/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-[10px] py-[11px] border-t border-outline-variant/10 text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors">
                                        <Settings className="h-4 w-4 shrink-0" /> Profile Settings
                                    </Link>
                                    <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="flex w-full cursor-pointer items-center gap-[10px] py-[11px] border-t border-outline-variant/10 text-[14px] font-medium text-on-surface-variant hover:text-error transition-colors">
                                        <LogOut className="h-4 w-4 shrink-0" /> Sign out
                                    </button>
                                </>
                            ) : (
                                <Link href="/account/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-[10px] py-[13px] text-[15px] font-medium text-on-surface-variant hover:text-primary transition-colors">
                                    <User className="h-4 w-4 shrink-0" /> Sign in
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
