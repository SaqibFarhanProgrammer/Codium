import React from 'react';

function Page() {
  return (
    <div className="min-h-[70vh] w-full b flex items-center">
      <div className="max-w-5xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex justify-center md:justify-start">
          <div className="h-40 w-40 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500" />
        </div>

        <div className="md:col-span-2 flex flex-col justify-center gap-4">
          <span className="text-sm uppercase tracking-widest text-zinc-500">Profile</span>

          <h2 className="text-3xl font-bold text-zinc-900">Saqib</h2>

          <p className="text-zinc-600 max-w-xl">
            Frontend developer focused on building clean user interfaces, scalable React
            applications, and modern web experiences.
          </p>

          <div className="flex gap-6 mt-2">
            <div>
              <p className="text-xl font-semibold text-zinc-900">2+</p>
              <p className="text-sm text-zinc-500">Years Learning</p>
            </div>

            <div>
              <p className="text-xl font-semibold text-zinc-900">15+</p>
              <p className="text-sm text-zinc-500">Projects</p>
            </div>

            <div>
              <p className="text-xl font-semibold text-zinc-900">React</p>
              <p className="text-sm text-zinc-500">Primary Stack</p>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button className="px-5 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition">
              Contact
            </button>

            <button className="px-5 py-2 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-200 transition">
              View Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
