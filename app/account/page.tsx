"use client";

import { useAuth } from "@/app/components/fb/AuthContent";
import LoginRequired from "@/app/components/fb/LoginRequired";
import { useCompletion } from "@/lib/useCompletion";
import { problems } from "../problems/index";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Leaderboard type
type LeaderboardEntry = {
  displayName: string;
  completed: number;
  updatedAt?: number;
  uid: string; // REQUIRED for ranking
};

export default function AccountPage() {
  const { user, loading } = useAuth();
  const { doneIds } = useCompletion();

  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [rank, setRank] = useState<number | null>(null);

  const totalProblems = problems.length;
  const solved = doneIds.size;

  // ----------------------------------------------------
  // 🔥 Load leaderboard & calculate user's rank
  // ----------------------------------------------------
  useEffect(() => {
    async function loadLeaderboard() {
      const snap = await getDocs(collection(db, "leaderboard"));

      const data: LeaderboardEntry[] = snap.docs.map((d) => ({
        ...(d.data() as Omit<LeaderboardEntry, "uid">),
        uid: d.id, // 🔥 FIX — REQUIRED for matching logged in user
      }));

      // Sort by completed
      data.sort((a, b) => b.completed - a.completed);

      setLeaders(data);

      // Calculate rank
      const index = data.findIndex((entry) => entry.uid === user?.uid);

      if (index !== -1) {
        setRank(index + 1);
      } else {
        setRank(null);
      }
    }

    if (user) loadLeaderboard();
  }, [user, doneIds]);

  if (loading) return null;
  if (!user) return <LoginRequired />;

  const displayName = user.displayName || user.email?.split("@")[0] || "User";

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-24">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md">
        
        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text">
          Account Overview
        </h1>

        {/* USER INFO */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-1">{displayName}</h2>
          <p className="text-gray-300">{user.email}</p>
        </div>

        {/* PROBLEMS SOLVED */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2">Problems Solved</h3>

          <p className="text-gray-300 mb-2">
            <span className="text-teal-300 font-bold">{solved}</span> /{" "}
            {totalProblems}
          </p>

          <div className="w-full h-4 bg-white/10 rounded-full mt-3">
            <div
              className="h-4 bg-teal-400 rounded-full transition-all"
              style={{
                width: `${(solved / totalProblems) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* USER RANK */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2">Your Leaderboard Rank</h3>

          {rank ? (
            <p className="text-gray-300">
              You are ranked{" "}
              <span className="text-yellow-300 font-bold">#{rank}</span>{" "}
              out of {leaders.length} users.
            </p>
          ) : (
            <p className="text-gray-500">You are not ranked yet.</p>
          )}
        </div>

        {/* ACHIEVEMENTS */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <h3 className="text-lg font-semibold mb-4">Achievements</h3>

          <p className="text-gray-500">Coming soon…</p>
        </div>

        
        {/* LEADERBOARD PREVIEW */}
        <div className="border-t border-white/10 pt-8">
          <h3 className="text-lg font-semibold mb-4">Leaderboard Top 5</h3>

          <div className="space-y-3">
            {leaders.slice(0, 5).map((entry, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-4 rounded-lg border border-white/10 ${
                  entry.uid === user.uid
                    ? "bg-teal-800/40 border-teal-500"
                    : "bg-white/10"
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
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-500 text-center">
            View full leaderboard on the Leaderboard page.
          </p>
        </div>
      </div>
    </div>
  );
}
