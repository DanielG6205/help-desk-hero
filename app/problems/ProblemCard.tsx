"use client";

import { Problem } from "./index";

export default function ProblemCard({
  problem,
  done,
}: {
  problem: Problem;
  done?: boolean;
}) {
  return (
    <div className="relative p-5 bg-white/5 border border-white/10 rounded-xl hover:border-teal-400/40 transition cursor-pointer backdrop-blur-md">
      {/* Done badge */}
      {done && (
        <div className="absolute top-3 right-3 flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
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

      <h3 className="text-xl font-semibold mt-3 mb-3">{problem.name}</h3>

      <div className="flex flex-wrap gap-2">
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
