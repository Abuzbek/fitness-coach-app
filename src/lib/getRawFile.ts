import { readFileSync } from 'fs';
import { join } from 'path';

export const getRawFile = (file: string) => {
  const filePath = join(process.cwd(), 'prisma', file);
  return readFileSync(filePath, 'utf-8');
};
