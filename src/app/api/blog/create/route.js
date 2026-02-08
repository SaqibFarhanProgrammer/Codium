import { Blog } from '@/models/blog.model';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { title, content } = await request.json();
  if (!title || !content) {
    return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
  }

  return NextResponse.json({ status: 200 }, { message: 'success' });
}
