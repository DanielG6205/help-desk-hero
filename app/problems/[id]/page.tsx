"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { problems } from "../index";
import { useCompletion } from "../../../lib/useCompletion";
import { useAuth } from "@/app/components/fb/AuthContent";
import LoginRequired from "@/app/components/fb/LoginRequired";

export default function ProblemDetail() {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (!user) return <LoginRequired />;

  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { isDone, setDone } = useCompletion();

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
      {/* KEEP all your original UI */}
    </div>
  );
}
