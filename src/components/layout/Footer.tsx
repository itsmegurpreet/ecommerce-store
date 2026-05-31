"use client";

import Link from "next/link";
import { useState } from "react";

const shopLinks = [
    { label: "All Products", href: "/shop" },
    { label: "Workspace", href: "/category/workspace" },
    { label: "Travel Gear", href: "/category/travel-gear" },
    { label: "Tech", href: "/category/tech" },
    { label: "Bundles", href: "/category/bundles" },
];

const supportLinks = [
    { label: "Track Order", href: "/track" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
];

const socials = [
    {
        label: "Instagram",
        href: "https://instagram.com",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        label: "X (Twitter)",
        href: "https://x.com",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-[16px] w-[16px]" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.857L1.964 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: "Pinterest",
        href: "https://pinterest.com",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.141-.828 3.33-.236.995.498 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.562 0-2.387-1.715-4.055-4.163-4.055-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.773.741 2.274a.3.3 0 0 1 .069.283c-.076.313-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
            </svg>
        ),
    },
];

export function Footer() {
    const [subscribed, setSubscribed] = useState(false);

    return (
        <footer className="border-t border-outline-variant/20 bg-surface-container">
            {/* Main grid */}
            <div className="mx-auto max-w-7xl px-gutter pt-[48px] pb-[40px] md:pt-[64px] md:pb-[48px]">
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12 md:gap-12">

                    {/* Brand column — full width on mobile, 4 cols on desktop */}
                    <div className="col-span-2 flex flex-col gap-md md:col-span-4 md:gap-lg">
                        <Link href="/">
                            <span className="font-serif text-xl font-bold tracking-tight text-primary">
                                SmartDeskHub
                            </span>
                        </Link>
                        <p className="font-body-md text-on-surface-variant max-w-[18rem] leading-relaxed">
                            Premium accessories for the modern professional. Designed for work, optimised for life.
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-[10px]">
                            {socials.map(({ label, href, icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-outline-variant/50 text-on-surface-variant transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop — 1 of 2 cols on mobile, 2 cols on desktop */}
                    <div className="col-span-1 md:col-span-2">
                        <FooterHeading>Shop</FooterHeading>
                        <ul className="space-y-[10px]">
                            {shopLinks.map((l) => (
                                <li key={l.label}>
                                    <Link
                                        href={l.href}
                                        className="font-body-md text-on-surface-variant transition-colors hover:text-primary"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support — 1 of 2 cols on mobile, 2 cols on desktop */}
                    <div className="col-span-1 md:col-span-2">
                        <FooterHeading>Support</FooterHeading>
                        <ul className="space-y-[10px]">
                            {supportLinks.map((l) => (
                                <li key={l.label}>
                                    <Link
                                        href={l.href}
                                        className="font-body-md text-on-surface-variant transition-colors hover:text-primary"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter — full width on mobile, 4 cols on desktop */}
                    <div className="col-span-2 md:col-span-4">
                        <FooterHeading>Join the Collective</FooterHeading>
                        <p className="font-body-md text-on-surface-variant mb-md leading-relaxed md:mb-lg">
                            Exclusive drops, design stories, and early access — for members only.
                        </p>

                        {subscribed ? (
                            <p className="font-label-md text-label-md text-secondary">
                                You&apos;re on the list.
                            </p>
                        ) : (
                            <form
                                className="flex flex-col gap-sm"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setSubscribed(true);
                                }}
                            >
                                <input
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    className="w-full rounded-md border border-outline-variant/50 bg-surface px-md py-[10px] font-body-md text-primary outline-none transition-colors placeholder:text-on-surface-variant/40 focus:border-primary"
                                />
                                <button
                                    type="submit"
                                    className="cursor-pointer rounded-md bg-primary px-lg py-[10px] font-label-md text-label-md uppercase tracking-widest text-white transition-opacity hover:opacity-80"
                                >
                                    Subscribe
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-outline-variant/20">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-sm px-gutter py-md md:flex-row md:py-lg">
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                        © {new Date().getFullYear()} SmartDeskHub. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-x-lg gap-y-sm">
                        {([
                            { label: "Privacy Policy", href: "/legal/privacy" },
                            { label: "Terms of Service", href: "/legal/terms" },
                            { label: "Cookies", href: "/legal/cookies" },
                        ] as { label: string; href: string }[]).map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                className="font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-primary"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
    return (
        <div className="mb-lg flex items-center gap-sm">
            {/* Teal accent bar */}
            <span className="block h-[14px] w-[3px] rounded-full bg-secondary flex-shrink-0" aria-hidden="true" />
            <h4 className="font-label-md text-label-md tracking-[0.12em] uppercase text-primary">
                {children}
            </h4>
        </div>
    );
}
