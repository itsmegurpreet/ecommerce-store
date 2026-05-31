import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Returns & Exchanges",
    description: "How to return or exchange an SmartDeskHub product.",
};

export default function ReturnsPage() {
    return (
        <section className="bg-surface min-h-screen pb-xxl">
            <div className="border-b border-outline-variant/20 bg-surface-container-low">
                <div className="mx-auto max-w-7xl px-gutter py-xxl">
                    <p className="font-label-md text-label-md mb-sm uppercase tracking-widest text-secondary">
                        Returns
                    </p>
                    <h1 className="font-serif text-headline-md font-semibold text-primary">
                        Returns &amp; Exchanges
                    </h1>
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-gutter pt-xl space-y-xl">
                <Prose title="Return Window">
                    <p>
                        We accept returns within <strong>7 days of delivery</strong> for unused,
                        undamaged products in their original packaging with all accessories and
                        documentation included.
                    </p>
                </Prose>

                <Prose title="What Can Be Returned">
                    <p>
                        Most products are eligible for return. The following are <strong>not</strong> eligible:
                    </p>
                    <ul>
                        <li>Products that have been used, washed, or altered.</li>
                        <li>Products with removed tags or damaged original packaging.</li>
                        <li>Personalised or custom-ordered items.</li>
                        <li>Consumables (notebook refills, USB cables that show signs of use).</li>
                        <li>Bundle components returned individually (the full bundle must be returned).</li>
                    </ul>
                </Prose>

                <Prose title="How to Initiate a Return">
                    <ol>
                        <li>Email <a href="mailto:support@smartdeskhub.in" className="text-secondary underline underline-offset-4">support@smartdeskhub.in</a> with your order number and the reason for return.</li>
                        <li>Our team will respond within one business day with a return authorisation and a prepaid shipping label.</li>
                        <li>Pack the item securely in its original packaging and drop it off at any Delhivery/Bluedart drop point.</li>
                        <li>Once we receive and inspect the item, we will process your refund or exchange within 2 business days.</li>
                    </ol>
                </Prose>

                <Prose title="Refunds">
                    <p>
                        Refunds are credited to the original payment method within <strong>5–7 business days</strong> after we receive and approve the return.
                    </p>
                    <p>
                        For Cash on Delivery orders, refunds are issued as a bank transfer (NEFT/IMPS) — please provide your account details when initiating the return.
                    </p>
                    <p>
                        Original shipping charges are non-refundable unless the return is due to our error (wrong item sent, manufacturing defect).
                    </p>
                </Prose>

                <Prose title="Exchanges">
                    <p>
                        We offer exchanges for a different size or colour of the same product, subject to availability. Raise an exchange request the same way as a return. Once we receive your item, we will dispatch the replacement within 2 business days.
                    </p>
                </Prose>

                <Prose title="Defective or Wrong Items">
                    <p>
                        If you receive a defective or incorrect item, email us within <strong>48 hours of delivery</strong> with photos. We will reship the correct item at no cost or issue a full refund — your choice.
                    </p>
                </Prose>

                <p className="font-body-md text-on-surface-variant">
                    More questions? See our <Link href="/faq" className="text-secondary underline underline-offset-4">FAQ</Link> or{" "}
                    <Link href="/contact" className="text-secondary underline underline-offset-4">contact our support team</Link>.
                </p>
            </div>
        </section>
    );
}

function Prose({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h2 className="font-serif text-[1.25rem] font-semibold text-primary mb-md">{title}</h2>
            <div className="space-y-sm font-body-md text-on-surface-variant leading-relaxed [&_ul]:pl-md [&_ul]:space-y-xs [&_ul]:list-disc [&_ol]:pl-md [&_ol]:space-y-xs [&_ol]:list-decimal [&_a]:text-secondary [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:opacity-70 [&_strong]:text-primary [&_strong]:font-semibold">
                {children}
            </div>
        </div>
    );
}
