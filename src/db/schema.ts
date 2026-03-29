import { pgTable, serial, text, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';

// 1. Обов'язково ПЕРШИМ оголошуємо Enum
export const expenseTypeEnum = pgEnum('expense_type', ['material', 'labor', 'logistic']);

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  budgetLimit: integer('budget_limit').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  amount: integer('amount').default(0).notNull(),
  description: text('description'),
  // Виправив: додав дужки до .notNull()
  date: timestamp('date').defaultNow().notNull(), 
  // Тепер тип працює, бо Enum оголошено вище
  type: expenseTypeEnum('type').default('material').notNull(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
});
