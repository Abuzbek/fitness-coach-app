import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';
import { hashPassword, generateToken, setTokenCookie } from '$lib/auth/utils';
import { json } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request, setHeaders }) => {
  const { email, password, name } = await request.json();

  const existingUser = await prisma.public_users.findUnique({ where: { email } });
  if (existingUser) {
    return json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.public_users.create({
    data: { email, password: hashedPassword, full_name: name },
  });

  const token = generateToken({ id: user.id, email: user.email });

  setHeaders({
    'Set-Cookie': setTokenCookie(token)
  });

  return json({ message: 'User registered' });
};
