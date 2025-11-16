"use client";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";

export default function EmailPasswordSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signup = async () => {
    try {
      setError("");

      // 1. Create user with email and password
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Update Firebase Auth user profile with name
      await updateProfile(userCred.user, {
        displayName: name,
      });

      console.log("User created:", userCred.user);

      // OPTIONAL: If you want to save name to Firestore:
      /*
      import { setDoc, doc } from "firebase/firestore";
      import { db } from "@/lib/firebase";

      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        email,
        createdAt: new Date(),
      });
      */

    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="w-full">
      <input
        className="w-full bg-black/20 text-white p-3 rounded-lg border border-gray-600 mb-3"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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

      {error && <p className="text-red-400 mb-2">{error}</p>}

      <button
        onClick={signup}
        className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-semibold"
      >
        Create Account
      </button>
    </div>
  );
}
