import React from 'react';
import HeroImage from '../../public/image.png';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center py-24">
        <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Text */}
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Build, share, and learn with clean writing.
            </h1>

            <p className="text-slate-600 text-lg max-w-xl">
              Create stories, publish updates, and connect with your audience using a simple,
              minimalist writing experience with fast Firebase auth and Firestore storage.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row mt-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-black text-white hover:bg-slate-900 transition font-medium"
              >
                Get Started
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-slate-900 text-slate-900 bg-white hover:bg-slate-100 transition font-medium"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 hidden md:flex items-center justify-center">
            <div className="w-full max-w-md rounded-[2rem] overflow-hidden border border-slate-200 shadow-xl">
              <img src={HeroImage.src} alt="Illustration" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid gap-8 md:grid-cols-3">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Minimal Experience</h3>
          <p className="text-slate-600">A clean layout that keeps the focus on reading and writing.</p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Fast Firebase Auth</h3>
          <p className="text-slate-600">Email/password auth with secure session cookies and Firestore storage.</p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Ready to Publish</h3>
          <p className="text-slate-600">Easy post creation with a modern writing workflow.</p>
        </div>
      </section>
    </div>
  );
}
