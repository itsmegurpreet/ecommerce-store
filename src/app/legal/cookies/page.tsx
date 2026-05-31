import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy",
    description: "How SmartDeskHub uses cookies and similar tracking technologies.",
};

export default function CookiePolicyPage() {
    return (
        <article>
            <h1 className="font-serif text-headline-md font-semibold text-primary mb-sm">
                Cookie Policy
            </h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-xxl">
                Last updated: 30 May 2026
            </p>

            <Section title="1. What Are Cookies">
                <p>
                    Cookies are small text files stored on your device when you visit a website.
                    They allow the website to recognise your device on subsequent visits and remember
                    your preferences. We also use similar technologies such as local storage and
                    session storage.
                </p>
            </Section>

            <Section title="2. How We Use Cookies">
                <p>
                    SmartDeskHub uses cookies to keep your shopping session working, remember your
                    preferences, understand how you use the Site, and show you relevant content.
                    We do not use cookies to sell your data to third parties.
                </p>
            </Section>

            <Section title="3. Types of Cookies We Use">
                <CookieTable />
            </Section>

            <Section title="4. Third-Party Cookies">
                <p>
                    Some cookies on this Site are set by third parties. We have no direct control
                    over these cookies. The relevant third parties are:
                </p>
                <ul>
                    <li>
                        <strong>Google Analytics</strong> — website usage analytics. Governed by{" "}
                        <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google&apos;s Privacy Policy
                        </a>
                        .
                    </li>
                    <li>
                        <strong>Razorpay</strong> — payment processing. Governed by{" "}
                        <a
                            href="https://razorpay.com/privacy/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Razorpay&apos;s Privacy Policy
                        </a>
                        .
                    </li>
                </ul>
            </Section>

            <Section title="5. Local Storage">
                <p>
                    In addition to cookies, we use browser local storage to save your cart contents
                    and wishlist between sessions. This data never leaves your device and is not
                    transmitted to our servers until you place an order. You can clear local storage
                    at any time through your browser settings.
                </p>
                <ul>
                    <li>
                        <strong>smartdeskhub_cart</strong> — stores your cart items so they persist if
                        you close and reopen the browser.
                    </li>
                    <li>
                        <strong>smartdeskhub_wishlist</strong> — stores your saved products.
                    </li>
                    <li>
                        <strong>smartdeskhub_user</strong> — stores your login session locally.
                    </li>
                </ul>
            </Section>

            <Section title="6. Managing Cookies">
                <p>
                    You can control cookies through your browser settings. Disabling cookies may
                    affect site functionality — in particular, the shopping cart may not work
                    correctly without session cookies.
                </p>
                <p>Browser cookie settings:</p>
                <ul>
                    <li>
                        <a
                            href="https://support.google.com/chrome/answer/95647"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Chrome
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Mozilla Firefox
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Safari
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Microsoft Edge
                        </a>
                    </li>
                </ul>
            </Section>

            <Section title="7. Changes to This Policy">
                <p>
                    We may update this Cookie Policy as we introduce new features or as regulations
                    change. The &ldquo;Last updated&rdquo; date at the top will reflect any changes.
                </p>
            </Section>

            <Section title="8. Contact">
                <p>
                    Questions about our use of cookies? Email us at{" "}
                    <a href="mailto:privacy@smartdeskhub.in">privacy@smartdeskhub.in</a>.
                </p>
            </Section>
        </article>
    );
}

function CookieTable() {
    const cookies = [
        {
            name: "Strictly Necessary",
            description: "Required for the Site to function. Cannot be disabled.",
            examples: "Session ID, CSRF token, security tokens",
            duration: "Session / up to 1 year",
        },
        {
            name: "Functional",
            description: "Remember your preferences and settings to improve your experience.",
            examples: "Currency preference, recently viewed products",
            duration: "Up to 1 year",
        },
        {
            name: "Analytics",
            description:
                "Help us understand how visitors interact with the Site so we can improve it.",
            examples: "Google Analytics (_ga, _gid)",
            duration: "Up to 2 years",
        },
        {
            name: "Marketing",
            description:
                "Used to deliver relevant advertisements and measure campaign effectiveness.",
            examples: "Meta Pixel, Google Ads",
            duration: "Up to 90 days",
        },
    ];

    return (
        <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
            <table className="w-full text-left font-body-md text-on-surface-variant">
                <thead className="bg-surface-container-low">
                    <tr>
                        {["Category", "Purpose", "Examples", "Duration"].map((h) => (
                            <th
                                key={h}
                                className="px-md py-sm font-label-md text-label-md text-primary border-b border-outline-variant/30"
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {cookies.map((row, i) => (
                        <tr
                            key={row.name}
                            className={i < cookies.length - 1 ? "border-b border-outline-variant/20" : ""}
                        >
                            <td className="px-md py-sm font-medium text-primary whitespace-nowrap">
                                {row.name}
                            </td>
                            <td className="px-md py-sm">{row.description}</td>
                            <td className="px-md py-sm text-on-surface-variant/70">{row.examples}</td>
                            <td className="px-md py-sm whitespace-nowrap">{row.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mb-xl">
            <h2 className="font-serif text-[1.25rem] font-semibold text-primary mb-md leading-snug">
                {title}
            </h2>
            <div className="space-y-sm font-body-md text-on-surface-variant leading-relaxed [&_ul]:pl-md [&_ul]:space-y-xs [&_ul]:list-disc [&_a]:text-secondary [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:opacity-70">
                {children}
            </div>
        </section>
    );
}
