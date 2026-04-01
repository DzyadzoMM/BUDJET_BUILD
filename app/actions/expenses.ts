'use server';

import { db } from '@/src/db/index';
import { categories, expenses, users } from '@/src/db/schema';
import { revalidatePath } from 'next/cache';
import { eq, and } from 'drizzle-orm';
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

/**
 * Створення нової категорії
 */
export async function createCategory(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) return { error: "Необхідно увійти" };

    const name = formData.get('name') as string;
    const budgetLimit = Number(formData.get('budgetLimit')) || 0;

    await db.insert(categories).values({
      name,
      budgetLimit,
      userId, // ← тепер передаємо
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { error: 'Не вдалося створити категорію' };
  }
}

/**
 * Створення нового витратного запису
 */
export async function createExpense(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) return { error: "Необхідно увійти" };

    const amount = Number(formData.get('amount')) || 0;
    const description = formData.get('description') as string;
    const type = formData.get('type') as any;
    const categoryId = Number(formData.get('categoryId'));

    await db.insert(expenses).values({
      amount,
      description,
      type,
      categoryId,
      userId, // ← обов’язково
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { error: 'Не вдалося створити витрату' };
  }
}

/**
 * Видалення витрати за ID
 */
export async function deleteExpense(id: number) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) return { error: "Необхідно увійти" };

    await db.delete(expenses).where(
      and(eq(expenses.id, id), eq(expenses.userId, userId))
    );

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Не вдалося видалити запис" };
  }
}

/**
 * Пошук користувача за email
 */
export async function getUserByEmail(email: string) {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return result[0] ?? null;
  } catch (error) {
    return null;
  }
}
