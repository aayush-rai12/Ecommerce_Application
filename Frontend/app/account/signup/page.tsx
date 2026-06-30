"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signUp(name, email, password);
    setLoading(false);
    router.push("/account");
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Create an account</h2>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-sm">Full name</span>
            <input
              type="text"
              required
              value={name}
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm">Email</span>
            <input
              type="email"
              placeholder="Enter your email"
              required
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
              placeholder="Create your password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-[#fe3e6b] text-white py-2 rounded font-semibold"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account? <Link href="/account/signin" className="text-[#fe3e6b] font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
