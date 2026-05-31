"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutMission() {
    return (
        <section className="pb-24 sm:pb-32">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Image — asymmetric, editorial */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                        className="bg-muted relative aspect-[4/5] overflow-hidden rounded-lg"
                    >
                        <Image
                            src="/images/about/team-workspace.jpg"
                            alt="The Nexora team workspace — clean, minimal, intentional"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                        />
                    </motion.div>

                    {/* Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                    >
                        <p className="text-muted-foreground/70 mb-4 text-[12px] font-medium tracking-widest uppercase">
                            Our Mission
                        </p>
                        <h2 className="mb-6 text-2xl leading-[1.2] font-semibold tracking-tight sm:text-[28px]">
                            Less choice.
                            <br />
                            Better choices.
                        </h2>
                        <div className="text-muted-foreground space-y-5 text-[15px] leading-[1.7]">
                            <p>
                                Most marketplaces compete on selection. We compete on curation. Our
                                catalog is deliberately small — under 200 products — because we
                                believe having fewer, better options is a feature, not a limitation.
                            </p>
                            <p>
                                Every product on Nexora goes through a review process that takes
                                weeks. We buy it, use it, break it down, and decide whether it meets
                                our standard. If it doesn&apos;t, it doesn&apos;t ship. There&apos;s
                                no sponsorship tier. No pay-to-play.
                            </p>
                            <p>
                                The result is a store where you can buy with confidence. If
                                it&apos;s on Nexora, it&apos;s worth your money.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
