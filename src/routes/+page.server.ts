import { readFileSync } from 'fs';
import { join } from 'path';
import type { PageServerLoad } from './$types';
type UserData = {
  id: string;
  email: string | null;
  full_name: string;
};

export const load: PageServerLoad = async ({ locals: { prisma } }) => {
  const filePath = join(process.cwd(), 'prisma', 'users.sql');
  console.log(filePath);
  const sql = readFileSync(filePath, 'utf-8');
  const data: UserData[] = await prisma.$queryRawUnsafe(sql, 'abuzcoder@gmail.com');
  console.log(data);
  return { users: data ?? [] };
};
