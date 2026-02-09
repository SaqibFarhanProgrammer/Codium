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
      await axios.get('/api/users/logout');
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
    {/* Header - Cleaner with better spacing */}
    <div className="flex justify-between items-center mb-12">
      <div className="flex items-center gap-4">
        <img
          src="https://img.icons8.com/liquid-glass-color/1200/gender-neutral-data.jpg"
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-300 ring-2 ring-neutral-800"
        />
        <div>
          <h1 className="text-lg font-medium tracking-tight text-neutral-100">
            {loading ? <Skeleton className="w-32 h-5" /> : data?.username}
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">Writer & Creator</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors px-4 py-2 rounded-lg hover:bg-neutral-900"
      >
        Logout
      </button>
    </div>

    {/* Stats - Horizontal grid with better visual separation */}
    <div className="grid grid-cols-3 gap-8 mb-12 p-6 bg-neutral-900/30 rounded-2xl border border-neutral-900">
      <div className="text-center">
        <div className="text-3xl font-light text-neutral-100">
          {loading ? <Skeleton className="w-12 h-8 mx-auto" /> : data?.blogs?.length || 0}
        </div>
        <div className="text-xs text-neutral-500 uppercase tracking-wider mt-2 font-medium">Posts</div>
      </div>
      <div className="text-center border-x border-neutral-800">
        <div className="text-3xl font-light text-neutral-100">
          {loading ? <Skeleton className="w-12 h-8 mx-auto" /> : "2.4k"}
        </div>
        <div className="text-xs text-neutral-500 uppercase tracking-wider mt-2 font-medium">Views</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-light text-neutral-100">
          {loading ? <Skeleton className="w-12 h-8 mx-auto" /> : "128"}
        </div>
        <div className="text-xs text-neutral-500 uppercase tracking-wider mt-2 font-medium">Likes</div>
      </div>
    </div>

    {/* Articles - Card based layout with better hierarchy */}
    <div className="mb-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
          Latest Articles
        </h2>
        <span className="text-xs text-neutral-600">{data?.blogs?.length || 0} total</span>
      </div>

      <div className="space-y-4">
        {!loading &&
          data?.blogs?.map((blog, index) => (
            <article
              key={blog._id}
              className="group p-6 rounded-xl bg-neutral-900/20 border border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/40 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-neutral-600 font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-neutral-100 group-hover:text-neutral-50 transition-colors mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2">
                    {blog.description}
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
      </div>
    </div>

    {/* New Post Button - Better positioned and styled */}
    <button className="fixed bottom-8 right-8 w-14 h-14 bg-neutral-100 text-neutral-950 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-2xl shadow-neutral-950/50 group">
      <svg 
        className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>
</div>
  );
}
