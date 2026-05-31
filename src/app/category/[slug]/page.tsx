import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ShopContent } from "@/app/shop/ShopContent";
import Loading from "@/app/loading";

interface CategoryMeta {
    label: string;
    description: string;
}

const categories: Record<string, CategoryMeta> = {
    workspace: {
        label: "Workspace",
        description:
            "Desk shelves, monitor stands, and organisers built for people who take their setup seriously.",
    },
    "travel-gear": {
        label: "Travel Gear",
        description:
            "Bags, pouches, and carry solutions engineered for frequent flyers and daily commuters alike.",
    },
    tech: {
        label: "Tech",
        description:
            "Keyboards, headphones, webcams, and gadgets selected for build quality and daily performance.",
    },
    accessories: {
        label: "Accessories",
        description:
            "Wallets, cables, notebook covers, and the small-but-essential pieces that complete any kit.",
    },
    bundles: {
        label: "Bundles",
        description:
            "Curated sets combining our best-sellers — better value, zero guesswork on compatibility.",
    },
};

export function generateStaticParams() {
    return Object.keys(categories).map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const cat = categories[slug];
    if (!cat) return {};
    return {
        title: cat.label,
        description: cat.description,
    };
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const cat = categories[slug];
    if (!cat) notFound();

    return (
        <section className="bg-surface min-h-screen pb-xxl">
            <div className="border-b border-outline-variant/20 bg-surface-container-low">
                <div className="mx-auto max-w-7xl px-gutter py-xxl">
                    <p className="font-label-md text-label-md mb-sm uppercase tracking-widest text-secondary">
                        Browse
                    </p>
                    <h1 className="font-serif text-headline-lg font-semibold text-primary">
                        {cat.label}
                    </h1>
                    <p className="font-body-md mt-sm max-w-[32rem] text-on-surface-variant">
                        {cat.description}
                    </p>
                </div>
            </div>
            <Suspense fallback={<Loading />}>
                <ShopContent defaultCategory={slug} />
            </Suspense>
        </section>
    );
}
