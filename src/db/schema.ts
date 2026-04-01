import { pgTable, serial, text, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';

// 1. Enum для типів витрат
export const expenseTypeEnum = pgEnum('expense_type', ['material', 'labor', 'logistic']);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  budgetLimit: integer('budget_limit').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  // Якщо категорії теж мають бути персональні
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  amount: integer('amount').default(0).notNull(),
  description: text('description'),
  date: timestamp('date').defaultNow().notNull(),
  type: expenseTypeEnum('type').default('material').notNull(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  // Прив’язка витрат до користувача
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
