"use client";

import { motion } from "framer-motion";

const stats = [
    { value: "180+", label: "Curated products" },
    { value: "50k", label: "Orders shipped" },
    { value: "4.8", label: "Average rating" },
    { value: "12", label: "Team members" },
    { value: "92%", label: "Repeat customers" },
    { value: "<2%", label: "Return rate" },
];

export function AboutNumbers() {
    return (
        <section className="bg-foreground text-background py-20 sm:py-24">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mb-14 text-center"
                >
                    <p className="text-background/40 mb-3 text-[12px] font-medium tracking-widest uppercase">
                        By the Numbers
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        Small team. Real impact.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                duration: 0.4,
                                ease: [0.25, 0.1, 0.25, 1],
                                delay: i * 0.06,
                            }}
                            className="text-center"
                        >
                            <span className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                {stat.value}
                            </span>
                            <p className="text-background/50 mt-2 text-[13px]">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
