"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/fb/AuthContent";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

type PlanKey =
  | "free"
  | "premium_monthly"
  | "premium_yearly"
  | "premium_team"
  | "premium_business";

type Plan = {
  key: PlanKey;
  title: string;
  headerGrad: string;
  priceMain: string;
  priceSub?: string;
  badge?: string;
  subtitle?: string;
  cta: string;
  onClick?: () => void;
  features: { label: string; ok: boolean }[];
};

export default function PricingFiveCards() {
  const { user } = useAuth();
  const router = useRouter();

  const upgrade = useCallback(
    async (plan: PlanKey) => {
      if (!user) return alert("Please log in first!");
      await setDoc(
        doc(db, "users", user.uid),
        { plan, planUpdatedAt: new Date().toISOString() },
        { merge: true }
      );

      alert(
        plan === "free"
          ? "Free plan activated."
          : plan === "premium_monthly"
          ? "Premium (Monthly) activated!"
          : plan === "premium_yearly"
          ? "Premium (Yearly) activated!"
          : plan === "premium_team"
          ? "Team plan activated!"
          : "Business plan selected!"
      );

      router.push("/account");
    },
    [router, user]
  );

  const contactSales = () => router.push("/contact-sales");

  const plans: Plan[] = [
    {
      key: "free",
      title: "FREE",
      headerGrad: "from-emerald-400 to-teal-500",
      priceMain: "$0",
      subtitle: "Try before you upgrade",
      cta: "Start Free",
      features: [
        { label: "Some learning articles", ok: true },
        { label: "Some problems", ok: true },
        { label: "All Labs", ok: false },
      ],
    },
    {
      key: "premium_monthly",
      title: "MONTHLY",
      headerGrad: "from-amber-400 to-orange-500",
      priceMain: "$20",
      priceSub: "/mo",
      subtitle: "All Labs",
      cta: "Buy Monthly",
      features: [
        { label: "All Labs", ok: true },
        { label: "Unlimited practice", ok: true },
        { label: "Future lab expansions", ok: true },
      ],
    },
    {
      key: "premium_yearly",
      title: "YEARLY",
      headerGrad: "from-fuchsia-500 to-pink-600",
      priceMain: "$180",
      priceSub: "/yr",
      badge: "BEST VALUE",
      subtitle: "All Labs · ≈ $15/mo",
      cta: "Buy Yearly",
      features: [
        { label: "All Labs", ok: true },
        { label: "Save vs monthly", ok: true },
        { label: "Special leaderboard badge", ok: true },
      ],
    },
    {
      key: "premium_team",
      title: "TEAMS",
      headerGrad: "from-sky-500 to-indigo-500",
      priceMain: "$149",
      priceSub: "/mo",
      subtitle: "Up to 10 users",
      cta: "Activate Teams",
      features: [
        { label: "All Labs", ok: true },
        { label: "Team progress dashboard", ok: true },
        { label: "Standard support", ok: true },
      ],
    },
    {
      key: "premium_business",
      title: "BUSINESS",
      headerGrad: "from-violet-500 to-blue-600",
      priceMain: "$600",
      priceSub: "/50 users / mo",
      subtitle: "Scale across the org",
      cta: "Talk to Sales",
      onClick: contactSales,
      features: [
        { label: "All Labs", ok: true },
        { label: "Priority support / SLA", ok: true },
        { label: "SSO/SAML (on request)", ok: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
            Choose Your Plan
          </h1>
          <p className="text-gray-300">
            Hands-on IT labs and help desk scenarios—pick what fits you or your team.
          </p>
        </header>

        {/* 5 CARD LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols- xl:grid-cols-5 gap-6 group overflow-visible">

          {plans.map((p, idx) => {
            const baseScales = [
              "scale-[0.90]",
              "scale-[0.95]",
              "scale-[1.00]", // center & BEST VALUE
              "scale-[0.95]",
              "scale-[0.90]",
            ];

            const baseZ = [5, 10, 20, 10, 5];

            return (
              <div
                key={p.key}
                className={[
                  "relative rounded-xl border border-white/10",
                  "bg-gradient-to-b from-white/10 to-white/[0.06] backdrop-blur",
                  "transition-all duration-300 ease-out",

                  baseScales[idx],

                  // hover
                  "hover:scale-[1.05] hover:z-50",
                  "group-hover:[&:not(:hover)]:opacity-60",
                  "group-hover:[&:not(:hover)]:scale-[0.90]",
                ].join(" ")}
                style={{ zIndex: baseZ[idx] }}
              >

                {/* ⭐ NEW HEADER STYLE */}
                <div className="flex flex-col items-center text-center px-5 py-6 bg-gradient-to-r from-white/10 to-white/0">
                  
                  {/* Tier name */}
                  <h3 className="text-xl font-bold tracking-wide mb-2">
                    {p.title}
                  </h3>

                  {/* Price */}
                  <div className="text-2xl font-extrabold">
                    {p.priceMain}
                    {p.priceSub && (
                      <span className="text-lg ml-1 opacity-80">{p.priceSub}</span>
                    )}
                  </div>

                  {/* BEST VALUE badge (centered) */}
                  {p.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                      {p.badge}
                    </span>
                  )}
                </div>

                {/* BODY */}
                <div className="px-6 py-6">
                  {p.subtitle && (
                    <p className="text-gray-300 text-sm mb-4">{p.subtitle}</p>
                  )}

                  <ul className="space-y-3 text-sm">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className={f.ok ? "text-teal-400 w-4" : "text-gray-500 w-4"}>
                          {f.ok ? "✔" : "✘"}
                        </span>
                        <span className={f.ok ? "text-gray-100" : "text-gray-400"}>
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={p.onClick ? p.onClick : () => upgrade(p.key)}
                    className="mt-6 w-full rounded-md bg-teal-600 hover:bg-teal-700 py-2.5 font-semibold"
                  >
                    {p.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* MINI TABLE */}
        <div className="mt-12">
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5">
                <tr className="[&>th]:px-4 [&>th]:py-3">
                  <th>Perk</th>
                  <th className="text-center">Free</th>
                  <th className="text-center">Monthly</th>
                  <th className="text-center">Yearly</th>
                  <th className="text-center">Teams</th>
                  <th className="text-center">Business</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 [&>tr>*]:px-4 [&>tr>*]:py-3">
                <tr>
                  <td className="font-medium">All Labs</td>
                  <td className="text-center">✘</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                  <td className="text-center">✔</td>
                </tr>
                <tr>
                  <td className="font-medium">Users included</td>
                  <td className="text-center">1</td>
                  <td className="text-center">1</td>
                  <td className="text-center">1</td>
                  <td className="text-center">Up to 10</td>
                  <td className="text-center">$600 / 50 users / mo</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-400 mt-3">
            Teams: flat price for up to 10 users. Business: priced per 50-user blocks; SSO/SAML and SLA available.
          </p>
        </div>

        {/* FOOTER */}
        <footer className="mt-10 text-center text-gray-400">
          Questions?{" "}
          <Link href="/contact-sales" className="underline">Contact sales</Link>
          {" "}or{" "}
          <Link href="/faq" className="underline">read the FAQ</Link>.
        </footer>
      </div>
    </div>
  );
}
