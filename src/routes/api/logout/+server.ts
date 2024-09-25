import type { RequestHandler } from './$types';
import { serialize } from 'cookie';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ setHeaders }) => {
  const cookie = serialize('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    path: '/'
  });

  setHeaders({
    'Set-Cookie': cookie
  });

  return json({ message: 'Logged out' });
};
