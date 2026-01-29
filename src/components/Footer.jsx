export default function Footer() {
  return (
    <footer className="w-full bg-black/50 backdrop-blur-md border-t border-white/10 py-6 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-400 text-sm">
        <p>© 2026 MediumX — Built with clarity.</p>

        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
