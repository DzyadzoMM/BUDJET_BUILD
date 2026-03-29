'use client'

import { deleteExpense } from '@/app/actions/expenses';
import { useTransition } from "react"; // Використовуємо цей хук

export default function DeleteExpenseButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('Видалити цю витрату?')) {
      // Обертаємо виклик екшна у startTransition
      startTransition(async () => {
        await deleteExpense(id);
      });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending} // Блокуємо кнопку під час видалення
      className={`p-2 text-sm font-medium transition-colors ${
        isPending ? "text-gray-400 cursor-not-allowed" : "text-red-500 hover:text-red-700"
      }`}
    >
      {isPending ? "Видалення..." : "Видалити"}
    </button>
  );
}
