'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [authError, setAuthError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function LoginUser(data) {
    try {
      setAuthError('');
      const { email, password } = data;
      const response = await axios.post('/api/auth/login', { email, password });

      if (response.status === 200) {
        router.push('/profile');
      }
    } catch (error) {
      setAuthError(
        error.response?.data?.message === 'Invalid credentials'
          ? 'Invalid email or password'
          : 'Unable to sign in. Please try again.'
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl border border-slate-200 p-10">
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">Welcome back</h1>
        <p className="text-sm text-slate-500 mb-8">Sign in with your email to manage your posts.</p>

        <form onSubmit={handleSubmit(LoginUser)} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
              })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-black"
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-black"
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
          </div>

          {authError && <p className="text-red-500 text-sm">{authError}</p>}

          <button
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white font-medium hover:bg-black transition disabled:opacity-60"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-6">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-slate-900 font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
