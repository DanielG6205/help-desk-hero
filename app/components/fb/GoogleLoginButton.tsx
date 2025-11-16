"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Google login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={login}
      className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-semibold shadow transition-all"
    >
      <FcGoogle className="h-6 w-6" />
      {loading ? "Loading…" : "Login with Google"}
    </button>
  );
}
