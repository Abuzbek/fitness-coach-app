// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

import { db } from '$lib/firebase/firebase.admin';

export const load = (async () => {
  return {
    users: await db.collection('users').get()
  }
});