"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const team = [
    {
        name: "Daniel Park",
        role: "Co-founder & CEO",
        image: "/images/about/founder.jpg",
        bio: "Former product designer at Figma. Spent 6 years obsessing over details before deciding to apply that same rigor to physical products.",
    },
    {
        name: "Lena Müller",
        role: "Co-founder & Head of Curation",
        image: "/images/avatars/avatar-3.jpg",
        bio: "Ex-buyer at MoMA Design Store. If it's on Nexora, it passed through Lena's hands — and her very high standards — first.",
    },
    {
        name: "Tomás Reyes",
        role: "CTO",
        image: "/images/avatars/avatar-2.jpg",
        bio: "Built the platform from scratch. Previously engineering at Stripe. Believes the best technology is the kind you don't notice.",
    },
];

export function AboutTeam() {
    return (
        <section className="py-20 sm:py-28">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mb-16 max-w-xl"
                >
                    <p className="text-muted-foreground/70 mb-3 text-[12px] font-medium tracking-widest uppercase">
                        The Team
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        People who care too much
                    </h2>
                    <p className="text-muted-foreground mt-4 text-[15px] leading-relaxed">
                        We&apos;re a small team on purpose. Everyone here has a say in what we
                        carry, how we present it, and where we&apos;re headed.
                    </p>
                </motion.div>

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                    {team.map((person, i) => (
                        <motion.div
                            key={person.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                duration: 0.45,
                                ease: [0.25, 0.1, 0.25, 1],
                                delay: i * 0.1,
                            }}
                        >
                            <div className="bg-muted relative mb-5 aspect-[3/4] overflow-hidden rounded-lg">
                                <Image
                                    src={person.image}
                                    alt={person.name}
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="text-[16px] font-semibold">{person.name}</h3>
                            <p className="text-muted-foreground mt-0.5 mb-3 text-[13px]">
                                {person.role}
                            </p>
                            <p className="text-muted-foreground/80 text-[14px] leading-[1.65]">
                                {person.bio}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
