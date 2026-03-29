import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts', // Де лежить твоя схема
  out: './drizzle',             // Куди складати міграції
  dialect: 'postgresql',        // Тип БД
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

// ТВОЄ ЗАВДАННЯ:
// Після того, як допишеш схему 'expenses', запусти в терміналі:
// npx drizzle-kit generate
// Це створить SQL-файл у папці /drizzle.
// Потім запусти:
// npx drizzle-kit push
// Це синхронізує твою реальну БД зі схемою.