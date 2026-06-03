import { NextResponse } from 'next/server';
import { adminDb, adminFieldValue } from '@/lib/firebaseAdmin';
import { getUserFromCookie } from '@/lib/auth';

function serializePost(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    description: data.description,
    content: data.content,
    image: data.image || null,
    authorId: data.authorId,
    authorName: data.authorName || 'Anonymous',
    likes: data.likes || 0,
    views: data.views || 0,
    commentsCount: data.commentsCount || 0,
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
    updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : null,
  };
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const sort = url.searchParams.get('sort');

    const snapshot = await adminDb.collection('posts').get();
    const posts = snapshot.docs.map(serializePost);

    if (sort === 'trending') {
      posts.sort(
        (a, b) =>
          (b.likes * 2 + (b.commentsCount || 0) + (b.views || 0)) -
          (a.likes * 2 + (a.commentsCount || 0) + (a.views || 0))
      );
    } else {
      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return NextResponse.json({ success: true, posts }, { status: 200 });
  } catch (error) {
    console.error('Posts list error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const decoded = await getUserFromCookie();
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, content, image } = await request.json();
    if (!title || !content) {
      return NextResponse.json({ success: false, message: 'Title and content are required' }, { status: 400 });
    }

    const postRef = await adminDb.collection('posts').add({
      title,
      description: description || content.slice(0, 160),
      content,
      image: image || null,
      authorId: decoded.uid,
      authorName: decoded.name || decoded.email || 'Anonymous',
      likes: 0,
      likedBy: [],
      views: 0,
      commentsCount: 0,
      createdAt: adminFieldValue.serverTimestamp(),
      updatedAt: adminFieldValue.serverTimestamp(),
    });

    const postSnap = await postRef.get();
    return NextResponse.json({ success: true, post: serializePost(postSnap) }, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
