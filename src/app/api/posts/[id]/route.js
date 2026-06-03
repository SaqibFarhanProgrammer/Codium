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

export async function GET(request, { params }) {
  try {
    const postRef = adminDb.collection('posts').doc(params.id);
    const postDoc = await postRef.get();

    if (!postDoc.exists) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, post: serializePost(postDoc) }, { status: 200 });
  } catch (error) {
    console.error('Post detail error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const decoded = await getUserFromCookie();
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const postRef = adminDb.collection('posts').doc(params.id);
    const postDoc = await postRef.get();

    if (!postDoc.exists) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }

    const post = postDoc.data();
    if (post.authorId !== decoded.uid) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { title, description, content, image } = await request.json();
    if (!title || !content) {
      return NextResponse.json({ success: false, message: 'Title and content are required' }, { status: 400 });
    }

    await postRef.update({
      title,
      description: description || content.slice(0, 160),
      content,
      image: image || null,
      updatedAt: adminFieldValue.serverTimestamp(),
    });

    const updatedPost = await postRef.get();
    return NextResponse.json({ success: true, post: serializePost(updatedPost) }, { status: 200 });
  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const decoded = await getUserFromCookie();
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const postRef = adminDb.collection('posts').doc(params.id);
    const postDoc = await postRef.get();

    if (!postDoc.exists) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }

    const post = postDoc.data();
    if (post.authorId !== decoded.uid) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    await postRef.delete();
    return NextResponse.json({ success: true, message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
