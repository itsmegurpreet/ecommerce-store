import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
    title: "FAQ",
    description: "Answers to the most common questions about ordering, shipping, and returns.",
};

const faqs = [
    {
        q: "What payment methods do you accept?",
        a: "We accept UPI, credit and debit cards (Visa, Mastercard, RuPay), net banking, and Cash on Delivery for eligible pin codes.",
    },
    {
        q: "How long does delivery take?",
        a: "Standard delivery takes 3–6 business days across India. Metro cities typically receive orders within 2–3 business days. Express shipping (1–2 days) is available at checkout for select pin codes.",
    },
    {
        q: "Is there a minimum order value for free shipping?",
        a: "Orders above ₹2,999 qualify for free standard shipping. Orders below that threshold are charged a flat ₹149 shipping fee.",
    },
    {
        q: "Can I change or cancel my order after placing it?",
        a: "You can cancel or modify your order within 2 hours of placement by contacting us at support@smartdeskhub.in. Once the order is dispatched, it cannot be changed.",
    },
    {
        q: "What is your return policy?",
        a: "We accept returns within 7 days of delivery for unused products in their original packaging. See our full Returns Policy for details.",
    },
    {
        q: "How do I track my order?",
        a: "Once your order is dispatched, you will receive a tracking link by email. You can also use our Track Order page with your order ID.",
    },
    {
        q: "Do you ship internationally?",
        a: "Not yet. We currently ship only within India. International shipping is on our roadmap.",
    },
    {
        q: "Are your products covered by a warranty?",
        a: "Electronics (headphones, keyboards, smart devices) carry the manufacturer's warranty — typically 1 year. Bags and leather goods are covered by our 6-month craftsmanship guarantee against manufacturing defects.",
    },
    {
        q: "How do I contact customer support?",
        a: "Email us at support@smartdeskhub.in or use the contact form on our Contact page. We respond within one business day.",
    },
    {
        q: "Is my payment information secure?",
        a: "Yes. All transactions are processed by Razorpay, a PCI-DSS Level 1 certified payment gateway. We never store your card details on our servers.",
    },
];

export default function FAQPage() {
    return (
        <section className="bg-surface min-h-screen pb-xxl">
            <div className="border-b border-outline-variant/20 bg-surface-container-low">
                <div className="mx-auto max-w-7xl px-gutter py-xxl">
                    <p className="font-label-md text-label-md mb-sm uppercase tracking-widest text-secondary">
                        Help
                    </p>
                    <h1 className="font-serif text-headline-md font-semibold text-primary">
                        Frequently Asked Questions
                    </h1>
                    <p className="font-body-md mt-sm text-on-surface-variant">
                        Can&apos;t find the answer here?{" "}
                        <Link
                            href="/contact"
                            className="text-secondary underline underline-offset-4 transition-opacity hover:opacity-70"
                        >
                            Contact us
                        </Link>
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-gutter pt-xl">
                <div className="divide-y divide-outline-variant/30">
                    {faqs.map(({ q, a }) => (
                        <details key={q} className="group py-md">
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-md font-body-md font-medium text-primary">
                                {q}
                                <ChevronDown className="mt-0.5 h-4 w-4 flex-shrink-0 text-on-surface-variant transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <p className="mt-sm font-body-md text-on-surface-variant leading-relaxed pr-8">
                                {a}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
