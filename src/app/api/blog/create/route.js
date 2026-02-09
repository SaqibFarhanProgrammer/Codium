import connectDB from '@/db/connectdb';
import { Blog } from '@/models/blog.model';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectDB();

  const cookiesStore = await cookies(); // await required
  const token = cookiesStore.get('token')?.value;
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized: Token not found' }, { status: 401 });
  }

  const data = jwt.verify(token, process.env.JWT_SECRET);

  if (!data || !data.id) {
    return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
  }

  const { title, content, image } = await request.json();
  console.log('from route', title, content, image);

  if (!title || !content) {
    return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
  }

  const blog = await Blog.create({
    title: title,
    content: content,
    image: image,
    author: data.id,
  });

  try {
    const savedBlog = await blog;
    return NextResponse.json(
      { message: 'Blog created successfully', data: savedBlog },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating blog', error: error.message },
      { status: 500 }
    );
  }
}
