import { getFirebaseAdminAuth } from '$lib/firebase/firebase.admin';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function POST(request: RequestEvent) {
  const { token } = await request.request.json();

  //delete the previous token in cookies
  request.cookies.delete('token', { path: '/' });

  const auth = getFirebaseAdminAuth();
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const decodedToken = await auth.verifyIdToken(token);
    request.cookies.set('token', token, { path: '/' });
  } catch (e) {
    console.log(`error verifying ID Token : ${e}`);
  }

  return json({ text: 'Hi mom!' });
}
