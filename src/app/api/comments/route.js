import { NextResponse } from 'next/server';
import { adminDb, adminFieldValue } from '@/lib/firebaseAdmin';
import { getUserFromCookie } from '@/lib/auth';

function serializeComment(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    postId: data.postId,
    userId: data.userId,
    username: data.username,
    text: data.text,
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
  };
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const postId = url.searchParams.get('postId');
    if (!postId) {
      return NextResponse.json({ success: false, message: 'Missing postId' }, { status: 400 });
    }

    const commentsSnapshot = await adminDb
      .collection('comments')
      .where('postId', '==', postId)
      .orderBy('createdAt', 'desc')
      .get();

    const comments = commentsSnapshot.docs.map(serializeComment);
    return NextResponse.json({ success: true, comments }, { status: 200 });
  } catch (error) {
    console.error('Comments fetch error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const decoded = await getUserFromCookie();
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { postId, text } = await request.json();
    if (!postId || !text) {
      return NextResponse.json({ success: false, message: 'postId and text are required' }, { status: 400 });
    }

    const commentRef = await adminDb.collection('comments').add({
      postId,
      userId: decoded.uid,
      username: decoded.name || decoded.email || 'Anonymous',
      text,
      createdAt: adminFieldValue.serverTimestamp(),
    });

    await adminDb.collection('posts').doc(postId).update({
      commentsCount: adminFieldValue.increment(1),
    });

    const commentDoc = await commentRef.get();
    return NextResponse.json({ success: true, comment: serializeComment(commentDoc) }, { status: 201 });
  } catch (error) {
    console.error('Comment create error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
