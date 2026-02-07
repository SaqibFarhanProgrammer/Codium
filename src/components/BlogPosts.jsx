import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { islogin } from '../../appConfig';

const posts = [
  {
    id: 1,
    title: 'Mastering React Components',
    description:
      'Learn how to structure reusable and scalable React components for real-world applications.',
    author: 'Saqib',
    date: 'Jan 15',
    readTime: '5 min',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Understanding JavaScript Closures',
    description:
      'Closures are one of the most powerful concepts in JavaScript. This guide explains them simply.',
    author: 'Saqib',
    date: 'Jan 12',
    readTime: '8 min',
    image:
      'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Clean UI Design Principles',
    description:
      "Designing clean interfaces is not about decoration. It's about clarity and usability.",
    author: 'Saqib',
    date: 'Jan 10',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'The Future of Web Development',
    description:
      'Exploring upcoming trends and technologies that will shape the next decade of web development.',
    author: 'Saqib',
    date: 'Jan 8',
    readTime: '6 min',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Building Scalable APIs',
    description: 'Best practices for designing RESTful APIs that can handle millions of requests.',
    author: 'Saqib',
    date: 'Jan 5',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'CSS Grid Mastery',
    description: 'Complete guide to modern CSS Grid layout with practical examples and use cases.',
    author: 'Saqib',
    date: 'Jan 2',
    readTime: '7 min',
    image:
      'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop',
  },
];

function BlogPosts() {
  if (islogin) {
    redirect('/auth');
  }

  return (
    <section className="min-h-screen etral-950 py-20 mt-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-3xl font-light text-neutral-100 mb-2">Latest Writing</h2>
          <p className="text-neutral-600 text-sm">
            Thoughts on development, design, and technology
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/blogposts/${post.id}`} className="group block">
              <article className="h-full flex flex-col">
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden rounded-lg mb-4 bg-neutral-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-neutral-600 mb-3">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-700" />
                    <span>{post.readTime} read</span>
                  </div>

                  <h3 className="text-lg font-medium text-neutral-200 mb-2 group-hover:text-neutral-100 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4">
                    {post.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-neutral-900 flex items-center justify-between">
                    <span className="text-xs text-neutral-600">{post.author}</span>
                    <span className="text-xs text-neutral-700 group-hover:text-neutral-400 transition-colors">
                      Read →
                    </span>
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
