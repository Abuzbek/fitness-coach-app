// src/lib/firebase-admin.js
import admin from 'firebase-admin';
import serviceAccount from './admin-key.json';
// Ensure Firebase Admin is not initialized multiple times in serverless environments
export const app = (() => {
  admin.apps.map((a) => a?.delete());
  const adminFB = admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
      projectId: serviceAccount.project_id
    }),
    databaseURL: 'https://fitness-app-b1341-default-rtdb.firebaseio.com' // replace with your databaseURL if needed
  });
  console.log(adminFB.auth().getUserByEmail('abuzcoder@gmail.com'));

  return adminFB;
})();

export const db = app.firestore();
