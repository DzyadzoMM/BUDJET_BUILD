'use server'
import { db } from '@/src/db/index';
import { categories, expenses } from '@/src/db/schema';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export async function createCategory(formData: FormData) {
  const name = formData.get('name') as string;
  const budgetLimit = Number(formData.get('budgetLimit')) || 0;
  
  await db.insert(categories).values({
    name: name,
    budgetLimit:budgetLimit,
  });

  revalidatePath('/dashboard');
}

export async function createExpense(formData: FormData){
  const amount = Number(formData.get('amount')) || 0;
  const description = formData.get('description') as string;
  const type = formData.get('type') as any;
  const categoryId = Number(formData.get('categoryId'));
  
  await db.insert(expenses).values({
    amount: amount,
    description:description,
    type:type,
    categoryId:categoryId,
  });
  
  
  revalidatePath('/dashboard');
}

export async function deleteExpense(id: number) {
  try {
    await db.delete(expenses).where(eq(expenses.id, id));
    
    // Обов'язково оновлюємо кеш, щоб рядок зник зі списку
    revalidatePath('/'); 
    return { success: true };
  } catch (error) {
    return { error: 'Не вдалося видалити запис' };
  }
}
