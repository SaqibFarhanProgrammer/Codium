import React from 'react';
import HeroImage from '../../public/image.png'; // replace with your large image
import Link from 'next/link';
import { islogin } from '../../appConfig';
import { redirect } from 'next/navigation';

export default function HomePage() {

  return (
    <div className="w-full min-h-screen bg-black text-white ">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center">
        <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Text */}
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Build, Share & Learn Web Development
            </h1>

            <p className="text-zinc-300 text-lg max-w-xl">
              Writing about web development, design thinking, and lessons learned while building
              real-world projects. Learn, create, and grow with a modern platform.
            </p>

            <div className="flex gap-4 mt-4">
              <Link
                href="/auth"
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition font-medium"
              >
                Get Started
              </Link>

              <Link
                href="/auth"
                className="px-6 py-3 rounded-full border border-white text-white hover:bg-white hover:text-black transition"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 hidden md:flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow-2xl">
              <img src={HeroImage.src} alt="Illustration" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Modern Design</h3>
          <p className="text-zinc-400">Minimal, glassmorphic, and clean UI for better focus.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Reusable Components</h3>
          <p className="text-zinc-400">Professional structure for scalable React projects.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Real World Ready</h3>
          <p className="text-zinc-400">Designed with production-quality UX and accessibility.</p>
        </div>
      </section>
    </div>
  );
}
