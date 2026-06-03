import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { getUserFromCookie } from '@/lib/auth';

function serializeDoc(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
  };
}

export async function GET() {
  try {
    const decoded = await getUserFromCookie();
    if (!decoded) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const userDoc = await adminDb.collection('users').doc(decoded.uid).get();
    if (!userDoc.exists) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const postsSnapshot = await adminDb
      .collection('posts')
      .where('authorId', '==', decoded.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const blogs = postsSnapshot.docs.map(serializeDoc);
    const userData = {
      uid: decoded.uid,
      ...userDoc.data(),
      blogs,
    };

    return NextResponse.json({ authenticated: true, userData }, { status: 200 });
  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json({ authenticated: false, error: error.message }, { status: 401 });
  }
}
