import { adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(token, true);
    const userDoc = await adminDb.collection('users').doc(decoded.uid).get();
    const postsSnapshot = await adminDb
      .collection('posts')
      .where('authorId', '==', decoded.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const blogs = postsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        _id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
      };
    });

    const userData = userDoc.exists
      ? { uid: decoded.uid, ...userDoc.data(), blogs }
      : { uid: decoded.uid, email: decoded.email, username: decoded.name || decoded.email, blogs };

    return NextResponse.json({ authenticated: true, userData }, { status: 200 });
  } catch (error) {
    console.error('Me API error:', error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
