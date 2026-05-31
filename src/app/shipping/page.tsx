import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, MapPin, Package } from "lucide-react";

export const metadata: Metadata = {
    title: "Shipping Policy",
    description: "Delivery timelines, shipping rates, and coverage for SmartDeskHub orders.",
};

export default function ShippingPage() {
    return (
        <section className="bg-surface min-h-screen pb-xxl">
            <div className="border-b border-outline-variant/20 bg-surface-container-low">
                <div className="mx-auto max-w-7xl px-gutter py-xxl">
                    <p className="font-label-md text-label-md mb-sm uppercase tracking-widest text-secondary">
                        Delivery
                    </p>
                    <h1 className="font-serif text-headline-md font-semibold text-primary">
                        Shipping Policy
                    </h1>
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-gutter pt-xl space-y-xl">
                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                        { icon: Truck, label: "Free shipping", value: "Above ₹2,999" },
                        { icon: Clock, label: "Standard", value: "3–6 days" },
                        { icon: Package, label: "Express", value: "1–2 days" },
                        { icon: MapPin, label: "Coverage", value: "Pan India" },
                    ].map(({ icon: Icon, label, value }) => (
                        <div
                            key={label}
                            className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-md text-center"
                        >
                            <Icon className="mx-auto mb-xs h-5 w-5 text-secondary" />
                            <p className="font-label-sm text-label-sm text-on-surface-variant">{label}</p>
                            <p className="font-label-md text-label-md font-semibold text-primary mt-xs">
                                {value}
                            </p>
                        </div>
                    ))}
                </div>

                <Prose title="Shipping Rates">
                    <table className="w-full text-left rounded-xl overflow-hidden border border-outline-variant/30">
                        <thead className="bg-surface-container-low">
                            <tr>
                                {["Order value", "Shipping fee", "Estimated delivery"].map((h) => (
                                    <th key={h} className="px-md py-sm font-label-md text-label-md text-primary border-b border-outline-variant/30">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="font-body-md text-on-surface-variant divide-y divide-outline-variant/20">
                            <tr>
                                <td className="px-md py-sm">Below ₹2,999</td>
                                <td className="px-md py-sm font-medium text-primary">₹149</td>
                                <td className="px-md py-sm">3–6 business days</td>
                            </tr>
                            <tr>
                                <td className="px-md py-sm">₹2,999 and above</td>
                                <td className="px-md py-sm font-medium text-secondary">Free</td>
                                <td className="px-md py-sm">3–6 business days</td>
                            </tr>
                            <tr>
                                <td className="px-md py-sm">Express (any value)</td>
                                <td className="px-md py-sm font-medium text-primary">₹299</td>
                                <td className="px-md py-sm">1–2 business days</td>
                            </tr>
                        </tbody>
                    </table>
                </Prose>

                <Prose title="Order Processing">
                    <p>Orders placed before 2 pm IST on a business day are dispatched the same day. Orders placed after 2 pm or on weekends and public holidays are dispatched the next business day.</p>
                    <p>You will receive a dispatch confirmation email with a tracking link as soon as your order ships.</p>
                </Prose>

                <Prose title="Coverage">
                    <p>We ship to all serviceable pin codes across India via Delhivery, Bluedart, and Xpressbees. Some remote pin codes may only be reachable via India Post and could take up to 10 business days.</p>
                    <p>If your pin code is not serviceable, you will be notified at checkout before payment.</p>
                </Prose>

                <Prose title="Delivery Attempts">
                    <p>Our logistics partner will attempt delivery up to 3 times. If delivery is unsuccessful after 3 attempts, the parcel is returned to our warehouse and a refund (minus ₹149 return logistics cost) is issued.</p>
                </Prose>

                <Prose title="Damaged or Lost Shipments">
                    <p>If your order arrives visibly damaged, refuse the delivery and email us within 24 hours at <a href="mailto:support@smartdeskhub.in" className="text-secondary underline underline-offset-4">support@smartdeskhub.in</a> with photos. We will reship at no cost.</p>
                    <p>If your tracking shows &ldquo;delivered&rdquo; but you did not receive the parcel, contact us within 48 hours. We will open an investigation with the carrier.</p>
                </Prose>

                <p className="font-body-md text-on-surface-variant">
                    Questions? Visit our <Link href="/faq" className="text-secondary underline underline-offset-4">FAQ</Link> or{" "}
                    <Link href="/contact" className="text-secondary underline underline-offset-4">contact us</Link>.
                </p>
            </div>
        </section>
    );
}

function Prose({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h2 className="font-serif text-[1.25rem] font-semibold text-primary mb-md">{title}</h2>
            <div className="space-y-sm font-body-md text-on-surface-variant leading-relaxed">
                {children}
            </div>
        </div>
    );
}
