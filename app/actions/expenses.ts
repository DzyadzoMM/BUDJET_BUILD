'use server';

import { db } from '@/src/db/index';
import { categories, expenses, projects, users } from '@/src/db/schema';
import { revalidatePath } from 'next/cache';
import { eq, and } from 'drizzle-orm';
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

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
      userId,
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { error: 'Не вдалося створити категорію' };
  }
}

export async function createProject(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) return { error: "Необхідно увійти" };

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
  

    await db.insert(projects).values({
      name,
      description,
      userId,
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { error: 'Не вдалося створити проект' };
  }
}

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
      userId,
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { error: 'Не вдалося створити витрату' };
  }
}

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
