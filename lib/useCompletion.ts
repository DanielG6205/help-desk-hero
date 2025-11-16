"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Local + API-synced completion state for problems.
 * - Persists to localStorage: "problemCompletion"
 * - Calls your API when toggled (optimistic; falls back to local only on error)
 *
 * Replace the two fetch() calls with your real endpoint/shape.
 */
export function useCompletion() {
  type MapType = Record<number, boolean>;
  const STORAGE_KEY = "problemCompletion";

  const [map, setMap] = useState<MapType>({});

  // Load once from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMap(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // Persist whenever map changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch {
      // ignore
    }
  }, [map]);

  const isDone = useCallback((id: number) => !!map[id], [map]);

  const doneIds = useMemo(
    () => new Set<number>(Object.entries(map).filter(([, v]) => v).map(([k]) => Number(k))),
    [map]
  );

  // ---- API helpers (optimistic) ----
  async function markDoneAPI(id: number) {
    // TODO: replace with your real API
    // Example optimistic call:
    await fetch(`/api/problems/${id}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
  }

  async function markUndoneAPI(id: number) {
    // TODO: replace with your real API
    await fetch(`/api/problems/${id}/complete`, {
      method: "DELETE",
    });
  }

  const setDone = useCallback(
    async (id: number, done: boolean) => {
      // optimistic update
      setMap((m) => ({ ...m, [id]: done }));

      try {
        if (done) {
          await markDoneAPI(id);
        } else {
          await markUndoneAPI(id);
        }
      } catch (e) {
        // rollback on failure
        setMap((m) => ({ ...m, [id]: !done }));
        console.error("Completion sync failed:", e);
        alert("Could not sync with server. Your local status is preserved.");
      }
    },
    []
  );

  return { isDone, setDone, doneIds, map };
}
