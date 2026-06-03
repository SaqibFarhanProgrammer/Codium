import { NextResponse } from 'next/server';
import { adminDb, adminFieldValue } from '@/lib/firebaseAdmin';

export async function POST(request, { params }) {
  try {
    const postRef = adminDb.collection('posts').doc(params.id);
    const postDoc = await postRef.get();

    if (!postDoc.exists) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }

    await postRef.update({ views: adminFieldValue.increment(1) });
    const updatedPost = await postRef.get();
    const views = updatedPost.data()?.views || 0;

    return NextResponse.json({ success: true, views }, { status: 200 });
  } catch (error) {
    console.error('Increment views error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
