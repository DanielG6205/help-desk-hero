"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/app/components/fb/AuthContent";
import { db } from "./firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot
} from "firebase/firestore";

// Firestore completion manager
export function useCompletion() {
  const { user } = useAuth();

  // store completed IDs in a Set for fast lookup
  const [doneIds, setDoneIds] = useState<Set<number>>(new Set());

  // Load the user's completion from Firestore in realtime
  useEffect(() => {
    if (!user) {
      setDoneIds(new Set());
      return;
    }

    const completionRef = collection(db, "users", user.uid, "completion");

    const unsub = onSnapshot(completionRef, (snapshot) => {
      const newSet = new Set<number>();

      snapshot.forEach((doc) => {
        newSet.add(Number(doc.id));
      });

      setDoneIds(newSet);
    });

    return () => unsub();
  }, [user]);

  // Check if a problem is done
  const isDone = useCallback(
    (id: number) => doneIds.has(id),
    [doneIds]
  );

  // Toggle completion
  const setDone = useCallback(
    async (id: number, done: boolean) => {
      if (!user) return;

      const ref = doc(db, "users", user.uid, "completion", String(id));

      if (done) {
        // mark as completed
        await setDoc(ref, { done: true });
      } else {
        // remove completion
        await deleteDoc(ref);
      }
    },
    [user]
  );

  return {
    isDone,
    setDone,
    doneIds
  };
}
