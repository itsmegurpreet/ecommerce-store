"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        id: 1,
        initials: "AM",
        name: "Arjun Mehta",
        role: "Product Designer",
        quote: "The Executive Tech Pouch has completely transformed my daily commute. Everything has its place — no more digging.",
        rating: 5,
    },
    {
        id: 2,
        initials: "SC",
        name: "Sarah Chen",
        role: "Remote Engineer",
        quote: "The Madera Desk Mat is the nicest upgrade I've ever made to my setup. Truly premium quality.",
        rating: 5,
    },
    {
        id: 3,
        initials: "RK",
        name: "Rohan Kapoor",
        role: "Startup Founder",
        quote: "I've bought from 5 different bag brands. SmartDeskHub is the only one where the quality matches the aesthetics.",
        rating: 5,
    },
];

export function TestimonialsSection() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: dir === "left" ? -480 : 480,
            behavior: "smooth",
        });
    };

    return (
        <section className="py-section px-gutter bg-surface-container-lowest overflow-hidden">
            <div className="mx-auto max-w-7xl">
                <div className="mb-xxl flex items-end justify-between">
                    <div>
                        <span className="font-label-sm text-label-sm text-secondary mb-xs block tracking-[0.2em] uppercase">
                            What They Say
                        </span>
                        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
                            Voices from the field
                        </h2>
                    </div>
                    <div className="gap-md flex">
                        <button
                            onClick={() => scroll("left")}
                            className="bg-surface-container text-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full transition-all hover:text-white"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="bg-surface-container text-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full transition-all hover:text-white"
                            aria-label="Next"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="gap-lg no-scrollbar pb-sm flex snap-x snap-mandatory overflow-x-auto"
                >
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="p-lg md:p-xxl min-w-[85vw] flex-shrink-0 snap-start rounded-lg bg-white shadow-sm md:min-w-[450px]"
                        >
                            {/* Stars */}
                            <div className="text-secondary mb-lg flex">
                                {[...Array(t.rating)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-primary mb-xl font-serif text-[22px] leading-relaxed italic md:text-[28px]">
                                &ldquo;{t.quote}&rdquo;
                            </blockquote>

                            {/* Author */}
                            <div className="gap-md mt-auto flex items-center">
                                <div className="bg-surface-container-high font-label-md text-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="font-label-md text-label-md text-primary">
                                        {t.name}
                                    </p>
                                    <p className="font-body-md text-on-surface-variant">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
