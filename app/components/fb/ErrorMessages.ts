// components/fb/errorMessages.ts

export const errorMessages: Record<string, string> = {
  "auth/invalid-credential": "Invalid email or password.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/too-many-requests":
    "Too many attempts. Your account is temporarily locked. Try again later.",
  "auth/popup-closed-by-user": "The login popup was closed.",
  "auth/popup-blocked":
    "Your browser blocked the login popup. Allow popups and try again.",
  "auth/network-request-failed":
    "Network error. Check your connection and try again.",
};
