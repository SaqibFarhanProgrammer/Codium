import { adminAuth, adminDb, adminFieldValue } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized: Token not found' }, { status: 401 });
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);

    if (!decoded || !decoded.uid) {
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const { title, content, image } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
    }

    const newPost = {
      title,
      content,
      image: image || null,
      authorId: decoded.uid,
      authorName: decoded.name || decoded.email || 'Anonymous',
      likes: 0,
      views: 0,
      description: content.slice(0, 140),
      createdAt: adminFieldValue.serverTimestamp(),
    };

    const docRef = adminDb.collection('posts').doc();
    await docRef.set(newPost);

    return NextResponse.json(
      {
        message: 'Blog created successfully',
        data: { id: docRef.id, ...newPost },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Blog create API error:', error);
    return NextResponse.json(
      { message: 'Error creating blog', error: error.message },
      { status: 500 }
    );
  }
}
