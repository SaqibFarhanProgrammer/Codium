'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const posts = [
  {
    id: '1',
    title: 'CSS Grid Basics',
    content: 'CSS Grid se complex layouts bohot asaani se ban jaate hain.',
  },
  {
    id: '2',
    title: 'Next.js Routing',
    content: 'Next.js App Router production apps ke liye design kiya gaya hai.',
  },
  {
    id: '3',
    title: 'React Thinking',
    content: 'React sirf library nahi, ek thinking style hai.',
  },
];

function Page() {
  const params = useParams();
  const id = params.id;

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative z-1    text-white flex items-center justify-center px-6">
      <Link href="/blog/blogposts">
        <Button className="absolute top-15 left-2">back</Button>
      </Link>
      <div className="max-w-xl w-full border border-gray-700 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        <p className="text-gray-300 mb-6">{post.content}</p>

        <div className="flex gap-4">
          <button className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
            Like
          </button>
          <button className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
