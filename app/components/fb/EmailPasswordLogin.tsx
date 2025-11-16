"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";

export default function EmailPasswordLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="w-full">
      <input
        className="w-full bg-black/20 text-white p-3 rounded-lg border border-gray-600 mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full bg-black/20 text-white p-3 rounded-lg border border-gray-600 mb-3"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-400 mb-2">{error}</p>}

      <button
        onClick={login}
        className="w-full bg-teal-500 hover:bg-teal-600 py-3 rounded-xl font-semibold"
      >
        Login
      </button>
    </div>
  );
}
