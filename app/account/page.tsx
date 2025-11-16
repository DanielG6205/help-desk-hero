"use client";

import { useAuth } from "@/app/components/fb/AuthContent";
import LoginRequired from "@/app/components/fb/LoginRequired";
import { useCompletion } from "@/lib/useCompletion";
import { problems } from "../labs/index";
import { useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

import { motion } from "framer-motion";
import { Award, User, Target, Crown, Flame, Snowflake } from "lucide-react";
import { usePremium } from "@/lib/usePremium";

type LeaderboardEntry = {
  displayName: string;
  completed: number;
  updatedAt?: number;
  uid: string;
};

export default function AccountPage() {
  const { user, loading } = useAuth();
  const { doneIds } = useCompletion();
  const premium = usePremium();

  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [rank, setRank] = useState<number | null>(null);

  const [streak, setStreak] = useState(0);
  const [freezeAvailable, setFreezeAvailable] = useState(false);
  const [freezeUsedOn, setFreezeUsedOn] = useState<string | null>(null);

  const totalProblems = problems.length;
  const solved = doneIds.size;

  // Load leaderboard + rank
  useEffect(() => {
    async function loadLeaderboard() {
      const snap = await getDocs(collection(db, "leaderboard"));

      const data: LeaderboardEntry[] = snap.docs.map((d) => ({
        ...(d.data() as Omit<LeaderboardEntry, "uid">),
        uid: d.id,
      }));

      data.sort((a, b) => b.completed - a.completed);
      setLeaders(data);

      const index = data.findIndex((entry) => entry.uid === user?.uid);
      setRank(index !== -1 ? index + 1 : null);
    }

    if (user) loadLeaderboard();
  }, [user, doneIds]);

  // Load streak & freeze
  useEffect(() => {
    async function loadStreak() {
      if (!user) return;

      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists()) return;

      const data = snap.data();
      setStreak(data?.streak || 0);
      setFreezeAvailable(data?.streakFreezeAvailable ?? false);
      setFreezeUsedOn(data?.streakFreezeUsedOn || null);
    }
    loadStreak();
  }, [user]);

  if (loading) return null;
  if (!user) return <LoginRequired />;

  const displayName = user.displayName || user.email?.split("@")[0] || "User";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f1f] to-black text-white px-6 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-12">
          <User className="w-10 h-10 text-cyan-300" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text">
            Account Overview
          </h1>
        </div>

        {/* USER INFO */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10">
          <h2 className="text-2xl font-semibold mb-1">{displayName}</h2>
          <p className="text-gray-300">{user.email}</p>
        </div>

        {/* PROGRESS */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-6 h-6 text-teal-300" />
            <h3 className="text-xl font-semibold">Problems Solved</h3>
          </div>

          <p className="text-gray-300 mb-3">
            <span className="text-teal-300 font-bold text-lg">{solved}</span> /{" "}
            {totalProblems}
          </p>

          <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-4 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full shadow-lg transition-all"
              style={{ width: `${(solved / totalProblems) * 100}%` }}
            />
          </div>
        </div>

        {/* DAILY STREAK */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-400" />
            Daily Streak
          </h3>
          <p className="text-gray-300 text-lg mt-2">
            <span className="text-orange-300 font-bold">{streak}</span> days
          </p>

          <Link
            href="/streakboard"
            className="text-sm text-orange-300 underline mt-3 block"
          >
            View the full streakboard →
          </Link>
        </div>

        {/* STREAK FREEZE */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Snowflake className="w-6 h-6 text-blue-300" />
            Streak Freeze
          </h3>

          {premium !== "free" ? (
            <>
              {freezeAvailable ? (
                <p className="text-green-300 font-semibold mt-2">
                  ❄️ Your streak is protected today.
                </p>
              ) : (
                <p className="text-red-400 font-semibold mt-2">
                  You used your freeze today.
                </p>
              )}
              {freezeUsedOn && (
                <p className="text-gray-400 text-sm mt-2">
                  Last used: {freezeUsedOn}
                </p>
              )}
            </>
          ) : (
            <p className="text-gray-400 mt-2">
              Upgrade to Premium to get daily streak freeze protection!
            </p>
          )}
        </div>

        {/* LEADERBOARD RANK */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-6 h-6 text-yellow-300" />
            <h3 className="text-xl font-semibold">Leaderboard Rank</h3>
          </div>

          {rank ? (
            <p className="text-gray-300">
              You are currently{" "}
              <span className="text-yellow-300 font-bold text-xl">
                #{rank}
              </span>{" "}
              out of {leaders.length} users.
            </p>
          ) : (
            <p className="text-gray-500">You are not ranked yet.</p>
          )}
        </div>

        {/* PREMIUM STATUS */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-6 h-6 text-purple-300" />
            <h3 className="text-xl font-semibold">Premium Status</h3>
          </div>

          <PremiumStatus user={user} />
        </div>

        {/* ACHIEVEMENTS */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-6 h-6 text-purple-300" />
            <h3 className="text-xl font-semibold">Achievements</h3>
          </div>

          <p className="text-gray-500">Coming soon…</p>
        </div>

        {/* TOP 5 */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold mb-4">Leaderboard — Top 5</h3>

          <div className="space-y-3">
            {leaders.slice(0, 5).map((entry, index) => (
              <motion.div
                key={entry.uid}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex justify-between items-center p-4 rounded-xl border ${
                  entry.uid === user.uid
                    ? "bg-teal-900/40 border-teal-500 shadow-lg shadow-teal-600/30"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className="flex gap-4 items-center">
                  <span className="text-2xl font-bold w-8 text-center">
                    {index + 1}
                  </span>
                  <span className="text-lg font-medium">
                    {entry.displayName}
                  </span>
                </div>

                <span className="text-xl font-semibold text-cyan-300">
                  {entry.completed}
                </span>
              </motion.div>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Click{" "}
            <Link
              href="/leaderboard"
              className="underline text-cyan-300 hover:text-cyan-400 transition"
            >
              here
            </Link>{" "}
            to view the full leaderboard!
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------- PREMIUM STATUS COMPONENT ------------------------- */

function PremiumStatus({ user }: { user: any }) {
  const [loading, setLoading] = useState(true);
  const [premium, setPremium] = useState<"free" | "monthly" | "yearly">("free");
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data();

      if (data) {
        setPremium(data.premium || "free");
        setUpdatedAt(data.premiumUpdatedAt || null);
      }

      setLoading(false);
    }

    load();
  }, [user]);

  const cancelPremium = async () => {
    await setDoc(
      doc(db, "users", user.uid),
      {
        premium: "free",
        premiumUpdatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    setPremium("free");
    alert("Your premium plan has been canceled.");
  };

  if (loading)
    return <p className="text-gray-400 text-sm">Loading premium status…</p>;

  return (
    <div>
      {premium !== "free" ? (
        <>
          <p className="text-green-400 font-semibold text-lg">
            You are a Premium Member!
          </p>

          {updatedAt && (
            <p className="text-gray-400 text-sm mt-1">
              Upgraded on: {new Date(updatedAt).toLocaleString()}
            </p>
          )}

          <button
            onClick={cancelPremium}
            className="mt-5 w-full py-3 bg-red-600/80 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            Cancel Premium
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-300 mb-3">
            You are currently on the Free Plan.
          </p>

          <Link
            href="/premium"
            className="block w-full py-3 bg-yellow-500/80 hover:bg-yellow-600 rounded-lg font-semibold text-center transition"
          >
            Upgrade to Premium
          </Link>
        </>
      )}
    </div>
  );
}
