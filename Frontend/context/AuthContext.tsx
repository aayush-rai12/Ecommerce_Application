"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type User = { id: string; name: string; email: string } | null;

type AuthContextValue = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    try {
      if (typeof window === "undefined") return null;
      const raw = localStorage.getItem("jc_user");
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, _password: string) => {
    setLoading(true);
    // Mock sign-in: create a user object
    const u = { id: String(Date.now()), name: email.split("@")[0], email };
    localStorage.setItem("jc_user", JSON.stringify(u));
    setUser(u);
    setLoading(false);
  };

  const signUp = async (name: string, email: string, _password: string) => {
    setLoading(true);
    const u = { id: String(Date.now()), name, email };
    localStorage.setItem("jc_user", JSON.stringify(u));
    setUser(u);
    setLoading(false);
  };

  const signOut = () => {
    localStorage.removeItem("jc_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
