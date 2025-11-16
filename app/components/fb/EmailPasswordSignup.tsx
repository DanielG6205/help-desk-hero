"use client";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { errorMessages } from "./ErrorMessages";

export default function EmailPasswordSignup() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signup = async () => {
    try {
      setError("");

      // Create account
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // Set display name
      const fullName = `${firstName} ${lastName}`.trim();
      await updateProfile(userCred.user, { displayName: fullName });

      // 🔥 FORCE REFRESH OF FIREBASE USER
      await userCred.user.reload();

      // 🔥 FORCE NEXT.JS TO UPDATE UI
      router.refresh();

      // Redirect
      router.push("/");

    } catch (e: any) {
      const friendly = errorMessages[e.code] || errorMessages["default"];
      setError(friendly);
    }
  };

  return (
    <div className="w-full">
      <input
        className="w-full bg-black/20 text-white p-3 rounded-lg border border-gray-600 mb-3"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <input
        className="w-full bg-black/20 text-white p-3 rounded-lg border border-gray-600 mb-3"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        className="w-full bg-black/20 text-white p-3 rounded-lg border border-gray-600 mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full bg-black/20 text-white p-3 rounded-lg border border-gray-600 mb-3"
        placeholder="Password (min 6)"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-400 mb-2 text-sm">{error}</p>}

      <button
        onClick={signup}
        className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-semibold"
      >
        Create Account
      </button>
    </div>
  );
}
