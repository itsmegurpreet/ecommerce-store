import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "The terms and conditions governing your use of SmartDeskHub.",
};

export default function TermsPage() {
    return (
        <article>
            <h1 className="font-serif text-headline-md font-semibold text-primary mb-sm">
                Terms of Service
            </h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-xxl">
                Last updated: 30 May 2026
            </p>

            <Section title="1. Acceptance of Terms">
                <p>
                    By accessing or using smartdeskhub.in (the &ldquo;Site&rdquo;), placing an order,
                    or creating an account, you agree to be bound by these Terms of Service and our{" "}
                    <a href="/legal/privacy">Privacy Policy</a>. If you do not agree, do not use
                    the Site.
                </p>
                <p>
                    These terms are governed by the laws of India, including the Consumer Protection
                    Act 2019, the Information Technology Act 2000, and the Indian Contract Act 1872.
                </p>
            </Section>

            <Section title="2. Eligibility">
                <p>
                    You must be at least 18 years old and capable of entering a legally binding
                    contract to use this Site and place orders. By using the Site you represent
                    that you meet these requirements.
                </p>
            </Section>

            <Section title="3. Your Account">
                <ul>
                    <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                    <li>You are responsible for all activity that occurs under your account.</li>
                    <li>Notify us immediately at <a href="mailto:support@smartdeskhub.in">support@smartdeskhub.in</a> if you suspect unauthorised access.</li>
                    <li>We reserve the right to terminate accounts that violate these Terms or are used for fraudulent activity.</li>
                </ul>
            </Section>

            <Section title="4. Products and Pricing">
                <ul>
                    <li>All prices are listed in Indian Rupees (₹) and include GST unless stated otherwise.</li>
                    <li>We reserve the right to change prices at any time. The price at the time of your order confirmation is the price you will be charged.</li>
                    <li>Product descriptions, images, and specifications are provided in good faith. Minor variations in colour due to screen calibration are not grounds for return unless the product is materially different from the description.</li>
                    <li>We reserve the right to limit quantities or refuse orders at our discretion.</li>
                    <li>In the event of a pricing error, we will notify you and give you the option to proceed at the correct price or cancel for a full refund.</li>
                </ul>
            </Section>

            <Section title="5. Orders and Payment">
                <ul>
                    <li>An order confirmation email constitutes acceptance of your order.</li>
                    <li>We accept payment via the methods listed at checkout. All payments are processed securely by our payment partners.</li>
                    <li>You represent that the payment information you provide is accurate and that you are authorised to use the payment method.</li>
                    <li>We reserve the right to cancel orders suspected of fraud.</li>
                </ul>
            </Section>

            <Section title="6. Shipping and Delivery">
                <p>
                    Delivery timelines are estimates and not guarantees. We are not liable for delays
                    caused by logistics partners, natural events, or circumstances beyond our control.
                    Risk of loss transfers to you upon handover to the carrier. See our{" "}
                    <a href="/shipping">Shipping Policy</a> for full details.
                </p>
            </Section>

            <Section title="7. Returns and Refunds">
                <p>
                    We accept returns within 7 days of delivery for unused, undamaged products in
                    original packaging. Refunds are processed to the original payment method within
                    5–7 business days of receiving the returned item. See our{" "}
                    <a href="/returns">Returns Policy</a> for full details.
                </p>
            </Section>

            <Section title="8. Intellectual Property">
                <p>
                    All content on this Site — including text, images, logos, product designs, and
                    code — is the property of SmartDeskHub Technologies Pvt. Ltd. or its licensors and
                    is protected by Indian and international intellectual property law. You may not
                    reproduce, distribute, or create derivative works without our written permission.
                </p>
            </Section>

            <Section title="9. Prohibited Conduct">
                <p>You agree not to:</p>
                <ul>
                    <li>Use the Site for any unlawful purpose.</li>
                    <li>Attempt to gain unauthorised access to any part of the Site or its infrastructure.</li>
                    <li>Transmit spam, malware, or harmful code.</li>
                    <li>Scrape, crawl, or systematically extract data from the Site without written permission.</li>
                    <li>Post false reviews or engage in deceptive practices.</li>
                </ul>
            </Section>

            <Section title="10. Disclaimer of Warranties">
                <p>
                    The Site and its content are provided &ldquo;as is&rdquo; without warranty of
                    any kind. We do not warrant that the Site will be uninterrupted, error-free, or
                    free of viruses. To the fullest extent permitted by law, we disclaim all
                    implied warranties.
                </p>
            </Section>

            <Section title="11. Limitation of Liability">
                <p>
                    To the maximum extent permitted by applicable law, SmartDeskHub&apos;s total
                    liability for any claim arising from these Terms or your use of the Site is
                    limited to the amount you paid for the order giving rise to the claim. We are
                    not liable for indirect, incidental, or consequential damages.
                </p>
                <p>
                    Nothing in these Terms limits liability for fraud, death or personal injury
                    caused by negligence, or any other liability that cannot be limited by law.
                </p>
            </Section>

            <Section title="12. Governing Law and Disputes">
                <p>
                    These Terms are governed by the laws of India. Any disputes shall first be
                    attempted to be resolved amicably. If unresolved, disputes shall be subject to
                    the exclusive jurisdiction of the courts of Bengaluru, Karnataka.
                </p>
            </Section>

            <Section title="13. Changes to These Terms">
                <p>
                    We may revise these Terms at any time. Continued use of the Site after changes
                    are posted constitutes acceptance of the revised Terms.
                </p>
            </Section>

            <Section title="14. Contact">
                <p>
                    For questions about these Terms, contact us at{" "}
                    <a href="mailto:legal@smartdeskhub.in">legal@smartdeskhub.in</a> or write to
                    SmartDeskHub Technologies Pvt. Ltd., Bengaluru, Karnataka, India.
                </p>
            </Section>
        </article>
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
