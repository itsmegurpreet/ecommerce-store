"use client";

import { motion } from "framer-motion";

export function AboutHero() {
    return (
        <section className="pt-20 pb-16 sm:pt-32 sm:pb-24">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="max-w-3xl"
                >
                    <p className="text-muted-foreground mb-6 text-[13px] font-medium tracking-widest uppercase">
                        About Nexora
                    </p>
                    <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] font-semibold tracking-tight">
                        We built the store
                        <br />
                        we wished existed.
                    </h1>
                    <p className="text-muted-foreground mt-8 max-w-2xl text-[18px] leading-[1.65] sm:text-[20px]">
                        Nexora started as a question: why is it so hard to find products that are
                        genuinely well-made? Not marketed as premium — actually premium. We got
                        tired of sifting through noise, so we built a place where every product
                        earns its shelf.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
