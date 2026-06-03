import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebaseAdmin';

const SESSION_COOKIE_NAME = 'token';

export async function getUserFromCookie() {
  const cookieStore = cookies();
  const token = (await cookieStore).get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  try {
    return await adminAuth.verifySessionCookie(token, true);
  } catch {
    return null;
  }
}
