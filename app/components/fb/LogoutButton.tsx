"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut(auth)}
      className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold mt-6"
    >
      Logout
    </button>
  );
}
