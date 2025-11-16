"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

// 🔥 Type definition for leaderboard entries
type LeaderboardEntry = {
  displayName: string;
  completed: number;
  updatedAt?: number;
};

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "leaderboard"));

      const data: LeaderboardEntry[] = snap.docs.map(
        (d) => d.data() as LeaderboardEntry
      );

      data.sort((a, b) => b.completed - a.completed);

      setLeaders(data);
    }

    load();
  }, []);

  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text">
          Leaderboard
        </h1>

        <div className="space-y-4">
          {leaders.map((user, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white/10 p-4 rounded-lg border border-white/10"
            >
              <div className="flex gap-4 items-center">
                <span className="text-2xl font-bold w-8 text-center">
                  {index + 1}
                </span>
                <span className="text-lg font-medium">{user.displayName}</span>
              </div>

              <span className="text-xl font-semibold text-cyan-300">
                {user.completed} completed
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
