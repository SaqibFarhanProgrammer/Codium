export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-6 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-slate-600">
        <p>© 2026 MediumX — Built with clarity.</p>

        <div className="flex flex-wrap gap-6">
          <a href="#" className="hover:text-slate-900 transition">About</a>
          <a href="#" className="hover:text-slate-900 transition">Privacy</a>
          <a href="#" className="hover:text-slate-900 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
