"use client";

import { useAuth } from "@/app/components/fb/AuthContent";
import LoginRequired from "@/app/components/fb/LoginRequired";
import { useCompletion } from "@/lib/useCompletion";
import { problems } from "../problems/index";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

import { motion } from "framer-motion";
import { Award, User, Target, Crown } from "lucide-react";

// Leaderboard type
type LeaderboardEntry = {
  displayName: string;
  completed: number;
  updatedAt?: number;
  uid: string;
};

export default function AccountPage() {
  const { user, loading } = useAuth();
  const { doneIds } = useCompletion();

  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [rank, setRank] = useState<number | null>(null);

  const totalProblems = problems.length;
  const solved = doneIds.size;

  // LOAD LEADERBOARD + RANK
  useEffect(() => {
    async function loadLeaderboard() {
      const snap = await getDocs(collection(db, "leaderboard"));

      const data: LeaderboardEntry[] = snap.docs.map((d) => ({
        ...(d.data() as Omit<LeaderboardEntry, "uid">),
        uid: d.id,
      }));

      // sort by problems completed
      data.sort((a, b) => b.completed - a.completed);

      setLeaders(data);

      const index = data.findIndex((entry) => entry.uid === user?.uid);

      if (index !== -1) setRank(index + 1);
      else setRank(null);
    }

    if (user) loadLeaderboard();
  }, [user, doneIds]);

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

        {/* USER SECTION */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10">
          <h2 className="text-2xl font-semibold mb-1">{displayName}</h2>
          <p className="text-gray-300">{user.email}</p>
        </div>

        {/* PROGRESS SECTION */}
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

        {/* RANK */}
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

        {/* ACHIEVEMENTS */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-6 h-6 text-purple-300" />
            <h3 className="text-xl font-semibold">Achievements</h3>
          </div>

          <p className="text-gray-500">Coming soon…</p>
        </div>

        {/* TOP 5 LEADERBOARD */}
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
