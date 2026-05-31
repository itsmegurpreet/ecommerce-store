import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, RotateCcw, Shield, Truck } from "lucide-react";
import { getProducts, getProductBySlug } from "@/lib/services/products.service";
import { ProductCard } from "@/components/sections/ProductCard";
import { ProductActions } from "./ProductActions";
import { BundleSuggestion } from "@/components/sections/BundleSuggestion";
import { RecentlyViewed } from "@/components/sections/RecentlyViewed";

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) return {};
    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [{ url: product.image }],
        },
    };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const [product, allProducts] = await Promise.all([
        getProductBySlug(slug),
        getProducts(),
    ]);
    if (!product) notFound();

    const related = allProducts
        .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
        .slice(0, 4);

    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : null;

    const isLowStock = product.stockCount !== undefined && product.stockCount <= 4;

    return (
        <div className="min-h-screen bg-surface">
            <div className="mx-auto max-w-7xl px-gutter py-xl">
                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="mb-xl flex items-center gap-xs font-label-sm text-label-sm text-on-surface-variant"
                >
                    <Link href="/" className="transition-colors hover:text-primary">
                        Home
                    </Link>
                    <ChevronRight className="h-3 w-3 flex-shrink-0" />
                    <Link
                        href="/shop"
                        className="transition-colors hover:text-primary"
                    >
                        Shop
                    </Link>
                    <ChevronRight className="h-3 w-3 flex-shrink-0" />
                    <Link
                        href={`/shop?category=${product.categorySlug}`}
                        className="transition-colors hover:text-primary"
                    >
                        {product.category}
                    </Link>
                    <ChevronRight className="h-3 w-3 flex-shrink-0" />
                    <span className="text-primary font-medium truncate">{product.name}</span>
                </nav>

                {/* Product layout */}
                <div className="grid grid-cols-1 gap-xxl lg:grid-cols-2">
                    {/* ── Left: Image ── */}
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-container-low">
                        <Image
                            src={product.image}
                            alt={`${product.name} — ${product.brand ?? product.category}`}
                            fill
                            priority
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {discount && (
                            <div className="absolute top-lg left-lg rounded-full bg-secondary px-sm py-xs font-label-sm text-label-sm text-on-secondary">
                                −{discount}%
                            </div>
                        )}
                        {product.badge === "new" && !discount && (
                            <div className="absolute top-lg left-lg rounded-full bg-primary px-sm py-xs font-label-sm text-label-sm text-on-primary">
                                New
                            </div>
                        )}
                    </div>

                    {/* ── Right: Details ── */}
                    <div className="flex flex-col justify-center space-y-lg">
                        {/* Brand + name */}
                        {product.brand && (
                            <p className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
                                {product.brand}
                            </p>
                        )}
                        <h1 className="font-serif text-headline-lg-mobile font-semibold text-primary md:text-headline-lg leading-tight">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-sm">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                            i < Math.floor(product.rating)
                                                ? "fill-secondary text-secondary"
                                                : i < product.rating
                                                  ? "fill-secondary/50 text-secondary"
                                                  : "fill-outline-variant text-outline-variant"
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                                {product.rating.toFixed(1)} · {product.reviewCount.toLocaleString("en-IN")} reviews
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-md">
                            <p className="text-[2rem] font-bold leading-none text-primary">
                                ₹{product.price.toLocaleString("en-IN")}
                            </p>
                            {product.originalPrice && (
                                <p className="font-body-lg text-on-surface-variant line-through">
                                    ₹{product.originalPrice.toLocaleString("en-IN")}
                                </p>
                            )}
                            {discount && (
                                <p className="font-label-md text-label-md text-secondary">
                                    Save {discount}%
                                </p>
                            )}
                        </div>

                        {/* Stock warning */}
                        {isLowStock && product.inStock && (
                            <p className="font-label-md text-label-md text-error">
                                Only {product.stockCount} left in stock
                            </p>
                        )}

                        {/* Description */}
                        <p className="font-body-lg text-on-surface-variant leading-relaxed">
                            {product.description}
                        </p>

                        {/* Variant + quantity + add to cart */}
                        <ProductActions product={product} />

                        {/* Trust signals */}
                        <div className="grid grid-cols-1 gap-sm border-t border-outline-variant/20 pt-lg sm:grid-cols-3">
                            {(
                                [
                                    { Icon: Truck, label: "Free above ₹2,999" },
                                    { Icon: RotateCcw, label: "7-day returns" },
                                    { Icon: Shield, label: "Secure checkout" },
                                ] as const
                            ).map(({ Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-xs text-on-surface-variant"
                                >
                                    <Icon className="h-4 w-4 flex-shrink-0" />
                                    <p className="font-label-sm text-label-sm">{label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Bundle suggestion */}
                        <BundleSuggestion product={product} />
                    </div>
                </div>

                {/* Related products */}
                {related.length > 0 && (
                    <div className="mt-section">
                        <div className="mb-xl flex items-end justify-between">
                            <h2 className="font-serif text-headline-md font-semibold text-primary">
                                More from {product.category}
                            </h2>
                            <Link
                                href="/shop"
                                className="font-label-md text-label-md text-secondary underline underline-offset-4 transition-opacity hover:opacity-70"
                            >
                                View all
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
                            {related.map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Recently viewed */}
                <RecentlyViewed currentProductId={product.id} />
            </div>
        </div>
    );
}
