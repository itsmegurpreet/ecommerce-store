"use client";

import Image from "next/image";
import Link from "next/link";

const posts = [
    "/images/categories/workspace.jpg",
    "/images/categories/travel-gear.jpg",
    "/images/hero/workspace.jpg",
    "/images/categories/tech.jpg",
    "/images/story/essential-kits.jpg",
];

export function InstagramSection() {
    return (
        <section className="py-section px-gutter border-outline-variant/10 border-t">
            <div className="mb-xl text-center">
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
                    #SmartDeskHubLife
                </h2>
                <p className="font-body-md text-on-surface-variant mt-sm">Follow us on Instagram</p>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
                {posts.map((src, i) => (
                    <Link
                        key={i}
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-square overflow-hidden rounded-md"
                    >
                        <Image
                            src={src}
                            alt={`SmartDeskHubLife post ${i + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 20vw"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                            <span className="font-label-md text-white opacity-0 transition-opacity group-hover:opacity-100">
                                ♥ View
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
