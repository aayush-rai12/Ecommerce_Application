"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn(email, password);
    setLoading(false);
    router.push("/account");
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Sign in to your account</h2>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-sm">Email</span>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm">Password</span>
            <input
              type="password"
              required
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-[#fe3e6b] text-white py-2 rounded font-semibold"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Do not have an account? <Link href="/account/signup" className="text-[#fe3e6b] font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
