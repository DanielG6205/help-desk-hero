"use client";

import { Problem } from "./index";

export default function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <div className="p-5 bg-white/5 border border-white/10 rounded-xl hover:border-teal-400/40 transition cursor-pointer backdrop-blur-md">
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
