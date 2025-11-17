"use client";

import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      // 1. Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // 2. Check if Firestore user exists
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      // 3. Always sync Auth displayName + email to Firestore
      await setDoc(
        userRef,
        {
          displayName: user.displayName,
          email: user.email,
          createdAt: snap.exists() ? snap.data().createdAt : Date.now(),
        },
        { merge: true }
      );

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
