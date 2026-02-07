'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [ProfileData, setProfileData] = useState({});
  const user = {
    name: 'Alex Chen',
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    bio: 'Frontend Developer & UI Designer',
  };

  const router = useRouter();

  const userBlogs = [
    {
      id: 1,
      title: 'Why Clean UI Matters More Than Fancy Design',
      description:
        'Clean interfaces reduce cognitive load and help users focus on what actually matters.',
      readTime: '4 min',
      date: 'Jan 15',
    },
    {
      id: 2,
      title: 'React Component Architecture Explained',
      description: 'A practical way to structure React components for scalability and reuse.',
      readTime: '6 min',
      date: 'Jan 10',
    },
    {
      id: 3,
      title: 'Glassmorphism Done Right',
      description: 'Glass UI should enhance focus, not distract users with noise.',
      readTime: '3 min',
      date: 'Jan 5',
    },
  ];

  async function handleLougOut() {
    const response = await axios.get('/api/users/logout');
    console.log(response);
    router.push('/login');
  }

  async function GetData() {
    const response = await axios.get('/api/users/me');
    setProfileData(response.data.userData);
  }

  useEffect(() => {
    GetData();
  }, []);

  async function handleeditprofile() {}

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 mt-10">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <div className="flex items-center gap-4">
            <img
              src={
                ProfileData.image === null
                  ? 'https://img.icons8.com/liquid-glass-color/1200/gender-neutral-user.jpg'
                  : ProfileData.image
              }
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover grayscale"
            />
            <div>
              <h1 className="text-xl font-medium tracking-tight">{ProfileData.username}</h1>
            </div>
          </div>

          <button
            onClick={handleLougOut}
            className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mb-16 pb-16 border-b border-neutral-900">
          <div>
            <div className="text-2xl font-light">{userBlogs.length}</div>
            <div className="text-xs text-neutral-600 uppercase tracking-wider mt-1">Posts</div>
          </div>
        </div>

        {/* Articles */}
        <div>
          <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-8">
            Articles
          </h2>

          <div className="space-y-8">
            {userBlogs.map((blog) => (
              <article key={blog.id} className="group cursor-pointer">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-medium group-hover:text-neutral-300 transition-colors">
                    {blog.title}
                  </h3>
                  <span className="text-xs text-neutral-600 tabular-nums">{blog.date}</span>
                </div>

                <p className="text-neutral-500 text-sm leading-relaxed mb-3 line-clamp-2">
                  {blog.description}
                </p>

                <span className="text-xs text-neutral-700">{blog.readTime} read</span>
              </article>
            ))}
          </div>
        </div>

        {/* New Post Button */}
        <button className="fixed bottom-8 right-8 w-12 h-12 bg-neutral-100 text-neutral-950 rounded-full flex items-center justify-center hover:bg-neutral-300 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button
          onClick={handleeditprofile}
          className="fixed bottom-8 left-8 w-12 h-12 bg-neutral-100 text-neutral-950 rounded-full flex items-center justify-center hover:bg-neutral-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          edit
        </button>
      </div>
    </div>
  );
}
