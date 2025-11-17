"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginRequired() {
  const router = useRouter();

  // Auto redirect after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <div className="bg-white/10 p-10 rounded-xl border border-white/20 backdrop-blur-xl text-center max-w-md">
        <h1 className="text-3xl font-semibold mb-4">Login Required</h1>
        <p className="text-gray-300 mb-4">
          You must be logged in to access this page.
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Redirecting you to login...
        </p>

        <Link
          href="/login"
          className="px-6 py-3 bg-teal-400 text-black rounded-xl font-semibold hover:bg-teal-300 transition"
        >
          Go to Login Now
        </Link>
      </div>
    </div>
  );
}
