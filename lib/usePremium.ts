import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/app/components/fb/AuthContent";

export function usePremium() {
  const { user } = useAuth();

  const [premium, setPremium] = useState<"free" | "monthly" | "yearly" | null>(null);

  useEffect(() => {
    if (!user) {
      setPremium("free");
      return;
    }

    async function load() {
    if (!user || !user.uid) {
        console.error("User not logged in — cannot create Firestore doc ref.");
        return;
      }
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        const tier = data?.premium || "free";
        setPremium(tier);
      } else {
        setPremium("free");
      }
    }

    load();
  }, [user]);

  return premium;
}
