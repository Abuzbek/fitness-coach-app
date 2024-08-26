//Import Firebase Admin Service Account with $env functionality in Svelte
import { refreshToken } from 'firebase-admin/app';
//Import firebase admin SDK
import admin from 'firebase-admin';
import { FIREBASE_ADMIN_KEY } from '$env/static/private';

let firebaseAdmin: admin.app.App;
let firebaseAdminAuth: admin.auth.Auth;
/**
 * create firebase admin singleton
 */
function getFirebaseAdmin(): admin.app.App {
  if (!firebaseAdmin) {
    if (admin.apps.length == 0) {
      firebaseAdmin = admin.initializeApp({
        credential: refreshToken(FIREBASE_ADMIN_KEY),
        databaseURL: 'https://fitness-app-b1341-default-rtdb.firebaseio.com'
      });
    } else {
      firebaseAdmin = admin.apps[0]!;
    }
  }

  return firebaseAdmin;
}
/**
 * create firebase admin auth singleton
 */
export function getFirebaseAdminAuth(): admin.auth.Auth {
  const currentAdmin: admin.app.App = getFirebaseAdmin();
  if (!firebaseAdminAuth) {
    firebaseAdminAuth = currentAdmin.auth();
  }
  return firebaseAdminAuth;
}
