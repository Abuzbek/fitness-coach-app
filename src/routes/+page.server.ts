import { PrismaClient } from '@prisma/client'
import type { PageServerLoad } from './$types'
const prisma = new PrismaClient()
export const load: PageServerLoad = async () => {
  const data = await prisma.$queryRaw`SELECT auth_users.id, auth_users.email, public_users.full_name
  FROM auth.users AS auth_users
  JOIN public.users AS public_users
  ON auth_users.id = public_users.user_id;`;
  console.log(data);
  return { users: data ?? [] }
}