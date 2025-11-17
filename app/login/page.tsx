"use client";

import { useEffect } from "react";
import GoogleLoginButton from "../../components/Login/GoogleLoginButton";
import EmailPasswordLogin from "../../components/Login/EmailPasswordLogin";
import Link from "next/link";
import { useAuth } from "../../components/fb/AuthContent";
import LogoutButton from "../../components/Login/LogoutButton";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // 🚀 Auto-redirect once user is logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace("/"); // redirect to home
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">

      <div className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-10 shadow-2xl">

        {user ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-4">
              Redirecting...
            </h1>
            <p className="text-center text-gray-300">
              Taking you to the home page.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-extrabold text-center mb-2">Welcome Back</h1>
            <p className="text-gray-300 text-center mb-8">
              Sign in to continue your helpdesk training.
            </p>

            <div className="space-y-4 mb-6 flex flex-col items-center">
              <GoogleLoginButton />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-[1px] bg-gray-600" />
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-[1px] bg-gray-600" />
            </div>

            <EmailPasswordLogin />

            <p className="text-center text-gray-400 mt-6">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-teal-400 underline">
                Create one
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
