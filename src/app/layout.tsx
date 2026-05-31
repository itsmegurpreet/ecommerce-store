import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WishlistProvider } from "@/context/WishlistContext";
import { WishlistDrawer } from "@/components/layout/WishlistDrawer";
import { AuthProvider } from "@/context/AuthContext";
import { RecentlyViewedProvider } from "@/context/RecentlyViewedContext";

const geist = Geist({
    variable: "--font-sans",
    subsets: ["latin"],
    display: "swap",
});

const bodoniModa = Bodoni_Moda({
    variable: "--font-serif",
    subsets: ["latin"],
    display: "swap",
    style: ["normal", "italic"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
    title: {
        default: "SmartDeskHub | Your Desk, Perfected.",
        template: "%s | SmartDeskHub",
    },
    description:
        "Premium accessories for modern work and travel, meticulously designed for the mobile professional.",
    openGraph: {
        type: "website",
        siteName: "SmartDeskHub",
        title: "SmartDeskHub | Your Desk, Perfected.",
        description:
            "Premium accessories for modern work and travel, meticulously designed for the mobile professional.",
        images: [{ url: "/images/hero/hero-workspace.jpg", width: 1600, height: 1065 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "SmartDeskHub | Your Desk, Perfected.",
        description:
            "Premium accessories for modern work and travel, meticulously designed for the mobile professional.",
        images: ["/images/hero/hero-workspace.jpg"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geist.variable} ${bodoniModa.variable}`}
            suppressHydrationWarning
        >
            <body>
                <AuthProvider>
                    <RecentlyViewedProvider>
                    <WishlistProvider>
                        <CartProvider>
                            <AnnouncementBar />
                            <Navbar />
                            <CartDrawer />
                            <WishlistDrawer />
                            <main>{children}</main>
                            <Footer />
                        </CartProvider>
                    </WishlistProvider>
                    </RecentlyViewedProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
