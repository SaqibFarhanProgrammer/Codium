import React from 'react';

const posts = [
  {
    id: 1,
    title: 'Mastering React Components',
    description:
      'Learn how to structure reusable and scalable React components for real-world applications.',
    author: 'Saqib',
  },
  {
    id: 2,
    title: 'Understanding JavaScript Closures',
    description:
      'Closures are one of the most powerful concepts in JavaScript. This guide explains them simply.',
    author: 'Saqib',
  },
  {
    id: 3,
    title: 'Clean UI Design Principles',
    description:
      "Designing clean interfaces is not about decoration. It's about clarity and usability.",
    author: 'Saqib',
  },
  {
    id: 4,
    title: 'Clean UI Design Principles',
    description:
      "Designing clean interfaces is not about decoration. It's about clarity and usability.",
    author: 'Saqib',
  },
  {
    id: 5,
    title: 'Clean UI Design Principles',
    description:
      "Designing clean interfaces is not about decoration. It's about clarity and usability.",
    author: 'Saqib',
  },
  {
    id: 6,
    title: 'Clean UI Design Principles',
    description:
      "Designing clean interfaces is not about decoration. It's about clarity and usability.",
    author: 'Saqib',
  },
];

export default function page({ params }) {
  if (!params) throw console.error('params not found');

  console.log(Number(params.post));

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col max-w-3xl mx-auto">
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300 transition">
          Back
        </button>
        <button className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
          Edit
        </button>
      </div>
    </div>
  );
}
