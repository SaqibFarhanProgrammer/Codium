import Link from "next/link";
import React from "react";

const posts = [
  {
    id: 1,
    title: "Mastering React Components",
    description:
      "Learn how to structure reusable and scalable React components for real-world applications.",
    author: "Saqib",
  },
  {
    id: 2,
    title: "Understanding JavaScript Closures",
    description:
      "Closures are one of the most powerful concepts in JavaScript. This guide explains them simply.",
    author: "Saqib",
  },
  {
    id: 3,
    title: "Clean UI Design Principles",
    description:
      "Designing clean interfaces is not about decoration. It's about clarity and usability.",
    author: "Saqib",
  },
  {
    id: 4,
    title: "Clean UI Design Principles",
    description:
      "Designing clean interfaces is not about decoration. It's about clarity and usability.",
    author: "Saqib",
  },
  {
    id: 5,
    title: "Clean UI Design Principles",
    description:
      "Designing clean interfaces is not about decoration. It's about clarity and usability.",
    author: "Saqib",
  },
  {
    id: 6,
    title: "Clean UI Design Principles",
    description:
      "Designing clean interfaces is not about decoration. It's about clarity and usability.",
    author: "Saqib",
  },
];

function BlogPosts() {
  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-semibold text-zinc-100 mb-14">
          Latest Writing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/blogposts/${post.id}`}
              className="group"
            >
              <article className="h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 transition hover:bg-white/10 hover:-translate-y-1">
                <h3 className="text-2xl font-semibold text-zinc-100 mb-3 leading-snug">
                  {post.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {post.description}
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex-shrink-0" />

                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      {post.author}
                    </p>
                    <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition">
                      Read article →
                    </p>
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
