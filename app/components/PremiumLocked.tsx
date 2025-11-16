export default function PremiumLocked() {
  return (
    <div className="min-h-screen flex items-center justify-center text-white px-6">
      <div className="bg-white/5 border border-white/10 rounded-xl p-10 backdrop-blur-md text-center max-w-md">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-3xl font-bold mb-4">Premium Content</h1>
        <p className="text-gray-300 mb-6">
          This lab is available only to Premium members.
        </p>
        <a
          href="/premium"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
        >
          Upgrade to Premium
        </a>
      </div>
    </div>
  );
}
