import { NextResponse } from 'next/server';
import { adminAuth, adminDb, adminFieldValue } from '@/lib/firebaseAdmin';
import { signInWithEmailPassword } from '@/lib/firebaseHelpers';

const SESSION_COOKIE_NAME = 'token';
const SESSION_EXPIRES_IN = 7 * 24 * 60 * 60 * 1000;

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, email, and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 });
    }

    try {
      await adminAuth.getUserByEmail(email);
      return NextResponse.json({ message: 'User already exists with this email' }, { status: 400 });
    } catch (error) {
      if (error.code !== 'auth/user-not-found') {
        throw error;
      }
    }

    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    await adminDb.collection('users').doc(userRecord.uid).set({
      name,
      email,
      image: null,
      isVerified: false,
      createdAt: adminFieldValue.serverTimestamp(),
    });

    const authResult = await signInWithEmailPassword(email, password);
    const sessionCookie = await adminAuth.createSessionCookie(authResult.idToken, {
      expiresIn: SESSION_EXPIRES_IN,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        user: { uid: userRecord.uid, name, email },
      },
      { status: 201 }
    );

    response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      maxAge: SESSION_EXPIRES_IN / 1000,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Auth register error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
