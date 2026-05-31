"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail("");
        }
    };

    return (
        <section className="py-20 sm:py-28">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mx-auto max-w-lg text-center"
                >
                    <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                        Stay in the loop
                    </h2>
                    <p className="text-muted-foreground mb-8 text-[15px]">
                        New arrivals, exclusive drops, and stories from our community. No spam —
                        just the good stuff, once a week.
                    </p>

                    {submitted ? (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-foreground/70 text-[14px]"
                        >
                            Thanks for subscribing. Welcome to Nexora.
                        </motion.p>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="mx-auto flex max-w-md items-center gap-3"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address"
                                required
                                className="bg-muted/50 border-border placeholder:text-muted-foreground/50 focus:ring-foreground/20 flex-1 rounded-lg border px-4 py-3 text-[14px] focus:ring-1 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-foreground text-background flex flex-shrink-0 items-center gap-2 rounded-lg px-5 py-3 text-[14px] font-medium transition-opacity hover:opacity-90"
                            >
                                Subscribe
                                <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        </form>
                    )}

                    <p className="text-muted-foreground/50 mt-4 text-[11px]">
                        By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
