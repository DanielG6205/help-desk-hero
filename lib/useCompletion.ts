"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "@/app/components/fb/AuthContent";
import { usePremium } from "@/lib/usePremium";
import { updateStreak } from "@/lib/updateStreak";

export function useCompletion() {
  const { user } = useAuth();
  const premium = usePremium();

  const [doneIds, setDoneIds] = useState<Set<number>>(new Set());

  // ---------------------------------------------------------------------------
  // LOAD USER PROGRESS FROM FIRESTORE
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const d = snap.data();
        setDoneIds(new Set(d.doneIds || []));
      }
    }

    load();
  }, [user]);

  // ---------------------------------------------------------------------------
  // MARK PROBLEM DONE / UNDONE
  // ---------------------------------------------------------------------------
  async function setDone(id: number, value: boolean) {
    if (!user) return;

    const newSet = new Set(doneIds);

    if (value) newSet.add(id);
    else newSet.delete(id);

    setDoneIds(newSet);

    const completedCount = newSet.size;

    // Update user document
    await setDoc(
      doc(db, "users", user.uid),
      { doneIds: Array.from(newSet) },
      { merge: true }
    );

    // -------------------------------------------------------------------------
    // UPDATE LEADERBOARD ENTRY
    // -------------------------------------------------------------------------
    await setDoc(
      doc(db, "leaderboard", user.uid),
      {
        displayName: user.displayName || user.email?.split("@")[0] || "User",
        completed: completedCount,
        updatedAt: Date.now(),
      },
      { merge: true }
    );

    // -------------------------------------------------------------------------
    // UPDATE STREAK / STREAK FREEZE
    // -------------------------------------------------------------------------
    const isPremium =
      premium === "monthly" || premium === "yearly";

    await updateStreak(user.uid, isPremium);
  }

  // ---------------------------------------------------------------------------
  // CHECK IF USER COMPLETED A PROBLEM
  // ---------------------------------------------------------------------------
  function isDone(id: number) {
    return doneIds.has(id);
  }

  // ---------------------------------------------------------------------------
  // RESET ALL PROGRESS (Used in Settings)
  // ---------------------------------------------------------------------------
  async function resetAll() {
    if (!user) return;

    setDoneIds(new Set());

    await setDoc(
      doc(db, "users", user.uid),
      {
        doneIds: [],
        streak: 0,
        lastSolvedDate: null,
        streakFreezeAvailable: true,
        streakFreezeUsedOn: null,
      },
      { merge: true }
    );

    // Leaderboard reset
    await setDoc(
      doc(db, "leaderboard", user.uid),
      {
        completed: 0,
        updatedAt: Date.now(),
      },
      { merge: true }
    );
  }

  return { isDone, setDone, doneIds, resetAll };
}
