"use client";

import { motion } from "framer-motion";
import { Eye, Package, Recycle, Users } from "lucide-react";

const values = [
    {
        icon: Eye,
        title: "Obsessive Curation",
        description:
            "We reject more products than we accept. Our team tests everything in-house before it ever reaches the store. If we wouldn't buy it ourselves, we don't sell it.",
    },
    {
        icon: Package,
        title: "Honest Presentation",
        description:
            "No lifestyle inflation. No misleading photography. We show products as they actually look and describe them as they actually perform. What you see is what arrives.",
    },
    {
        icon: Recycle,
        title: "Longevity Over Trends",
        description:
            "We prioritize products built to last over products built to trend. A desk shelf that ages well matters more to us than one that photographs well for a month.",
    },
    {
        icon: Users,
        title: "Community First",
        description:
            "Our customers are the reason we exist, not a metric. We read every review, respond to every email, and use feedback to refine what we carry.",
    },
];

export function AboutValues() {
    return (
        <section className="border-border/60 bg-muted/20 border-y py-20 sm:py-28">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mb-16 max-w-xl"
                >
                    <p className="text-muted-foreground/70 mb-3 text-[12px] font-medium tracking-widest uppercase">
                        What We Stand For
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        Principles, not slogans
                    </h2>
                    <p className="text-muted-foreground mt-4 text-[15px] leading-relaxed">
                        These aren&apos;t values we put on a wall. They&apos;re decisions we make
                        every day about what to carry, how to present it, and who we answer to.
                    </p>
                </motion.div>

                <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:gap-x-20">
                    {values.map((value, i) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                duration: 0.45,
                                ease: [0.25, 0.1, 0.25, 1],
                                delay: i * 0.08,
                            }}
                        >
                            <value.icon
                                className="text-foreground/70 mb-4 h-5 w-5"
                                strokeWidth={1.5}
                            />
                            <h3 className="mb-2.5 text-[16px] font-semibold tracking-tight">
                                {value.title}
                            </h3>
                            <p className="text-muted-foreground text-[14px] leading-[1.7]">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
