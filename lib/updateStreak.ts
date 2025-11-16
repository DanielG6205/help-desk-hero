import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function updateStreak(uid: string, isPremium: boolean) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .slice(0, 10);

  const data = snap.exists() ? snap.data() : {};

  let streak = data.streak || 0;
  const last = data.lastSolvedDate || null;

  let streakFreezeAvailable = data.streakFreezeAvailable ?? false;
  let streakFreezeUsedOn = data.streakFreezeUsedOn ?? null;

  // Premium users get 1 freeze PER DAY automatically
  if (isPremium) {
    if (streakFreezeUsedOn !== today) {
      streakFreezeAvailable = true;
    }
  }

  // --- STREAK CALCULATION ---
  if (!last) {
    streak = 1;
  } else if (last === today) {
    streak = streak;
  } else if (last === yesterday) {
    streak += 1;
  } else {
    // Missed 1+ days
    if (isPremium && streakFreezeAvailable) {
      streakFreezeAvailable = false;

      await setDoc(
        ref,
        {
          streak,
          streakFreezeAvailable,
          streakFreezeUsedOn: today,
          lastSolvedDate: today,
        },
        { merge: true }
      );

      return streak;
    }

    // No freeze → reset
    streak = 1;
  }

  await setDoc(
    ref,
    {
      streak,
      lastSolvedDate: today,
      streakFreezeAvailable,
      streakFreezeUsedOn,
    },
    { merge: true }
  );

  return streak;
}
