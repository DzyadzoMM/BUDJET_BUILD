import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

// Створюємо SQL-клієнт через HTTP (ідеально для Edge-функцій Next.js)
const sql = neon(connectionString);

// Створюємо інстанс Drizzle з переданою схемою
export const db = drizzle(sql, { schema });
