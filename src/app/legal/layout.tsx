import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const legalNav = [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Cookie Policy", href: "/legal/cookies" },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="bg-surface min-h-screen pb-xxl">
            <div className="border-b border-outline-variant/20 bg-surface-container-low">
                <div className="mx-auto max-w-7xl px-gutter py-xxl">
                    <Link
                        href="/"
                        className="mb-md inline-flex items-center gap-xs font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
                    >
                        <ChevronLeft className="h-3.5 w-3.5" />
                        Home
                    </Link>
                    <p className="font-label-md text-label-md mb-sm uppercase tracking-widest text-secondary">
                        Legal
                    </p>
                    <nav className="mt-md flex flex-wrap gap-lg">
                        {legalNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
            <div className="mx-auto max-w-3xl px-gutter pt-xl">{children}</div>
        </section>
    );
}
