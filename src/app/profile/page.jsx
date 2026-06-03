'use client';

import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getProfile() {
    try {
      const res = await axios.get('/api/auth/me');
      setData(res.data.userData);
    } catch (error) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await axios.get('/api/auth/logout');
    } finally {
      router.push('/login');
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-semibold text-slate-700">
              {loading ? '...' : data?.name?.[0] || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                {loading ? <Skeleton className="w-40 h-8" /> : data?.name}
              </h1>
              <p className="text-sm text-slate-500 mt-2">Your writer dashboard</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium hover:bg-slate-100 transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Posts</p>
            <p className="mt-4 text-3xl font-semibold">{loading ? <Skeleton className="w-16 h-8" /> : data?.blogs?.length || 0}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Views</p>
            <p className="mt-4 text-3xl font-semibold">1.2k</p>
          </div>
          <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Likes</p>
            <p className="mt-4 text-3xl font-semibold">84</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Your articles</p>
              <h2 className="text-2xl font-semibold mt-2">Recent drafts and published posts</h2>
            </div>
            <button
              onClick={() => router.push('/write')}
              className="rounded-full bg-slate-900 px-4 py-2 text-white text-sm font-medium hover:bg-black transition"
            >
              Create new post
            </button>
          </div>

          <div className="space-y-4">
            {!loading && data?.blogs?.length === 0 && (
              <p className="text-slate-500">You have not published any posts yet.</p>
            )}
            {!loading &&
              data?.blogs?.map((blog, index) => (
                <article key={blog._id} className="rounded-3xl border border-slate-200 p-5 hover:shadow-lg transition">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{blog.title}</h3>
                      <p className="text-sm text-slate-500 mt-2 line-clamp-2">{blog.description}</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
