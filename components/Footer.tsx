// Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-teal-400/30 mt-20 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-gray-400 tracking-wide text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-teal-300">HelpDeskHero</span>. All rights
          reserved.
        </p>

        <div className="mt-4">
          <div className="h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-60" />
        </div>
      </div>
    </footer>
  );
}
