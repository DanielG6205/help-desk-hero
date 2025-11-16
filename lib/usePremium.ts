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

    const uid = user.uid;

    async function load() {
      const ref = doc(db, "users", uid);
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
