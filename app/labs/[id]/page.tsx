"use client";

import { useParams } from "next/navigation";

import { useQuery, useMutation, useConvexAuth } from "convex/react";

import { api } from "@/convex/_generated/api";

import { useState } from "react";
import { useStoreUserEffect } from "@/app/useStoreUserEffect";

/**
 * Static Lab Detail Page
 * -------------------------------------------------------------
 * This version deliberately strips out:
 *  - Authentication / login gating
 *  - Premium access checks / locking
 *  - Remote completion tracking (was Firebase, pending Convex migration)
 *  - Completion key submission logic
 *
 * All data is rendered directly from the static `problems` array.
 * If an invalid lab id is provided, a simple fallback message is shown.
 *
 * To restore dynamic behavior later:
 *  - Add Convex queries for premium status and progress
 *  - Reintroduce completion key verification + persistence
 */

export default function ProblemDetailStatic() {
  const params = useParams<{ id: string }>();
  const problemId = Number(params.id);

  const { isAuthenticated } = useConvexAuth();
  useStoreUserEffect();

  const problem = useQuery(api.problems.getByNumber, { number: problemId });
  const progress = useQuery(api.users.getMyProgress, {});
  const submitKey = useMutation(api.users.submitCompletionKey);
  const [submissionKey, setSubmissionKey] = useState("");
  const [submitState, setSubmitState] = useState<{
    status: "idle" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  if (problem === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Lab Not Found</h1>

          <p className="text-gray-400">
            The requested lab ID ({problemId || "?"}) does not exist.
          </p>
          <a
            href="/labs"
            className="inline-block px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
          >
            Back to Labs
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md">
        {/* TITLE + PREMIUM BADGE */}
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <span className="bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
            {problem.name}
          </span>
          {problem.premium && (
            <span className="px-3 py-1 rounded-full bg-yellow-600/20 border border-yellow-500 text-yellow-300 text-sm">
              Premium
            </span>
          )}
        </h1>

        {/* IMAGE (optional) */}
        {problem.image && (
          <div className="mb-8">
            <img
              src={
                problem.image.startsWith("/")
                  ? problem.image
                  : `/labs/${problemId}/${problemId}.png`
              }
              alt={`${problem.name} preview`}
              className="w-full rounded-lg border border-white/10 object-cover max-h-96"
            />
          </div>
        )}

        {/* TAGS / METADATA */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-gray-300">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
            Difficulty: {problem.difficulty}
          </span>
          {problem.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* RDP DOWNLOAD BUTTONS (still static) */}
        <div className="flex items-center gap-4 mb-8">
          <a
            href={problem.serverRdpFile}
            download
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
          >
            Download Server RDP
          </a>
          <a
            href={problem.workshopRdpFile}
            download
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium"
          >
            Download Workstation RDP
          </a>
        </div>

        {/* CONTENT SECTIONS */}
        <div className="space-y-6">
          {/* Scenario */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Lab Scenario</h2>
            <ul className="space-y-2 text-gray-300 list-disc ml-6">
              {problem.labScenario.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>

          {/* Tasks */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Tasks</h2>
            <ol className="space-y-2 text-gray-300 list-decimal ml-6">
              {problem.labTasks.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ol>
          </div>

          {/* Expected Outcome */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Expected Outcome</h2>
            <ul className="space-y-2 text-gray-300 list-disc ml-6">
              {problem.expectedOutcome.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* COMPLETION STATUS (CONVEX) */}
        <div className="mt-10 bg-white/5 border border-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Completion</h2>
          {!isAuthenticated ? (
            <p className="text-gray-300">
              Sign in to track completion and submit the key for this lab.
            </p>
          ) : progress === undefined ? (
            <p className="text-gray-300">Loading your progress...</p>
          ) : progress.some((id) => id === problem._id) ? (
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-green-600/20 border border-green-500 text-green-300 text-sm">
                Completed
              </span>
              <p className="text-gray-300">
                You’ve already completed this lab.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-300">
                Enter the completion key to mark this lab as done.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={submissionKey}
                  onChange={(e) => setSubmissionKey(e.target.value)}
                  placeholder="Completion key"
                  className="w-full sm:w-auto flex-1 px-4 py-2 rounded-md bg-black/30 border border-white/20 outline-none"
                />
                <button
                  className="px-6 py-2 rounded-md bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!submissionKey || submitState.status === "success"}
                  onClick={async () => {
                    const key = submissionKey.trim();
                    try {
                      const res = await submitKey({
                        problemId: problem._id,
                        key,
                      });
                      if (res.result.kind === "success") {
                        setSubmitState({
                          status: "success",
                          message: res.result.alreadyCompleted
                            ? "Already completed."
                            : "Marked as completed!",
                        });
                      } else if (res.result.kind === "invalid_key") {
                        setSubmitState({
                          status: "error",
                          message: "Invalid completion key",
                        });
                      } else if (res.result.kind === "unauthenticated") {
                        setSubmitState({
                          status: "error",
                          message: "Please sign in first",
                        });
                      }
                    } catch {
                      setSubmitState({
                        status: "error",
                        message: "Server error submitting key",
                      });
                    }
                  }}
                >
                  Submit Key
                </button>
              </div>
              {submitState.status === "error" && (
                <p className="text-red-400">{submitState.message}</p>
              )}
              {submitState.status === "success" && (
                <p className="text-green-400">{submitState.message}</p>
              )}
            </div>
          )}
        </div>

        {/* BACK LINK */}
        <div className="mt-8 text-center">
          <a
            href="/labs"
            className="inline-block px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 transition font-medium"
          >
            ← Back to Labs
          </a>
        </div>
      </div>
    </div>
  );
}
