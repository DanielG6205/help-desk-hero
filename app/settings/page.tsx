"use client";

import { useState, useEffect } from "react";
import { updateProfile, deleteUser } from "firebase/auth";
import { useAuth } from "@/components/fb/AuthContent";
import LoginRequired from "@/components/Login/LoginRequired";
import { auth } from "@/lib/firebase";
// Completion tracking temporarily disabled (Convex migration)

import { motion, AnimatePresence } from "framer-motion";
import { User, RefreshCcw, Trash2, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
  const { user, loading } = useAuth();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (user?.displayName) setName(user.displayName);
  }, [user]);

  if (loading) return null;
  if (!user) return <LoginRequired />;

  async function save() {
    setStatus("");

    try {
      await updateProfile(auth.currentUser!, {
        displayName: name.trim(),
      });
      setStatus("success");
    } catch (err: any) {
      setStatus(err.message || "Failed to update name.");
    }
  }

  async function handleResetProgress() {
    // Disabled during migration: no backend progress reset
    // NOTE: This previously cleared user completion (doneIds), streak counters,
    // and leaderboard stats stored in Firestore. During the Convex migration we
    // removed remote persistence, so triggering a reset now would only provide
    // misleading feedback (there is no server state to modify). Once Convex
    // progress + streak + leaderboard mutations are implemented, replace this
    // placeholder with a real mutation call (e.g. api.progress.resetAll).
    setConfirmReset(false);
    alert("Progress reset is temporarily disabled during migration to Convex.");
  }

  async function handleDeleteAccount() {
    try {
      await deleteUser(auth.currentUser!);
      alert("Your account has been deleted.");
    } catch (err: any) {
      alert(err.message || "Failed to delete account.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f1f] to-black text-white px-6 pt-24">
      {/* GLASS CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-10">
          <User className="w-10 h-10 text-cyan-300" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text">
            Settings
          </h1>
        </div>

        {/* DISPLAY NAME */}
        <div className="mb-8">
          <label className="block text-lg font-semibold mb-2">
            Display Name
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/20 outline-none text-white focus:ring-2 focus:ring-cyan-400 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
          />

          {/* STATUS FEEDBACK */}
          {status === "success" && (
            <p className="mt-3 text-emerald-400">Name updated successfully!</p>
          )}
          {status && status !== "success" && (
            <p className="mt-3 text-red-400">{status}</p>
          )}

          <button
            onClick={save}
            className="mt-5 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-lg hover:shadow-blue-700/40"
          >
            Save Changes
          </button>
        </div>

        {/* PROGRESS RESET */}
        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCcw className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-semibold">Progress</h2>
          </div>

          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-xl font-semibold transition shadow-lg hover:shadow-yellow-600/40"
            >
              Reset All Progress
            </button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-yellow-900/40 border border-yellow-600 p-5 rounded-xl"
              >
                <p className="mb-4">
                  Are you sure? This will erase all completed problems.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={handleResetProgress}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-xl font-semibold"
                  >
                    Yes, Reset
                  </button>

                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* DANGER ZONE */}
        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-semibold text-red-400">Danger Zone</h2>
          </div>

          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition shadow-lg hover:shadow-red-700/40"
            >
              Delete Account
            </button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-900/40 border border-red-600 p-5 rounded-xl"
              >
                <p className="mb-4">
                  This action is permanent. Your account and all data will be
                  deleted.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl font-semibold"
                  >
                    Yes, Delete
                  </button>

                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
}
