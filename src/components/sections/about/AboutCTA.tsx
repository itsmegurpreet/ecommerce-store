"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
    return (
        <section className="border-border/60 border-t py-20 sm:py-28">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                        See what made the cut
                    </h2>
                    <p className="text-muted-foreground mb-10 text-[16px] leading-relaxed">
                        Every product in our store has been tested, debated, and approved by the
                        team. Browse the collection and find something worth keeping.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/shop"
                            className="bg-foreground text-background inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-[14px] font-medium transition-opacity hover:opacity-90"
                        >
                            Browse Collection
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/contact"
                            className="text-muted-foreground hover:text-foreground border-border inline-flex items-center gap-2 rounded-lg border px-7 py-3.5 text-[14px] font-medium transition-colors"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
