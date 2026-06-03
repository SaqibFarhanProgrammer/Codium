import { NextResponse } from 'next/server';
import { adminDb, adminFieldValue } from '@/lib/firebaseAdmin';
import { getUserFromCookie } from '@/lib/auth';

export async function POST(request, { params }) {
  try {
    const decoded = await getUserFromCookie();
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const postRef = adminDb.collection('posts').doc(params.postId);
    const postDoc = await postRef.get();
    if (!postDoc.exists) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }

    const post = postDoc.data();
    const userId = decoded.uid;
    const likedBy = post.likedBy || [];
    const liked = !likedBy.includes(userId);

    await postRef.update({
      likedBy: liked ? adminFieldValue.arrayUnion(userId) : adminFieldValue.arrayRemove(userId),
      likes: liked ? adminFieldValue.increment(1) : adminFieldValue.increment(-1),
    });

    const updatedDoc = await postRef.get();
    return NextResponse.json(
      {
        success: true,
        likes: updatedDoc.data()?.likes || 0,
        liked,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Toggle like error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
