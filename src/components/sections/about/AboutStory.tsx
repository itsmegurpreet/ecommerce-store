"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const timeline = [
    {
        year: "2023",
        title: "The idea",
        description:
            'Two designers and an engineer frustrated with buying mediocre products online. The first spreadsheet of "things we\'d actually recommend" becomes the seed of Nexora.',
    },
    {
        year: "2024",
        title: "First 50 products",
        description:
            "We launched with 50 hand-tested products and a Shopify store. No marketing budget — just word of mouth and a genuine obsession with getting the details right.",
    },
    {
        year: "2025",
        title: "Growing intentionally",
        description:
            "10,000 customers. We moved to our own platform, hired our first full-time buyer, and turned down three investment offers that would have pushed us toward volume.",
    },
    {
        year: "2026",
        title: "Where we are now",
        description:
            "A team of 12, a catalog of 180 products, and a community that trusts us to do the filtering for them. Still small. Still picky. Still us.",
    },
];

export function AboutStory() {
    return (
        <section className="py-20 sm:py-28">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <div className="grid gap-16 lg:grid-cols-[1fr,1.2fr] lg:gap-24">
                    {/* Timeline */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                            className="mb-14"
                        >
                            <p className="text-muted-foreground/70 mb-3 text-[12px] font-medium tracking-widest uppercase">
                                Our Story
                            </p>
                            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                How we got here
                            </h2>
                        </motion.div>

                        <div className="space-y-12">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: -12 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.25, 0.1, 0.25, 1],
                                        delay: i * 0.08,
                                    }}
                                    className="border-border/70 relative border-l pl-8"
                                >
                                    <div className="bg-foreground/60 absolute top-0.5 left-0 h-2 w-2 -translate-x-[5px] rounded-full" />
                                    <span className="text-muted-foreground/60 text-[12px] font-medium tracking-widest uppercase">
                                        {item.year}
                                    </span>
                                    <h3 className="mt-1.5 mb-2 text-[15px] font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground text-[14px] leading-[1.7]">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Images — stacked, editorial */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                            className="bg-muted relative aspect-[3/2] overflow-hidden rounded-lg"
                        >
                            <Image
                                src="/images/about/detail-hands.jpg"
                                alt="Team reviewing product quality details"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 55vw"
                                loading="lazy"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.7,
                                ease: [0.25, 0.1, 0.25, 1],
                                delay: 0.1,
                            }}
                            className="bg-muted relative aspect-[16/10] overflow-hidden rounded-lg"
                        >
                            <Image
                                src="/images/about/packaging.jpg"
                                alt="Nexora product packaging and unboxing experience"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 55vw"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
