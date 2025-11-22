"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";

// Removed unused LeaderboardEntry type

export default function Leaderboard() {
  const leaders = useQuery(api.users.listLeaderboard, {});
  const loading = leaders === undefined;

  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-xl">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text">
          Leaderboard
        </h1>

        {loading && <p className="text-center text-gray-400">Loading…</p>}

        {!loading && leaders && (
          <div className="space-y-4">
            {leaders.map((user, index) => (
              <motion.div
                key={user.userId}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-between items-center bg-white/10 p-4 rounded-lg border border-white/10"
              >
                <div className="flex gap-4 items-center">
                  <span className="text-2xl font-bold w-8 text-center">
                    {index + 1}
                  </span>
                  <span className="text-lg font-medium">{user.name}</span>
                </div>

                <span className="text-xl font-semibold text-cyan-300">
                  {user.completedCount} solved
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
