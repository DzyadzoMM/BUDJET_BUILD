'use client'

import { createCategory } from '@/app/actions/expenses';

export default function CategoryForm() {
  return (
    <form action={createCategory} className="flex flex-col gap-4">
      <input 
        name="name" 
        type="text" 
        placeholder="Назва категорії (наприклад: Фундамент)" 
        className="border p-2 rounded"
        required 
      />
      <input 
        name="budgetLimit" 
        type="text" 
        placeholder="budgetLimit" 
        className="border p-2 rounded"
        required 
      />
      {/* ТВОЄ ЗАВДАННЯ: додайте поле для budgetLimit */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Зберегти
      </button>
    </form>
  );
}
