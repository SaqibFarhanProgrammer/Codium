'use client';

import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch profile data
  async function getProfile() {
    try {
      const res = await axios.get('/api/users/me');

      setData(res.data.userData);
    } catch (error) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }

  // logout
  async function handleLogout() {
    try {
      await axios.get('/api/datas/logout');
    } finally {
      router.push('/login');
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 mt-10">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <div className="flex items-center gap-4">
            <img
              src="https://img.icons8.com/liquid-glass-color/1200/gender-neutral-data.jpg"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover grayscale"
            />

            <div>
              <h1 className="text-xl font-medium tracking-tight">
                {loading ? <Skeleton className="w-40 h-5" /> : data?.username}
              </h1>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mb-16 pb-16 border-b border-neutral-900">
          <div>
            <div className="text-2xl font-light">
              {loading ? <Skeleton className="w-10 h-6" /> : data?.blogs?.length || 0}
            </div>
            <div className="text-xs text-neutral-600 uppercase tracking-wider mt-1">Posts</div>
          </div>
        </div>

        {/* Articles */}
        <div>
          <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-8">
            Articles
          </h2>

          {!loading &&
            data?.blogs?.map((blog) => (
              <div key={blog._id} className="mb-6">
                <h3 className="text-lg">{blog.title}</h3>
                <p className="text-neutral-500 text-sm">{blog.description}</p>
              </div>
            ))}
        </div>

        {/* New Post Button */}
        <button className="fixed bottom-8 right-8 w-12 h-12 bg-neutral-100 text-neutral-950 rounded-full flex items-center justify-center hover:bg-neutral-300 transition-colors">
          +
        </button>
      </div>
    </div>
  );
}
