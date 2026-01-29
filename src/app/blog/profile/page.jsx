export default function Profile() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <img
          src="https://i.pravatar.cc/120"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h3 className="text-xl font-semibold">Saqib</h3>
          <p className="text-white/60">Frontend Developer & Writer</p>
        </div>
      </div>
    </section>
  );
}
