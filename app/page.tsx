import { db } from '@/src/db';
import { categories, expenses } from '@/src/db/schema';
import ExpenseForm from '@/src/components/Forms/ExpenseForm/ExpenseForm';
import DeleteExpenseButton from'@/src/components/DeleteExpenseButton';
import { sql, desc, gt } from 'drizzle-orm';

export default async function Home() {
  const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  // 1. Отримуємо дані з бази (Server-side)
  const allCategories = await db.select().from(categories);
  const allExpenses = await db
    .select()
    .from(expenses)
    .where(gt(expenses.date, thirtyDaysAgo))
    .orderBy(desc(expenses.date));
  
  // Агрегація суми
const stats = await db
    .select({
      categoryId: expenses.categoryId,
      total: sql<number>`sum(${expenses.amount})`, 
    })
    .from(expenses)
    .where(gt(expenses.date, thirtyDaysAgo))
    .groupBy(expenses.categoryId);
    
const totalSumResult =await db
  .select({
  value: sql<number>`sum(${expenses.amount})`,
  })
  .from(expenses)
  .where(gt(expenses.date, thirtyDaysAgo));
  
const totalSum = totalSumResult[0]?.value || 0;


  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Буд-Облік 🏗️</h1>
      
      {/* 2. Блок статистики */}
      <section className="grid grid-cols-2 gap-4 mb-10">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">️Загальні витрати</h2>
        <p className="text-2xl font-bold">{(totalSum / 100).toFixed(2)} <span className="text-sm font-normal">грн</span></p>
      </section>
      <section className="grid grid-cols-2 gap-4 mb-10">
        {stats.map((stat) => {
          // Шукаємо назву категорії за її ID
          const categoryName = allCategories.find(c => c.id === stat.categoryId)?.name || 'Невідома';
          return (
            <div key={stat.categoryId} className="p-4 border rounded-xl shadow-sm">
              <p className="text-sm text-blue-600 font-semibold uppercase">{categoryName}</p>
              <p className="text-2xl font-bold">{(stat.total / 100).toFixed(2)} <span className="text-sm font-normal">грн</span></p>
            </div>
          );
        })}
      </section>
      {/* Передаємо категорії у форму */}
      <section className="mb-10">
        <ExpenseForm categories={allCategories} />
      </section>

      {/* 2. Виводимо список витрат, щоб бачити результат */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Останні витрати</h2>
        <div className="space-y-2">
          {allExpenses.length === 0 && <p className="text-gray-500">Витрат поки немає</p>}
          
          {allExpenses.map((exp) => (
            <div key={exp.id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <p className="font-medium">{exp.description || 'Без опису'}</p>
                <p className="text-sm text-gray-500">{new Date(exp.date).toLocaleDateString()}</p>
              </div>
              <span className="font-bold text-green-600">
                {exp.amount / 100} грн
              </span>
              <DeleteExpenseButton id={exp.id} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
