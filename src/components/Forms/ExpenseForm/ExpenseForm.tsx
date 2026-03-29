'use client' // Це клієнтський компонент, бо є інтерактив (форма)

import { createExpense } from '@/app/actions/expenses';

export default function ExpenseForm({ categories }: { categories: any[] }) {
  return (
    <form action={createExpense} className="p-4 border rounded-lg shadow-sm flex flex-col gap-3">
      <h2 className="text-xl font-bold">Додати витрату</h2>
      
      {/* Name має бути "amount" */}
      <input name="amount" type="number" placeholder="Сума (в копійках)" className="border p-2" required />
      
      <input name="description" type="text" placeholder="Опис (цемент, цвяхи...)" className="border p-2" />

      {/* Вибір категорії */}
      <select name="categoryId" className="border p-2" required>
        <option value="">Оберіть категорію</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      {/* Вибір типу витрати */}
      <select name="type" className="border p-2">
        <option value="material">Матеріали</option>
        <option value="labor">Робота</option>
        <option value="logistic">Логістика</option>
      </select>

      <button type="submit" className="bg-green-600 text-white p-2 rounded font-semibold">
        Зберегти витрату
      </button>
    </form>
  );
}
