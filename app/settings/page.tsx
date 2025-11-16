"use client";

import { useState, useEffect } from "react";
import { updateProfile, deleteUser } from "firebase/auth";
import { useAuth } from "@/app/components/fb/AuthContent";
import LoginRequired from "@/app/components/fb/LoginRequired";
import { auth } from "@/lib/firebase";
import { useCompletion } from "@/lib/useCompletion";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const { resetAll } = useCompletion();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  // Confirmation modals
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (user?.displayName) setName(user.displayName);
  }, [user]);

  if (loading) return null;
  if (!user) return <LoginRequired />;

  // Save new name
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

  // RESET PROGRESS
  async function handleResetProgress() {
    try {
      await resetAll();
      setConfirmReset(false);
      alert("All progress reset successfully!");
    } catch (err) {
      alert("Failed to reset progress.");
    }
  }

  // DELETE ACCOUNT
  async function handleDeleteAccount() {
    try {
      await deleteUser(auth.currentUser!);
      alert("Your account has been deleted.");
    } catch (err: any) {
      alert(err.message || "Failed to delete account.");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-24">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md">
        
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
          Settings
        </h1>

        {/* NAME */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Display Name</label>
          <input
            className="w-full px-4 py-2 rounded bg-black/40 border border-white/20 outline-none text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
          />
        </div>

        {status === "success" && (
          <p className="text-emerald-400 mb-4">Name updated successfully!</p>
        )}
        {status && status !== "success" && (
          <p className="text-red-400 mb-4">{status}</p>
        )}

        <button
          onClick={save}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium mb-10"
        >
          Save Changes
        </button>

        {/* RESET PROGRESS */}
        <div className="mt-10 border-t border-white/10 pt-10">
          <h2 className="text-2xl font-bold mb-4">Progress</h2>

          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-medium"
            >
              Reset All Progress
            </button>
          ) : (
            <div className="bg-yellow-900/40 border border-yellow-600 p-4 rounded-lg">
              <p className="mb-4">Are you sure? This will erase all completed problems.</p>
              <div className="flex gap-3">
                <button
                  onClick={handleResetProgress}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* DELETE ACCOUNT */}
        <div className="mt-10 border-t border-white/10 pt-10">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Danger Zone</h2>

          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium"
            >
              Delete Account
            </button>
          ) : (
            <div className="bg-red-900/40 border border-red-600 p-4 rounded-lg">
              <p className="mb-4">
                This action is permanent. Your account and all data will be deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
