import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const connectionString =
  process.env.DATABASE_URL?.startsWith('postgresql://') &&
  process.env.DATABASE_URL.includes('@')
    ? process.env.DATABASE_URL
    : 'postgresql://user:pass@localhost:5432/db';

const sql = neon(connectionString);
export const db = drizzle(sql);
