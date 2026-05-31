import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopContent } from "./ShopContent";
import Loading from "../loading";

export const metadata: Metadata = {
    title: "Shop",
    description:
        "Browse our curated collection of premium workspace tools, smart gadgets, and lifestyle essentials.",
};

export default function ShopPage() {
    return (
        <section className="bg-surface min-h-screen pb-xxl">
            {/* Page header */}
            <div className="border-b border-outline-variant/20 bg-surface-container-low">
                <div className="mx-auto max-w-7xl px-gutter py-xxl">
                    <p className="font-label-md text-label-md mb-sm uppercase tracking-widest text-secondary">
                        All Products
                    </p>
                    <h1 className="font-serif text-headline-lg font-semibold text-primary">
                        The Full Range
                    </h1>
                    <p className="font-body-md mt-sm max-w-[32rem] text-on-surface-variant">
                        Every piece selected for build quality, daily utility, and the kind of
                        finish that earns a second look.
                    </p>
                </div>
            </div>
            <Suspense fallback={<Loading />}>
                <ShopContent />
            </Suspense>
        </section>
    );
}
