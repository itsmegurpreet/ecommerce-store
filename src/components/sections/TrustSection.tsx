"use client";

import { Leaf, LayoutGrid, PlaneTakeoff } from "lucide-react";

const pillars = [
    {
        Icon: Leaf,
        title: "Durable Materials",
        description:
            "We source high-grade sustainable materials that age beautifully and withstand daily rigors.",
    },
    {
        Icon: LayoutGrid,
        title: "Organized Design",
        description:
            "Every pocket and strap is intentional, designed to keep your tech accessible and secure.",
    },
    {
        Icon: PlaneTakeoff,
        title: "Work-Travel Lifestyle",
        description:
            "Seamlessly transition from the office to the airport with gear that moves at your speed.",
    },
];

export function TrustSection() {
    return (
        <section className="py-section px-gutter bg-background">
            <div className="mb-xxl mx-auto max-w-7xl text-center">
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
                    Designed for the Journey
                </h2>
                <div className="bg-outline-variant mt-lg mx-auto h-px w-24" />
            </div>

            <div className="gap-xxl mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-3">
                {pillars.map(({ Icon, title, description }) => (
                    <div key={title} className="group text-center">
                        <div className="bg-surface-container-high mb-lg text-primary group-hover:bg-primary mx-auto flex h-16 w-16 items-center justify-center rounded-full transition-all group-hover:text-white">
                            <Icon className="h-7 w-7" />
                        </div>
                        <h3 className="mb-md text-[24px] font-semibold">{title}</h3>
                        <p className="font-body-md text-on-surface-variant mx-auto max-w-[18rem] leading-relaxed">
                            {description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
