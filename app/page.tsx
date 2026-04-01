import { db } from '@/src/db';
import { categories, expenses } from '@/src/db/schema';
import ExpenseForm from '@/src/components/Forms/ExpenseForm/ExpenseForm';
import CategoryForm from '@/src/components/Forms/CategoryForm/CategoryForm';
import DeleteExpenseButton from '@/src/components/DeleteExpenseButton';
import { sql, and, eq, gt } from 'drizzle-orm';
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

export default async function Home() {
 const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return <p>Будь ласка, увійдіть, щоб переглянути витрати</p>;
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Категорії лише цього користувача
  const allCategories = await db.query.categories.findMany({
    where: (cat, { eq }) => eq(cat.userId, userId),
  });

  // Витрати лише цього користувача
  const allExpenses = await db.query.expenses.findMany({
    where: (exp, { eq, gt, and }) =>
      and(eq(exp.userId, userId), gt(exp.date, thirtyDaysAgo)),
    orderBy: (exp, { desc }) => [desc(exp.date)],
  });

  // Агрегація суми по категоріях
  const stats = await db
    .select({
      categoryId: expenses.categoryId,
      total: sql<number>`sum(${expenses.amount})`,
    })
    .from(expenses)
    .where(and(eq(expenses.userId, userId), gt(expenses.date, thirtyDaysAgo)))
    .groupBy(expenses.categoryId);

  // Загальна сума
  const totalSumResult = await db
    .select({
      value: sql<number>`sum(${expenses.amount})`,
    })
    .from(expenses)
    .where(and(eq(expenses.userId, userId), gt(expenses.date, thirtyDaysAgo)));

  const totalSum = totalSumResult[0]?.value || 0;

  return (
    <main className="p-6 max-w-2xl mx-auto">
      {/* Загальні витрати */}
      <section className="grid grid-cols-2 gap-4 mb-10">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">️Загальні витрати</h2>
        <p className="text-2xl font-bold">
          {(totalSum / 100).toFixed(2)} <span className="text-sm font-normal">грн</span>
        </p>
      </section>

      {/* Витрати по категоріях */}
      <section className="grid grid-cols-2 gap-4 mb-10">
        {stats.map((stat) => {
          const categoryName = allCategories.find(c => c.id === stat.categoryId)?.name || 'Невідома';
          return (
            <div key={stat.categoryId} className="p-4 border rounded-xl shadow-sm">
              <p className="text-sm text-blue-600 font-semibold uppercase">{categoryName}</p>
              <p className="text-2xl font-bold">
                {(stat.total / 100).toFixed(2)} <span className="text-sm font-normal">грн</span>
              </p>
            </div>
          );
        })}
      </section>

       {/* Форма додавання категорій */}
      <section className="mb-10">
        <CategoryForm />
      </section>

      {/* Форма додавання витрат */}
      <section className="mb-10">
        <ExpenseForm categories={allCategories} />
      </section>

      {/* Список витрат */}
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
