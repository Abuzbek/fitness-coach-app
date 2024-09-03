//Import Firebase Admin Service Account with $env functionality in Svelte
import { initializeApp, refreshToken } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
//Import firebase admin SDK
import { firebaseConfig } from './firebase.app';
import { FIREBASE_ADMIN_KEY } from '$env/static/private';

/**
 * create firebase admin singleton
 */
export const firebaseApp = initializeApp({
  credential: refreshToken(FIREBASE_ADMIN_KEY),
  ...firebaseConfig
});
export const db = getFirestore(firebaseApp);