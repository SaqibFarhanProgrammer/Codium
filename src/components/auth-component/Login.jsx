import Context from '@/context/context';
import Link from 'next/link';
import { useContext } from 'react';

export default function Login() {
  const { settoggleAuth } = useContext(Context);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
        <h1 className="text-3xl font-semibold mb-2">Welcome back</h1>
        <p className="text-sm text-zinc-400 mb-8">Sign in to continue writing</p>

        <form className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-transparent border-b border-white/20 py-3 outline-none placeholder:text-zinc-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent border-b border-white/20 py-3 outline-none placeholder:text-zinc-500"
          />

          <button className="w-full py-3 rounded-full bg-white text-black font-medium">
            Login
          </button>
        </form>

        <p className="text-sm text-zinc-500 mt-6">
          Don’t have an account?{' '}
          <button onClick={() => settoggleAuth('register')} className="text-white">
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
