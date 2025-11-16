"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { problems } from "../index";
import { useCompletion } from "../../../lib/useCompletion";
import { useAuth } from "@/app/components/fb/AuthContent";
import LoginRequired from "@/app/components/fb/LoginRequired";

export default function ProblemDetail() {
  // -----------------------------------------------------------
  // ✅ ALL HOOKS MUST BE AT THE TOP — NO CONDITIONAL RETURNS
  // -----------------------------------------------------------

  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user, loading } = useAuth();
  const { isDone, setDone } = useCompletion();

  const problemId = Number(params.id);

  const problem = useMemo(
    () => problems.find((p) => p.id === problemId),
    [problemId]
  );

  const done = isDone(problemId);

  const [inputKey, setInputKey] = useState("");
  const [error, setError] = useState("");

  const [openScenario, setOpenScenario] = useState(false);
  const [openTasks, setOpenTasks] = useState(false);
  const [openOutcome, setOpenOutcome] = useState(false);

  // -----------------------------------------------------------
  // ❗ AFTER ALL HOOKS — NOW WE CAN RETURN CONDITIONALLY
  // -----------------------------------------------------------

  if (loading) return null;
  if (!user) return <LoginRequired />;

  if (!problem) {
    router.replace("/problems");
    return null;
  }

  async function submitKey() {
    if (!problem) {
      setError("Problem not found.");
      return;
    }

    if (inputKey.trim() === problem.completionKey) {
      await setDone(problemId, true);
      setError("");
    } else {
      setError("Incorrect key. Try again.");
    }
  }

  // -----------------------------------------------------------
  // UI
  // -----------------------------------------------------------
  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md">
        
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
          {problem.name}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mb-8 text-gray-300">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
            Difficulty: {problem.difficulty}
          </span>

          {problem.skills.map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm"
            >
              {s}
            </span>
          ))}
        </div>

        {/* RDP BUTTONS */}
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
            Download Workshop RDP
          </a>
        </div>

        {/* DROPDOWN SECTIONS */}
        <div className="space-y-6">

          {/* Scenario */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
            <button
              className="text-xl font-semibold flex justify-between w-full"
              onClick={() => setOpenScenario(!openScenario)}
            >
              Lab Scenario <span>{openScenario ? "▲" : "▼"}</span>
            </button>

            {openScenario && (
              <ul className="mt-4 space-y-2 text-gray-300 list-disc ml-6">
                {problem.labScenario.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Tasks */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
            <button
              className="text-xl font-semibold flex justify-between w-full"
              onClick={() => setOpenTasks(!openTasks)}
            >
              Tasks <span>{openTasks ? "▲" : "▼"}</span>
            </button>

            {openTasks && (
              <ol className="mt-4 space-y-2 text-gray-300 list-decimal ml-6">
                {problem.labTasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ol>
            )}
          </div>

          {/* Expected Outcome */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
            <button
              className="text-xl font-semibold flex justify-between w-full"
              onClick={() => setOpenOutcome(!openOutcome)}
            >
              Expected Outcome <span>{openOutcome ? "▲" : "▼"}</span>
            </button>

            {openOutcome && (
              <ul className="mt-4 space-y-2 text-gray-300 list-disc ml-6">
                {problem.expectedOutcome.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}
          </div>

        </div>

        {/* Completion Key */}
        <div className="mt-10 bg-white/5 border border-white/10 p-6 rounded-lg">
          {!done ? (
            <>
              <h2 className="text-xl font-semibold mb-3">Enter Completion Key</h2>

              <input
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="w-full px-3 py-2 rounded bg-black/30 border border-white/20 outline-none text-white"
                placeholder="Enter key..."
              />

              {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}

              <button
                onClick={submitKey}
                className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Submit Key
              </button>
            </>
          ) : (
            <div className="text-emerald-400 text-lg font-semibold">
              ✓ Problem Completed
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
