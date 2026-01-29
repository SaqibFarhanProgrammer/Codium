'use client';

import Context, { useAppContext } from '@/context/context';

import Link from 'next/link';
import { useContext } from 'react';
export default function Navbar() {
  const { toggleAuth } = useContext(Context);

  console.log(toggleAuth);

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">MediumX</h1>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/write">Write</Link>
          <Link href="/blog/profile">Profile</Link>
          <Link href="/auth" className="px-4 py-2 bg-white text-black rounded-full">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
