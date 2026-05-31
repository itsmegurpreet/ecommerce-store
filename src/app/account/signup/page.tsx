"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
    const { signup } = useAuth();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name.trim()) {
            setError("Please enter your name.");
            return;
        }
        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        setLoading(true);
        const result = signup(name.trim(), email.trim(), password);
        setLoading(false);

        if (result === "ok") {
            router.push("/account");
        } else {
            setError("An account with that email already exists. Try signing in.");
        }
    };

    return (
        <section className="bg-surface min-h-screen">
            <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-gutter py-xxl">
                <div className="w-full max-w-[26rem]">
                    <div className="mb-xl text-center">
                        <p className="font-label-md text-label-md mb-sm uppercase tracking-widest text-secondary">
                            New here
                        </p>
                        <h1 className="font-serif text-headline-md font-semibold text-primary">
                            Create your account
                        </h1>
                        <p className="font-body-md mt-sm text-on-surface-variant">
                            Already have an account?{" "}
                            <Link
                                href="/account/login"
                                className="text-secondary underline underline-offset-4 transition-opacity hover:opacity-70"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-md" noValidate>
                        {error && (
                            <div className="rounded-md bg-error-container px-md py-sm">
                                <p className="font-label-md text-label-md text-on-error-container">
                                    {error}
                                </p>
                            </div>
                        )}

                        <div className="space-y-xs">
                            <label
                                htmlFor="name"
                                className="font-label-md text-label-md text-on-surface-variant"
                            >
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Alex Kumar"
                                className="w-full rounded-md border border-outline-variant/50 bg-surface px-md py-sm font-body-md text-primary placeholder:text-on-surface-variant/40 outline-none transition-colors focus:border-primary"
                                required
                            />
                        </div>

                        <div className="space-y-xs">
                            <label
                                htmlFor="email"
                                className="font-label-md text-label-md text-on-surface-variant"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-md border border-outline-variant/50 bg-surface px-md py-sm font-body-md text-primary placeholder:text-on-surface-variant/40 outline-none transition-colors focus:border-primary"
                                required
                            />
                        </div>

                        <div className="space-y-xs">
                            <label
                                htmlFor="password"
                                className="font-label-md text-label-md text-on-surface-variant"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="At least 8 characters"
                                    className="w-full rounded-md border border-outline-variant/50 bg-surface px-md py-sm pr-10 font-body-md text-primary placeholder:text-on-surface-variant/40 outline-none transition-colors focus:border-primary"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-sm top-1/2 -translate-y-1/2 cursor-pointer text-on-surface-variant transition-colors hover:text-primary"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-sm w-full cursor-pointer rounded-md bg-secondary py-md font-label-md text-label-md uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Creating account…" : "Create Account"}
                        </button>
                    </form>

                    <p className="mt-xl text-center font-label-sm text-label-sm text-on-surface-variant/60">
                        By creating an account, you agree to SmartDeskHub&apos;s{" "}
                        <span className="underline underline-offset-2">Terms of Service</span> and{" "}
                        <span className="underline underline-offset-2">Privacy Policy</span>.
                    </p>
                </div>
            </div>
        </section>
    );
}
