"use client";

import EmailPasswordSignup from "../components/fb/EmailPasswordSignup";
import Link from "next/link";
import { useAuth } from "../components/fb/AuthContent";
import LogoutButton from "../components/fb/LogoutButton";

export default function SignupPage() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">
      <div className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-10 shadow-2xl">

        {user ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-4">
              You are already logged in 🔒
            </h1>
            <p className="text-center text-gray-300">
              You already have an account and are signed in.
            </p>

            <p className="text-center text-gray-300 mt-2">
              Continue to{" "}
              <Link href="/problems" className="text-teal-400 underline">
                problems
              </Link>
            </p>

            {/* Logout Button */}
            <LogoutButton />
          </>
        ) : (
          <>
            <h1 className="text-4xl font-extrabold text-center mb-2">
              Create Account
            </h1>
            <p className="text-gray-300 text-center mb-8">
              Join HelpDeskHero and start mastering real-world IT scenarios.
            </p>

            <EmailPasswordSignup />

            <p className="text-center text-gray-400 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-teal-400 underline">
                Sign in
              </Link>
            </p>
          </>
        )}

      </div>
    </div>
  );
}
