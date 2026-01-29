import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">MediumX</h1>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/write">Write</Link>
          <Link href="/profile">Profile</Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-white text-black rounded-full"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
