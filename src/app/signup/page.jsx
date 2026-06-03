'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [authError, setAuthError] = useState('');
  const router = useRouter();

  const RegisterUser = async (data) => {
    try {
      setAuthError('');
      const { name, email, password } = data;
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        router.push('/profile');
      }
    } catch (error) {
      setAuthError(
        error.response?.data?.message === 'User already exists with this email'
          ? 'An account already exists for this email.'
          : 'Unable to create account. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl border border-slate-200 p-10">
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">Create account</h1>
        <p className="text-sm text-slate-500 mb-8">Start writing and sharing ideas.</p>

        <form className="space-y-6" onSubmit={handleSubmit(RegisterUser)}>
          <div>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              placeholder="Name"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-black outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
              })}
              type="email"
              placeholder="Email"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-black outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-black outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
          </div>

          {authError && <p className="text-red-500 text-sm">{authError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white font-medium hover:bg-black transition disabled:opacity-60"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-slate-900 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
