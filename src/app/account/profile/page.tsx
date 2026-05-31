"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function inputCls(hasError?: boolean) {
    return [
        "w-full rounded-md border bg-surface px-md py-sm",
        "font-body-md text-on-surface placeholder:text-on-surface-variant/40",
        "outline-none transition-colors focus:border-primary",
        hasError ? "border-error" : "border-outline-variant/50",
    ].join(" ");
}

export default function ProfilePage() {
    const { user, isAuthenticated, updateProfile, changePassword } = useAuth();
    const router = useRouter();

    // — Profile form
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profileError, setProfileError] = useState("");
    const [profileSuccess, setProfileSuccess] = useState(false);

    // — Password form
    const [currentPwd, setCurrentPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [pwdError, setPwdError] = useState("");
    const [pwdSuccess, setPwdSuccess] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) { router.replace("/account/login"); return; }
        if (user) { setName(user.name); setEmail(user.email); }
    }, [isAuthenticated, user, router]);

    if (!user) return null;

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        setProfileError("");
        setProfileSuccess(false);
        if (!name.trim()) { setProfileError("Name cannot be empty."); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setProfileError("Enter a valid email address."); return; }
        const result = updateProfile(name, email);
        if (result === "email_taken") { setProfileError("That email is already used by another account."); return; }
        setProfileSuccess(true);
        setTimeout(() => setProfileSuccess(false), 3000);
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        setPwdError("");
        setPwdSuccess(false);
        if (!currentPwd) { setPwdError("Enter your current password."); return; }
        if (newPwd.length < 8) { setPwdError("New password must be at least 8 characters."); return; }
        if (newPwd !== confirmPwd) { setPwdError("Passwords do not match."); return; }
        const result = changePassword(currentPwd, newPwd);
        if (result === "wrong_password") { setPwdError("Current password is incorrect."); return; }
        setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
        setPwdSuccess(true);
        setTimeout(() => setPwdSuccess(false), 3000);
    };

    const initials = user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

    return (
        <section className="bg-surface min-h-screen pb-xxl">
            <div className="border-b border-outline-variant/20 bg-surface-container-low">
                <div className="mx-auto max-w-7xl px-gutter py-xxl">
                    <Link
                        href="/account"
                        className="mb-md inline-flex items-center gap-xs font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
                    >
                        <ChevronLeft className="h-3.5 w-3.5" />
                        Account
                    </Link>
                    <p className="font-label-md text-label-md mb-sm uppercase tracking-widest text-secondary">
                        Settings
                    </p>
                    <h1 className="font-serif text-headline-md font-semibold text-primary">
                        Profile
                    </h1>
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-gutter pt-xl space-y-xl">
                {/* Avatar */}
                <div className="flex items-center gap-lg">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary font-semibold text-xl text-on-primary">
                        {initials}
                    </div>
                    <div>
                        <p className="font-body-lg font-semibold text-primary">{user.name}</p>
                        <p className="font-body-md text-on-surface-variant">{user.email}</p>
                    </div>
                </div>

                {/* Personal info */}
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-xl">
                    <h2 className="font-serif text-[1.25rem] font-semibold text-primary mb-lg">
                        Personal Information
                    </h2>
                    <form onSubmit={handleProfileSave} className="space-y-md" noValidate>
                        <div className="grid gap-md sm:grid-cols-2">
                            <div className="space-y-xs">
                                <label className="font-label-md text-label-md text-on-surface-variant">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={inputCls(!name.trim() && !!profileError)}
                                    autoComplete="name"
                                />
                            </div>
                            <div className="space-y-xs">
                                <label className="font-label-md text-label-md text-on-surface-variant">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={inputCls(!!profileError && !profileError.includes("Name"))}
                                    autoComplete="email"
                                />
                            </div>
                        </div>
                        {profileError && (
                            <p className="font-label-sm text-label-sm text-error">{profileError}</p>
                        )}
                        {profileSuccess && (
                            <div className="flex items-center gap-xs font-label-sm text-label-sm text-secondary">
                                <Check className="h-3.5 w-3.5" />
                                Profile updated.
                            </div>
                        )}
                        <button
                            type="submit"
                            className="cursor-pointer rounded-md bg-primary px-xl py-sm font-label-md text-label-md uppercase tracking-widest text-white transition-opacity hover:opacity-80"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>

                {/* Change password */}
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-xl">
                    <h2 className="font-serif text-[1.25rem] font-semibold text-primary mb-lg">
                        Change Password
                    </h2>
                    <form onSubmit={handlePasswordChange} className="space-y-md" noValidate>
                        <div className="space-y-xs">
                            <label className="font-label-md text-label-md text-on-surface-variant">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={currentPwd}
                                onChange={(e) => setCurrentPwd(e.target.value)}
                                className={inputCls(pwdError === "Current password is incorrect.")}
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="grid gap-md sm:grid-cols-2">
                            <div className="space-y-xs">
                                <label className="font-label-md text-label-md text-on-surface-variant">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={newPwd}
                                    onChange={(e) => setNewPwd(e.target.value)}
                                    className={inputCls(!!pwdError && pwdError.includes("8 characters"))}
                                    autoComplete="new-password"
                                />
                            </div>
                            <div className="space-y-xs">
                                <label className="font-label-md text-label-md text-on-surface-variant">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPwd}
                                    onChange={(e) => setConfirmPwd(e.target.value)}
                                    className={inputCls(!!pwdError && pwdError.includes("match"))}
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                        {pwdError && (
                            <p className="font-label-sm text-label-sm text-error">{pwdError}</p>
                        )}
                        {pwdSuccess && (
                            <div className="flex items-center gap-xs font-label-sm text-label-sm text-secondary">
                                <Check className="h-3.5 w-3.5" />
                                Password changed successfully.
                            </div>
                        )}
                        <button
                            type="submit"
                            className="cursor-pointer rounded-md border border-outline-variant/50 px-xl py-sm font-label-md text-label-md uppercase tracking-widest text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                        >
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
