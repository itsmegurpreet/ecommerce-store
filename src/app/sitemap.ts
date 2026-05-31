import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/services/products.service";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://smartdeskhub.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await getProducts();
    const now = new Date();

    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
        { url: `${BASE_URL}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${BASE_URL}/shipping`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
        { url: `${BASE_URL}/returns`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
        { url: `${BASE_URL}/track`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
        { url: `${BASE_URL}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        { url: `${BASE_URL}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        { url: `${BASE_URL}/legal/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ];

    const categoryPages: MetadataRoute.Sitemap = [
        "workspace",
        "travel-gear",
        "tech",
        "accessories",
        "bundles",
    ].map((slug) => ({
        url: `${BASE_URL}/category/${slug}`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.8,
    }));

    const productPages: MetadataRoute.Sitemap = products.map((p: { slug: string }) => ({
        url: `${BASE_URL}/product/${p.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    return [...staticPages, ...categoryPages, ...productPages];
}
