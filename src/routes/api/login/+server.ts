import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';
import { verifyPassword, generateToken, setTokenCookie } from '$lib/auth/utils';
import { json } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request, setHeaders }) => {
  const { email, password } = await request.json();

  const user = await prisma.public_users.findUnique({ where: { email } });
  if (!user) {
    return json({ error: 'Invalid credentials' }, { status: 400 });
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return json({ error: 'Invalid credentials' }, { status: 400 });
  }

  const token = generateToken({ id: user.id, email: user.email });

  setHeaders({
    'Set-Cookie': setTokenCookie(token)
  });

  return json({ message: 'Logged in' });
};
