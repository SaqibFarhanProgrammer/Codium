'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [isSubmit, setisSubmit] = useState('');
  const [isUserRegister, setisUserRegister] = useState('');
  const router = useRouter();

  const RegisterUser = async (data) => {
    const { username, email, password } = data;
    try {
      setisSubmit('loading');
      const response = await axios.post('/api/users/signup', {
        username: username,
        email: email,
        password: password,
      });

      console.log(response);

      if (response.status === 200) {
        setisSubmit('user created');
        router.push('/profile');
      }

      console.log(response.status);

      setisSubmit('loading false');
    } catch (error) {
      console.log('cath error ' + error);
      setisUserRegister('User Already Exits');
      setisSubmit('loading false');
    }
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
          <div className="text-[15px] text-red-400">
            {isUserRegister === 'User Already Exits' ? 'user Already exits' : ''}
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-white text-black font-medium"
          >
            {isSubmit === 'loading' ? 'loading' : 'SignUp'}
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
