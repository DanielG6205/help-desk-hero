"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/fb/AuthContent";
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

  // Which order? Free (center/front), Monthly + Yearly (middle), Teams + Business (back)
  // We’ll simply render 5 cards in a row; the “bring to top” happens via hover (z-50 + scale).
  return (
    <div className="min-h-screen pt-24 px-6 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
            Choose Your Plan
          </h1>
          <p className="text-gray-300">
            Hands-on IT labs and help desk scenarios—pick what fits you or your team.
          </p>
        </header>

        {/* Five-card strip like your image; hover lifts to top */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6"
          aria-label="Pricing cards"
        >
          {plans.map((p, idx) => (
            <div
              key={p.key}
              className={[
                "group relative overflow-hidden rounded-xl border border-white/10",
                "bg-gradient-to-b from-white/10 to-white/[0.06] backdrop-blur",
                "shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
                "transition-all duration-300 ease-out",
                "hover:scale-[1.03] hover:-translate-y-1 hover:z-50 hover:shadow-[0_18px_60px_rgba(0,0,0,0.55)]",
                "focus-within:scale-[1.03] focus-within:-translate-y-1 focus-within:z-50",
              ].join(" ")}
              style={{
                // subtle default stacking so Free (middle) feels forward on XL
                zIndex: [2, 1, 2, 0, 0][idx],
              }}
            >
              {/* header gradient like the image */}
              <div
                className={`relative h-24 flex items-center justify-between px-5 bg-gradient-to-r ${p.headerGrad}`}
              >
                <h3 className="text-xl font-bold tracking-wide">{p.title}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold">{p.priceMain}</span>
                  {p.priceSub ? (
                    <span className="text-sm mb-1 opacity-90">{p.priceSub}</span>
                  ) : null}
                </div>

                {p.badge ? (
                  <span className="absolute -top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                    {p.badge}
                  </span>
                ) : null}
              </div>

              {/* body */}
              <div className="px-6 py-6">
                {p.subtitle ? (
                  <p className="text-gray-300 text-sm mb-4">{p.subtitle}</p>
                ) : null}

                <ul className="space-y-3 text-sm">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className={
                          f.ok
                            ? "mt-0.5 inline-block w-4 text-teal-400"
                            : "mt-0.5 inline-block w-4 text-gray-500"
                        }
                      >
                        {f.ok ? "✔" : "✘"}
                      </span>
                      <span className={f.ok ? "text-gray-100" : "text-gray-400"}>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={
                    p.onClick
                      ? p.onClick
                      : () => upgrade(p.key) // default to writing plan
                  }
                  className="mt-6 w-full rounded-md bg-teal-600 hover:bg-teal-700 py-2.5 font-semibold"
                >
                  {p.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mini comparison (only what you asked) */}
        <div className="mt-12">
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5">
                <tr className="[&>th]:px-4 [&>th]:py-3 text-left">
                  <th>Perk</th>
                  <th className="text-center">Free</th>
                  <th className="text-center">Monthly</th>
                  <th className="text-center">Yearly</th>
                  <th className="text-center">Teams</th>
                  <th className="text-center">Business</th>
                </tr>
              </thead>
              <tbody className="[&>tr>*]:px-4 [&>tr>*]:py-3 divide-y divide-white/10">
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

        <footer className="mt-10 text-center text-gray-400">
          Questions?{" "}
          <Link href="/contact-sales" className="underline">
            Contact sales
          </Link>{" "}
          or{" "}
          <Link href="/faq" className="underline">
            read the FAQ
          </Link>
          .
        </footer>
      </div>
    </div>
  );
}
