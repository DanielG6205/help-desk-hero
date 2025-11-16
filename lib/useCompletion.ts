"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/app/components/fb/AuthContent";
import { db } from "./firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";

// ------------------------------
// 🔥 Helper: Update Public Leaderboard
// ------------------------------
async function updateLeaderboardEntry(
  uid: string,
  displayName: string | null,
  completedCount: number
) {
  const name = displayName || "Anonymous";

  const ref = doc(db, "leaderboard", uid);

  await setDoc(
    ref,
    {
      displayName: name,
      completed: completedCount,
      updatedAt: Date.now(),
    },
    { merge: true }
  );
}

// ------------------------------
// 🔥 MAIN HOOK
// ------------------------------
export function useCompletion() {
  const { user } = useAuth();

  // store completed IDs in a Set for fast lookup
  const [doneIds, setDoneIds] = useState<Set<number>>(new Set());

  // -----------------------------------------------------
  // 🔥 Load the user's completion from Firestore in realtime
  // -----------------------------------------------------
  useEffect(() => {
    if (!user) {
      setDoneIds(new Set());
      return;
    }

    const completionRef = collection(db, "users", user.uid, "completion");

    const unsub = onSnapshot(completionRef, (snapshot) => {
      const newSet = new Set<number>();

      snapshot.forEach((d) => newSet.add(Number(d.id)));

      setDoneIds(newSet);

      // Every time completion changes → update leaderboard
      updateLeaderboardEntry(
        user.uid,
        user.displayName || user.email?.split("@")[0] || "Anonymous",
        newSet.size
      );
    });

    return () => unsub();
  }, [user]);

  // -----------------------------------------------------
  // 🔥 Check if problem is done
  // -----------------------------------------------------
  const isDone = useCallback(
    (id: number) => doneIds.has(id),
    [doneIds]
  );

  // -----------------------------------------------------
  // 🔥 Toggle completion + update leaderboard
  // -----------------------------------------------------
  const setDone = useCallback(
    async (id: number, done: boolean) => {
      if (!user) return;

      const ref = doc(db, "users", user.uid, "completion", String(id));

      if (done) {
        await setDoc(ref, { done: true });
      } else {
        await deleteDoc(ref);
      }

      // Leaderboard is auto-updated by snapshot listener above
    },
    [user]
  );

  return {
    isDone,
    setDone,
    doneIds,
  };
}
