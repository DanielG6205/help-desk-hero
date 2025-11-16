"use client";

import { Problem } from "./index";

export default function ProblemCard({
  problem,
  done,
  premiumStatus,
}: {
  problem: Problem;
  done?: boolean;
  premiumStatus: "free" | "monthly" | "yearly";
}) {
  const isPremiumLocked =
    problem.premium && !done && premiumStatus === "free";

  return (
    <div
      className={`p-5 bg-white/5 border border-white/10 rounded-xl hover:border-teal-400/40 transition cursor-pointer backdrop-blur-md
      ${isPremiumLocked ? "opacity-60" : ""}
      flex flex-col justify-between
      min-h-[220px]   /* 🔥 makes all cards the same height */
      `}
    >
      {/* -------- TOP ROW: Difficulty | Premium | Done -------- */}
      <div>
        <div className="flex items-center justify-between mb-3">
          {/* Difficulty */}
          <span
            className={`text-sm font-semibold ${
              problem.difficulty === "Easy"
                ? "text-green-300"
                : problem.difficulty === "Medium"
                ? "text-yellow-300"
                : "text-red-400"
            }`}
          >
            {problem.difficulty}
          </span>

          {/* Premium (HIDDEN if done OR user is premium) */}
          {isPremiumLocked && (
            <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 backdrop-blur-sm">
              <span className="text-sm">🔒</span> Premium
            </div>
          )}

          {/* Done */}
          {done && (
            <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Done
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="text-xl font-semibold mb-3 line-clamp-2">
          {problem.name}
        </h3>
      </div>

      {/* -------- Skills -------- */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {problem.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 bg-teal-400/20 text-teal-300 rounded-lg border border-teal-400/30 text-xs"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
