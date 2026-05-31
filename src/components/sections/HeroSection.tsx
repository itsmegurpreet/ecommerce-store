import Image from "next/image";
import Link from "next/link";

const HERO_IMG = "/images/hero/hero-workspace.jpg";

export function HeroSection() {
    return (
        <section className="px-gutter relative flex h-[90vh] w-full items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src={HERO_IMG}
                    alt="Professional minimalist workspace"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/10" />
                {/* Left-side gradient darkens the text area without full-bleed blackout */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
                {/* Bottom fade keeps lower edge clean */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl">
                <div className="fade-in max-w-180">
                    <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-lg text-on-surface leading-[1.1] font-bold">
                        Carry Better.
                        <br />
                        Work Smarter.
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg md:mb-xl max-w-128">
                        Premium accessories for modern work and travel, meticulously designed for
                        the mobile professional.
                    </p>
                    <div className="gap-sm mb-xl md:mb-xxl flex flex-wrap">
                        <Link
                            href="/shop"
                            className="bg-primary px-xl py-[13px] font-label-md text-label-md uppercase tracking-[0.08em] rounded-md text-white transition-all hover:opacity-80 active:scale-[0.98]"
                        >
                            Shop Bestsellers
                        </Link>
                        <Link
                            href="/category/bundles"
                            className="text-primary px-xl py-[13px] font-label-md text-label-md uppercase tracking-[0.08em] rounded-md border border-primary/30 bg-white/70 backdrop-blur-sm transition-all hover:bg-white/90 active:scale-[0.98]"
                        >
                            Explore Bundles
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
