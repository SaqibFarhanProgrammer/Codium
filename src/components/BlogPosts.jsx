import React from "react"

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
    id: 3,
    title: "Clean UI Design Principles",
    description:
      "Designing clean interfaces is not about decoration. It's about clarity and usability.",
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
    id: 3,
    title: "Clean UI Design Principles",
    description:
      "Designing clean interfaces is not about decoration. It's about clarity and usability.",
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
    id: 3,
    title: "Clean UI Design Principles",
    description:
      "Designing clean interfaces is not about decoration. It's about clarity and usability.",
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
    id: 3,
    title: "Clean UI Design Principles",
    description:
      "Designing clean interfaces is not about decoration. It's about clarity and usability.",
    author: "Saqib",
  },
]

function BlogPosts() {
  return (
    <section className="w-full h-['90vh'] p-0 pt-30  py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-zinc-100 mb-10">
          Latest Blog Posts
        </h2>

        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-xl border border-zinc-900 p-6 hover:shadow-md transition"
            >
              <h3 className="text-3xl font-semibold text-zinc-50 mb-2">
                {post.title}
              </h3>

              <p className="text-zinc-600 text-['15px']  mb-6">
                {post.description}
              </p>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />

                <div>
                  <p className="text-sm font-medium text-zinc-900">
                    {post.author}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Author
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogPosts
