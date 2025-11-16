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
  getDocs,
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

      // Update leaderboard automatically
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

      // Leaderboard auto-updates via snapshot above
    },
    [user]
  );

  // -----------------------------------------------------
  // Reset ALL progress (delete all completion docs)
  // -----------------------------------------------------
  const resetAll = useCallback(
    async () => {
      if (!user) return;

      const completionRef = collection(db, "users", user.uid, "completion");

      const snapshot = await getDocs(completionRef);

      // Delete each completion document
      const deletions: Promise<any>[] = [];
      snapshot.forEach((docItem) => {
        deletions.push(deleteDoc(docItem.ref));
      });

      await Promise.all(deletions);

      // Local state reset
      setDoneIds(new Set());
    },
    [user]
  );

  return {
    isDone,
    setDone,
    doneIds,
    resetAll, // ← added here
  };
}
