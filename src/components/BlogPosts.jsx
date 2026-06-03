'use client';

import Link from 'next/link';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('latest');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      setError('');

      try {
        const response = await axios.get(`/api/posts?sort=${view === 'trending' ? 'trending' : 'latest'}`);
        setPosts(response.data.posts || []);
      } catch (err) {
        setError('Unable to load blog posts.');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [view]);

  return (
    <section className="min-h-screen bg-slate-50 py-24 pt-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-4xl font-semibold text-slate-900 mb-2">Latest Writing</h2>
            <p className="text-slate-500">Discover the latest posts, trending stories, and author updates.</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setView('latest')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                view === 'latest' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => setView('trending')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                view === 'trending' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'
              }`}
            >
              Trending
            </button>
          </div>
        </div>

        {error && <p className="mb-6 text-red-500">{error}</p>}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-72 rounded-3xl bg-slate-100 animate-pulse" />
              ))
            : posts.map((post) => (
                <Link key={post.id} href={`/blogposts/${post.id}`} className="group block">
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="h-48 overflow-hidden bg-slate-100">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-200" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                        {new Date(post.createdAt).toLocaleDateString()} · {post.likes} likes
                      </p>
                      <h3 className="text-xl font-semibold text-slate-900 line-clamp-2 mb-3">{post.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600 line-clamp-3">{post.description}</p>
                      <div className="mt-auto flex items-center justify-between pt-6 text-sm text-slate-500">
                        <span>{post.author?.name || 'Anonymous'}</span>
                        <span>{post.commentsCount} comments</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}

export default BlogPosts;
