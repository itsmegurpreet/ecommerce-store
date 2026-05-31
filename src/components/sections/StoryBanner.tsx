"use client";

import Image from "next/image";
import Link from "next/link";

const BUNDLE_IMG = "/images/story/essential-kits.jpg";

const bundles = [
    {
        name: "Work From Cafe Kit",
        description: "Pouch + Sleeves + Cable Ties",
        price: 5999,
        icon: "☕",
    },
    {
        name: "Remote Starter Kit",
        description: "Mat + Stand + Organizer",
        price: 8499,
        icon: "💻",
    },
];

export function StoryBanner() {
    return (
        <section className="py-section px-gutter">
            <div className="bg-primary mx-auto flex max-w-7xl flex-col overflow-hidden rounded-xl text-white shadow-2xl md:flex-row">
                {/* Left content */}
                <div className="p-lg md:p-xxl flex w-full flex-col justify-center md:w-[45%]">
                    <span className="font-label-sm text-secondary-fixed mb-lg block tracking-[0.3em] uppercase">
                        Limited Curation
                    </span>
                    <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-lg leading-tight">
                        The Essential Kits
                    </h2>
                    <p className="font-body-lg mb-xxl leading-relaxed text-white/70">
                        Elevate your entire setup. Save up to 20% with our editor-approved bundles
                        designed for seamless productivity.
                    </p>

                    <div className="space-y-lg mb-xxl">
                        {bundles.map((b) => (
                            <div
                                key={b.name}
                                className="gap-md p-lg flex cursor-pointer items-center rounded-lg border border-white/10 bg-white/5 transition-all hover:bg-white/10"
                            >
                                <div className="bg-surface-container flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-xl md:h-16 md:w-16 md:text-2xl">
                                    {b.icon}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-baseline justify-between gap-sm">
                                        <h4 className="truncate text-[16px] font-semibold md:text-[18px]">{b.name}</h4>
                                        <span className="text-secondary-fixed flex-shrink-0 text-[15px] font-bold md:text-[16px]">
                                            ₹{b.price.toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                    <p className="font-body-md mt-[3px] text-[13px] text-white/50">{b.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link
                        href="/category/bundles"
                        className="text-primary px-xxl py-lg font-label-md text-label-md hover:bg-secondary-fixed rounded-lg bg-white text-center tracking-widest uppercase transition-colors"
                    >
                        Shop All Bundles
                    </Link>
                </div>

                {/* Right image */}
                <div className="group relative min-h-[260px] w-full md:min-h-0 md:w-[55%]">
                    <Image
                        src={BUNDLE_IMG}
                        alt="Essential Kits"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 55vw"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>
            </div>
        </section>
    );
}
