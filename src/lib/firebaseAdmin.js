import admin from 'firebase-admin';

const firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
const firebaseClientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const firebaseDatabaseURL = process.env.FIREBASE_DATABASE_URL;

const hasFirebaseCredentials = Boolean(firebaseProjectId && firebaseClientEmail && firebasePrivateKey);

if (!admin.apps.length) {
  if (hasFirebaseCredentials) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: firebaseProjectId,
        clientEmail: firebaseClientEmail,
        privateKey: firebasePrivateKey,
      }),
      databaseURL: firebaseDatabaseURL,
    });
  } else {
    admin.initializeApp();
  }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
export const adminFieldValue = admin.firestore.FieldValue;