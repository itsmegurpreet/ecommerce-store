"use client";

import { useState, FormEvent } from "react";
import { Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // In production: POST to an API route / email service
        setSubmitted(true);
    };

    return (
        <section className="bg-surface min-h-screen pb-xxl">
            <div className="border-b border-outline-variant/20 bg-surface-container-low">
                <div className="mx-auto max-w-7xl px-gutter py-xxl">
                    <p className="font-label-md text-label-md mb-sm uppercase tracking-widest text-secondary">
                        Get in touch
                    </p>
                    <h1 className="font-serif text-headline-md font-semibold text-primary">
                        Contact Us
                    </h1>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-gutter pt-xl">
                <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
                    {/* Form */}
                    <div>
                        {submitted ? (
                            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-xl text-center">
                                <MessageCircle className="mx-auto mb-md h-12 w-12 text-secondary" />
                                <h2 className="font-serif text-headline-md font-medium text-primary mb-sm">
                                    Message received
                                </h2>
                                <p className="font-body-md text-on-surface-variant">
                                    We&apos;ll get back to you at <strong>{email}</strong> within
                                    one business day.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-md" noValidate>
                                <div className="grid gap-md sm:grid-cols-2">
                                    <Field label="Your name" htmlFor="name">
                                        <input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Alex Kumar"
                                            required
                                            className="input-base"
                                        />
                                    </Field>
                                    <Field label="Email address" htmlFor="contact-email">
                                        <input
                                            id="contact-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            required
                                            className="input-base"
                                        />
                                    </Field>
                                </div>
                                <Field label="Subject" htmlFor="subject">
                                    <select
                                        id="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        required
                                        className="input-base cursor-pointer"
                                    >
                                        <option value="">Select a topic</option>
                                        <option>Order issue</option>
                                        <option>Return or refund</option>
                                        <option>Product question</option>
                                        <option>Shipping enquiry</option>
                                        <option>Other</option>
                                    </select>
                                </Field>
                                <Field label="Message" htmlFor="message">
                                    <textarea
                                        id="message"
                                        rows={6}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Describe your issue or question in detail…"
                                        required
                                        className="input-base resize-none"
                                    />
                                </Field>
                                <button
                                    type="submit"
                                    className="cursor-pointer rounded-md bg-secondary px-xl py-md font-label-md text-label-md uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Info sidebar */}
                    <div className="space-y-lg">
                        <InfoCard
                            icon={Mail}
                            title="Email Support"
                            body="support@smartdeskhub.in"
                            sub="For order issues, returns, and general enquiries."
                        />
                        <InfoCard
                            icon={Clock}
                            title="Response Time"
                            body="Within 1 business day"
                            sub="Monday to Saturday, 9 am – 6 pm IST."
                        />
                        <InfoCard
                            icon={MessageCircle}
                            title="Live Chat"
                            body="Coming soon"
                            sub="We are building a live chat for real-time support."
                        />
                    </div>
                </div>
            </div>

            <style>{`
                .input-base {
                    width: 100%;
                    border-radius: 0.5rem;
                    border: 1px solid color-mix(in srgb, var(--color-outline-variant) 50%, transparent);
                    background: var(--color-surface);
                    padding: 0.5rem 1rem;
                    font-size: var(--text-body-md);
                    color: var(--color-on-surface);
                    outline: none;
                    transition: border-color 0.15s;
                }
                .input-base:focus {
                    border-color: var(--color-primary);
                }
                .input-base::placeholder {
                    color: color-mix(in srgb, var(--color-on-surface-variant) 40%, transparent);
                }
            `}</style>
        </section>
    );
}

function Field({
    label,
    htmlFor,
    children,
}: {
    label: string;
    htmlFor: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-xs">
            <label htmlFor={htmlFor} className="font-label-md text-label-md text-on-surface-variant">
                {label}
            </label>
            {children}
        </div>
    );
}

function InfoCard({
    icon: Icon,
    title,
    body,
    sub,
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    body: string;
    sub: string;
}) {
    return (
        <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-lg">
            <div className="mb-sm flex items-center gap-sm">
                <Icon className="h-5 w-5 text-secondary" />
                <h3 className="font-label-md text-label-md font-semibold text-primary">{title}</h3>
            </div>
            <p className="font-body-md font-medium text-primary">{body}</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">{sub}</p>
        </div>
    );
}
