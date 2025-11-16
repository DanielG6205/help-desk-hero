"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { problems } from "../index";
import { useCompletion } from "../../../lib/useCompletion";
import { useAuth } from "@/app/components/fb/AuthContent";
import LoginRequired from "@/app/components/fb/LoginRequired";

export default function ProblemDetail() {
  const { user, loading } = useAuth();
  const { isDone, setDone } = useCompletion();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  // AUTH GATE
  if (loading) return null;
  if (!user) return <LoginRequired />;

  const problemId = Number(params.id);

  const problem = useMemo(
    () => problems.find((p) => p.id === problemId),
    [problemId]
  );

  if (!problem) {
    router.replace("/problems");
    return null;
  }

  const done = isDone(problemId);

  async function toggleDone() {
    await setDone(problemId, !done);
  }

  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md">
        
        {/* Title + Done Toggle */}
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
          >
            {done ? "✓ Done" : "Mark Done"}
          </button>
        </div>

        {/* Difficulty & Skills */}
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

        {/* RDP Download */}
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
        </div>
      </div>
    </div>
  );
}
