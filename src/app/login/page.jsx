'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function Login() {
  const router = useRouter();
  const [ErrorsLogin, setErrorsLogin] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function LoginUser(data) {
    try {
      const { email, password } = data;

      const response = await axios.post('/api/users/login', {
        email: email,
        password: password,
      });

      console.log(response);
      if (response.status === 200) {
        router.push('/profile');
      }

      console.log(ErrorsLogin);
    } catch (error) {
      if (error.response) {
        console.log(error.response);

        if (error.response.status === 401) {
          console.log(error.response.status);
          setErrorsLogin('Invelid cridintials');
        }
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
        <h1 className="text-3xl font-semibold mb-2">Welcome back</h1>
        <p className="text-sm text-zinc-400 mb-8">Sign in to continue writing</p>

        <form onSubmit={handleSubmit(LoginUser)} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
              className="w-full bg-transparent border-b border-white/20 py-3 outline-none placeholder:text-zinc-500"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="w-full bg-transparent border-b border-white/20 py-3 outline-none placeholder:text-zinc-500"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="text-[15px] text-red-500">
            {ErrorsLogin === 'Invelid cridintials' ? 'Invelid credentials' : null}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full py-3 rounded-full bg-white text-black font-medium disabled:opacity-60"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-zinc-500 mt-6">
          Don’t have an account?{' '}
          <Link href="/register" className="text-white">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
