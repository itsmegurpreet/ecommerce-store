"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { apiClient } from "@/lib/api-client";
import type { Brand } from "@/types";

export function BrandLogos() {
    const [brands, setBrands] = useState<Brand[]>([]);

    useEffect(() => {
        apiClient.brands.list().then(setBrands).catch(console.error);
    }, []);

    return (
        <section className="bg-muted/30 py-16 sm:py-20">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <p className="text-muted-foreground/50 mb-10 text-center text-[12px] font-medium tracking-widest uppercase">
                    Brands we carry
                </p>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16"
                >
                    {brands.map((brand) => (
                        <div
                            key={brand.id}
                            className="opacity-40 grayscale transition-opacity duration-300 hover:opacity-70"
                        >
                            <Image
                                src={brand.logo}
                                alt={brand.name}
                                width={100}
                                height={28}
                                className="h-6 w-auto sm:h-7 dark:invert"
                                style={{ width: "auto" }}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
