"use client";

import Link from "next/link";
import { useAuth } from "../components/fb/AuthContent";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function PremiumPage() {
  const { user } = useAuth();
  const router = useRouter();

  const upgrade = async (makePremium: boolean) => {
    if (!user) return alert("Please log in first!");

    const ref = doc(db, "users", user.uid);

    await setDoc(
      ref,
      {
        premium: makePremium,
        premiumUpdatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    alert(makePremium ? "You are now Premium!" : "Free plan activated.");
    router.push("/account");
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* -------- HEADER -------- */}
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
          Upgrade to Premium
        </h1>
        <p className="text-gray-300 mb-14 max-w-2xl mx-auto">
          Unlock full hands-on IT labs, advanced help desk scenarios, premium problem sets,
          and more. Choose the plan that fits you.
        </p>

        {/* -------- PRICING GRID -------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* ----- PREMIUM MONTHLY ----- */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md hover:border-teal-400/40 transition">
            <h2 className="text-2xl font-bold mb-2 text-yellow-300">Premium Monthly</h2>
            <p className="text-4xl font-bold mb-1">$20<span className="text-lg">/mo</span></p>
            <p className="text-gray-400 mb-6">Full Lab Access</p>

            <ul className="text-left space-y-3 text-gray-300 mb-8">
              <li>✔ All 9 help desk lab problems</li>
              <li>✔ Full access to premium labs</li>
              <li>✔ Unlimited practice</li>
              <li>✔ All future lab expansions</li>
            </ul>

            <button
              onClick={() => upgrade(true)}
              className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-semibold"
            >
              Buy Monthly
            </button>
          </div>

          {/* ----- FREE TRIAL (CENTER) ----- */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-lg shadow-lg shadow-teal-400/20 relative scale-105">
            <h2 className="text-2xl font-bold mb-2 text-teal-300">Free Plan</h2>
            <p className="text-4xl font-bold mb-1">$0</p>
            <p className="text-gray-400 mb-6">Try Before You Upgrade</p>

            <ul className="text-left space-y-3 text-gray-300 mb-8">
              <li>✔ Read all help desk articles</li>
              <li>✔ Complete easy & medium free labs</li>
              <li>✔ Track your progress</li>
              <li>✔ Join leaderboard & ranks</li>
              <li>✘ Premium-only problems</li>
            </ul>

            <button
              onClick={() => upgrade(false)}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 rounded-lg font-semibold"
            >
              Start Free
            </button>
          </div>

          {/* ----- PREMIUM YEARLY ----- */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md hover:border-teal-400/40 transition relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-700 rounded-full text-sm font-bold">
              Most Popular
            </div>

            <h2 className="text-2xl font-bold mb-2 text-purple-300">Premium Yearly</h2>
            <p className="text-4xl font-bold mb-1">$180<span className="text-lg">/yr</span></p>
            <p className="text-gray-400 mb-1">(Save 25%)</p>
            <p className="text-gray-400 mb-6">Or $15/mo equivalent</p>

            <ul className="text-left space-y-3 text-gray-300 mb-8">
              <li>✔ Everything in Monthly Plan</li>
              <li>✔ Save $60 per year</li>
              <li>✔ Priority feature requests</li>
              <li>✔ Special badge in leaderboard</li>
            </ul>

            <button
              onClick={() => upgrade(true)}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
            >
              Buy Yearly
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
