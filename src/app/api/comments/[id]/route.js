import { NextResponse } from 'next/server';
import { adminDb, adminFieldValue } from '@/lib/firebaseAdmin';
import { getUserFromCookie } from '@/lib/auth';

export async function DELETE(request, { params }) {
  try {
    const decoded = await getUserFromCookie();
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const commentRef = adminDb.collection('comments').doc(params.id);
    const commentDoc = await commentRef.get();

    if (!commentDoc.exists) {
      return NextResponse.json({ success: false, message: 'Comment not found' }, { status: 404 });
    }

    const comment = commentDoc.data();
    if (comment.userId !== decoded.uid) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    await commentRef.delete();
    await adminDb.collection('posts').doc(comment.postId).update({
      commentsCount: adminFieldValue.increment(-1),
    });

    return NextResponse.json({ success: true, message: 'Comment deleted' }, { status: 200 });
  } catch (error) {
    console.error('Comment delete error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
