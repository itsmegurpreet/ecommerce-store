"use client";

import { createContext, useContext, useState, useCallback } from "react";

export interface AuthUser {
    name: string;
    email: string;
}

interface AuthContextValue {
    user: AuthUser | null;
    login: (email: string, password: string) => "ok" | "not_found" | "wrong_password";
    signup: (name: string, email: string, password: string) => "ok" | "email_taken";
    logout: () => void;
    isAuthenticated: boolean;
    updateProfile: (name: string, email: string) => "ok" | "email_taken";
    changePassword: (currentPassword: string, newPassword: string) => "ok" | "wrong_password";
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = "smartdeskhub_user";
const ACCOUNTS_KEY = "smartdeskhub_accounts";

type StoredAccount = { name: string; email: string; passwordHash: string };

/** Deterministic but non-reversible simple hash — adequate for a demo with no real data. */
function simpleHash(str: string): string {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return h.toString(36);
}

function getAccounts(): StoredAccount[] {
    try {
        const raw = localStorage.getItem(ACCOUNTS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveAccounts(accounts: StoredAccount[]) {
    try {
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch {}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(() => {
        if (typeof window === "undefined") return null;
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            return raw ? (JSON.parse(raw) as AuthUser) : null;
        } catch {
            return null;
        }
    });

    const login = useCallback(
        (email: string, password: string): "ok" | "not_found" | "wrong_password" => {
            const accounts = getAccounts();
            const account = accounts.find(
                (a) => a.email.toLowerCase() === email.toLowerCase().trim(),
            );
            if (!account) return "not_found";
            if (account.passwordHash !== simpleHash(password)) return "wrong_password";
            const u: AuthUser = { name: account.name, email: account.email };
            try {
                localStorage.setItem(SESSION_KEY, JSON.stringify(u));
            } catch {}
            setUser(u);
            return "ok";
        },
        [],
    );

    const signup = useCallback(
        (name: string, email: string, password: string): "ok" | "email_taken" => {
            const accounts = getAccounts();
            if (accounts.some((a) => a.email.toLowerCase() === email.toLowerCase().trim())) {
                return "email_taken";
            }
            const newAccount: StoredAccount = {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                passwordHash: simpleHash(password),
            };
            saveAccounts([...accounts, newAccount]);
            const u: AuthUser = { name: newAccount.name, email: newAccount.email };
            try {
                localStorage.setItem(SESSION_KEY, JSON.stringify(u));
            } catch {}
            setUser(u);
            return "ok";
        },
        [],
    );

    const logout = useCallback(() => {
        try {
            localStorage.removeItem(SESSION_KEY);
        } catch {}
        setUser(null);
    }, []);

    const updateProfile = useCallback(
        (name: string, email: string): "ok" | "email_taken" => {
            const accounts = getAccounts();
            const currentEmail = user?.email ?? "";
            const normalized = email.toLowerCase().trim();
            // Check if another account already owns that email
            if (
                normalized !== currentEmail.toLowerCase() &&
                accounts.some((a) => a.email.toLowerCase() === normalized)
            ) {
                return "email_taken";
            }
            const updated = accounts.map((a) =>
                a.email.toLowerCase() === currentEmail.toLowerCase()
                    ? { ...a, name: name.trim(), email: normalized }
                    : a,
            );
            saveAccounts(updated);
            const u: AuthUser = { name: name.trim(), email: normalized };
            try { localStorage.setItem(SESSION_KEY, JSON.stringify(u)); } catch {}
            setUser(u);
            return "ok";
        },
        [user],
    );

    const changePassword = useCallback(
        (currentPassword: string, newPassword: string): "ok" | "wrong_password" => {
            const accounts = getAccounts();
            const idx = accounts.findIndex(
                (a) => a.email.toLowerCase() === (user?.email ?? "").toLowerCase(),
            );
            if (idx === -1) return "wrong_password";
            if (accounts[idx].passwordHash !== simpleHash(currentPassword)) return "wrong_password";
            accounts[idx] = { ...accounts[idx], passwordHash: simpleHash(newPassword) };
            saveAccounts(accounts);
            return "ok";
        },
        [user],
    );

    return (
        <AuthContext.Provider
            value={{ user, login, signup, logout, isAuthenticated: user !== null, updateProfile, changePassword }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
