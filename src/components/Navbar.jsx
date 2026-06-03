'use client';

import Context, { useAppContext } from '@/context/context';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
export default function Navbar() {
  const { isauth, setisauth } = useContext(Context);

  return (
    <nav className="fixed w-full top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-950">MediumX</h1>

        <div className="flex items-center gap-6 text-sm text-slate-700">
          <Link href="/">Home</Link>
          <Link href="/write">Write</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/login" className="px-4 py-2 rounded-full bg-black text-white transition hover:bg-slate-900">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
