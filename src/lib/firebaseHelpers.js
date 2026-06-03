const FIREBASE_AUTH_BASE = 'https://identitytoolkit.googleapis.com/v1/accounts';
const apiKey = process.env.FIREBASE_WEB_API_KEY;

function buildUrl(action) {
  return `${FIREBASE_AUTH_BASE}:${action}?key=${apiKey}`;
}

export async function signInWithEmailPassword(email, password) {
  const response = await fetch(buildUrl('signInWithPassword'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || 'Firebase sign-in failed');
  }

  return result;
}

export async function signUpWithEmailPassword(email, password) {
  const response = await fetch(buildUrl('signUp'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || 'Firebase signup failed');
  }

  return result;
}