'use client';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { useState } from 'react';

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isSubmit, setisSubmit] = useState("");

  const RegisterUser = async (data) => {
    const { username, email, password } = data;

    setisSubmit("loading");
    const response = await axios.post('/api/users/signup', {
      username: username,
      email: email,
      password: password,
    });

    if( response.status === 200){
      setisSubmit("user created")
    }


    setisSubmit("loading false");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
        <h1 className="text-3xl font-semibold mb-2">Create account</h1>
        <p className="text-sm text-zinc-400 mb-8">Start writing and sharing ideas</p>

        <form className="space-y-6" onSubmit={handleSubmit(RegisterUser)}>
          <div className="mb-5">
            <input
              {...register('username', { required: 'Username is required' })}
              type="text"
              placeholder="Username"
              className={`w-full bg-transparent border-b py-3 outline-none placeholder:text-zinc-500 ${
                errors.username ? 'border-red-400' : 'border-white/20'
              }`}
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div className="mb-5">
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
              })}
              type="email"
              placeholder="Email"
              className={`w-full bg-transparent border-b py-3 outline-none placeholder:text-zinc-500 ${
                errors.email ? 'border-red-400' : 'border-white/20'
              }`}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-5">
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
              type="password"
              placeholder="Password"
              className={`w-full bg-transparent border-b py-3 outline-none placeholder:text-zinc-500 ${
                errors.password ? 'border-red-400' : 'border-white/20'
              }`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-white text-black font-medium"
          >
            {isSubmit === 'loading' ? 'loading' : 'signup'}
          </button>
        </form>

        <p className="text-sm text-zinc-500 mt-6">
          Already have an account?{' '}
          <button type="submit" className="text-white">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
