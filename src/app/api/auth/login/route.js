import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';
import { signInWithEmailPassword } from '@/lib/firebaseHelpers';

const SESSION_COOKIE_NAME = 'token';
const SESSION_EXPIRES_IN = 7 * 24 * 60 * 60 * 1000;

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const authResult = await signInWithEmailPassword(email, password);
    const userRecord = await adminAuth.getUser(authResult.localId);
    const sessionCookie = await adminAuth.createSessionCookie(authResult.idToken, {
      expiresIn: SESSION_EXPIRES_IN,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: 'User signed in successfully',
        user: { uid: userRecord.uid, name: userRecord.displayName || '', email: userRecord.email },
      },
      { status: 200 }
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
    console.error('Auth login error:', error);
    const message = error.message?.includes('EMAIL_NOT_FOUND') || error.message?.includes('INVALID_PASSWORD')
      ? 'Invalid credentials'
      : 'Internal server error';
    return NextResponse.json({ message, error: error.message }, { status: message === 'Invalid credentials' ? 401 : 500 });
  }
}
