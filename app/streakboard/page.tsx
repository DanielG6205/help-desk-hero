"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Snowflake, ArrowLeft } from "lucide-react";

type StreakEntry = {
  displayName: string;
  streak: number;
  streakFreezeAvailable: boolean;
  uid: string;
};

export default function StreakboardPage() {
  const [users, setUsers] = useState<StreakEntry[]>([]);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "users"));

      const data: StreakEntry[] = snap.docs.map((d) => {
        const raw = d.data();

        // get display name OR fallback to email prefix
        const fullName =
          raw.displayName ??
          (raw.email ? raw.email.split("@")[0] : "Unknown User");

        // extract FIRST NAME only
        const firstName = fullName.split(" ")[0];

        return {
          uid: d.id,
          displayName: firstName,
          streak: raw.streak ?? 0,
          streakFreezeAvailable: raw.streakFreezeAvailable ?? false,
        };
      });

      // sort by streak descending
      data.sort((a, b) => b.streak - a.streak);

      setUsers(data);
    }

    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f1f] to-black text-white px-6 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-300 to-red-400 text-transparent bg-clip-text">
            🔥 Streakboard
          </h1>

          <Link
            href="/account"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
        </div>

        <div className="space-y-3">
          {users.map((entry, index) => (
            <motion.div
              key={entry.uid}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold w-10 text-center">
                  {index + 1}
                </span>

                <span className="text-lg font-medium">
                  {entry.displayName}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-400" />
                <span className="text-xl font-semibold text-orange-300">
                  {entry.streak}
                </span>

                {entry.streakFreezeAvailable && (
                  <Snowflake className="w-5 h-5 text-blue-300 ml-2" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-sm text-gray-500 text-center">
          Only the top 50 users are shown.
        </p>
      </motion.div>
    </div>
  );
}
