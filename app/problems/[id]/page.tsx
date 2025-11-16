// app/problems/[id]/page.tsx
"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { problems } from "../index";
import { useCompletion } from "../../../lib/useCompletion";

export default function ProblemDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { isDone, setDone } = useCompletion();

  // parse id from route
  const problemId = Number(params.id);

  // find the problem data
  const problem = useMemo(
    () => problems.find((p) => p.id === problemId),
    [problemId]
  );

  // compute completion from the numeric id (avoids TS undefined warning)
  const done = isDone(problemId);

  async function toggleDone() {
    await setDone(problemId, !done);
  }

  // soft notFound: send them back to list if bad id
  if (!problem) {
    if (typeof window !== "undefined") router.replace("/problems");
    return null;
  }

  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md">
        {/* Title + Done toggle */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
            {problem.name}
          </h1>

          <button
            onClick={toggleDone}
            className={`shrink-0 mt-1 px-4 py-2 rounded-lg border transition
              ${
                done
                  ? "bg-emerald-600 hover:bg-emerald-700 border-emerald-400/40"
                  : "bg-white/10 hover:bg-white/15 border-white/20"
              }`}
            title={done ? "Mark as not done" : "Mark as done"}
          >
            {done ? "✓ Done" : "Mark Done"}
          </button>
        </div>

        {/* Difficulty + Skills */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-gray-300">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
            Difficulty: {problem.difficulty}
          </span>
          <div className="flex flex-wrap gap-2">
            {problem.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Download RDP Button */}
        <a
          href={problem.rdpFile}
          download
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
        >
          Download RDP File
        </a>

        {/* Instructions */}
        <div className="mt-10 bg-white/5 border border-white/10 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>

          <ol className="list-decimal ml-6 space-y-3 text-gray-300">
            {problem.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <p className="mt-6 text-gray-400 text-sm">
            Use the RDP file above to access the virtual machine for this scenario.
          </p>
        </div>
      </div>
    </div>
  );
}
