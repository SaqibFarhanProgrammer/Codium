import React from 'react';

function HomePage() {
  return (
    <div className="h-screen  w-full  flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center gap-6">
          <h1 className="text-4xl font-['bold'] md:text-5xl font-bold text-zinc-100 leading-tight">
            Ideas, Stories & <br /> Practical Knowledge
          </h1>

          <p className="text-zinc-100 font-['medium'] max-w-md">
            Writing about web development, design thinking, and lessons learned while building
            real-world projects.
          </p>

          <div className="flex gap-4 mt-2">
            <button className="px-6 py-3 rounded-lg bg-zinc-100 text-white hover:bg-zinc-100 transition">
              Get Started{' '}
            </button>

            <button className="px-6 py-3 rounded-lg border border-zinc-100 text-zinc-100 hover:bg-zinc-100 transition">
              SignUp{' '}
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 w-40 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 opacity-90" />
            <div className="h-40 w-40 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 opacity-90" />
            <div className="h-40 w-40 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 opacity-90" />
            <div className="h-40 w-40 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-100 opacity-90" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
