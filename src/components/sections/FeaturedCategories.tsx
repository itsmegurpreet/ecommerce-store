"use client";

import Image from "next/image";
import Link from "next/link";

const mainCategories = [
    {
        slug: "workspace",
        name: "Workspace",
        subtitle: "Elevate your desk setup →",
        image: "/images/categories/workspace.jpg",
        colSpan: "md:col-span-2",
    },
    {
        slug: "travel-gear",
        name: "Travel Gear",
        subtitle: "Built for the journey",
        image: "/images/categories/travel-gear.jpg",
        colSpan: "",
    },
];

const stackedCategories = [
    {
        slug: "tech",
        name: "Tech",
        subtitle: "Stay connected",
        image: "/images/categories/tech.jpg",
    },
    {
        slug: "bundles",
        name: "Bundles",
        subtitle: "Curated kits",
        image: "/images/categories/bundles.jpg",
    },
];

export function FeaturedCategories() {
    return (
        <section className="py-section px-gutter mx-auto max-w-7xl">
            {/* Mobile: 2×2 grid. Desktop: 4-col bento */}
            <div className="gap-lg grid grid-cols-2 md:h-150 md:grid-cols-4">
                {/* Workspace — full width on mobile, 2 cols on desktop */}
                <div className="group bento-hover relative col-span-2 h-[220px] cursor-pointer overflow-hidden rounded-lg md:h-full">
                    <Image
                        src={mainCategories[0].image}
                        alt={mainCategories[0].name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <Link href={`/category/${mainCategories[0].slug}`} className="absolute inset-0">
                        <div className="bottom-lg left-lg absolute text-white">
                            <h3 className="text-headline-md mb-xs font-semibold">
                                {mainCategories[0].name}
                            </h3>
                            <p className="font-label-md text-label-md opacity-80 transition-opacity group-hover:opacity-100">
                                {mainCategories[0].subtitle}
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Travel — half width on mobile, 1 col on desktop */}
                <div className="group bento-hover relative h-[160px] cursor-pointer overflow-hidden rounded-lg md:h-full">
                    <Image
                        src={mainCategories[1].image}
                        alt={mainCategories[1].name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <Link href={`/category/${mainCategories[1].slug}`} className="absolute inset-0">
                        <div className="bottom-lg left-lg absolute text-white">
                            <h3 className="text-headline-md mb-xs font-semibold">
                                {mainCategories[1].name}
                            </h3>
                            <p className="font-label-md text-label-md opacity-80 transition-opacity group-hover:opacity-100">
                                {mainCategories[1].subtitle}
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Tech — half width on mobile, 1 col (inside stacked pair) on desktop */}
                {stackedCategories.map((cat) => (
                    <div
                        key={cat.slug}
                        className="group bento-hover relative h-[160px] cursor-pointer overflow-hidden rounded-lg md:hidden"
                    >
                        <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            sizes="50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <Link href={`/category/${cat.slug}`} className="absolute inset-0">
                            <div className="bottom-lg left-lg absolute text-white">
                                <h3 className="mb-xs text-[20px] font-semibold">{cat.name}</h3>
                                <p className="font-label-sm text-label-sm opacity-80">{cat.subtitle}</p>
                            </div>
                        </Link>
                    </div>
                ))}

                {/* Tech + Bundles stacked — desktop only */}
                <div className="gap-lg h-full flex-col hidden md:flex">
                    {stackedCategories.map((cat) => (
                        <div
                            key={cat.slug}
                            className="group bento-hover relative min-h-[250px] flex-1 cursor-pointer overflow-hidden rounded-lg"
                        >
                            <Image
                                src={cat.image}
                                alt={cat.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                sizes="25vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <Link href={`/category/${cat.slug}`} className="absolute inset-0">
                                <div className="bottom-lg left-lg absolute text-white">
                                    <h3 className="mb-xs text-[24px] font-semibold">{cat.name}</h3>
                                    <p className="font-label-sm text-label-sm opacity-80">
                                        {cat.subtitle}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
