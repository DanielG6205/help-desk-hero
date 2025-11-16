"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { errorMessages } from "./ErrorMessages";

export default function EmailPasswordLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      const friendly =
        errorMessages[err.code] || "Something went wrong. Please try again.";
      setError(friendly);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">

      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && (
        <p className="text-red-400 text-center text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-teal-500 hover:bg-teal-600 font-semibold rounded-lg transition"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}
