"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [budgetLimit, setBudgetLimit] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      alert("Спочатку увійдіть у систему");
      return;
    }

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        budgetLimit,
        userId: session.user.id,
      }),
    });

    if (res.ok) {
      setName("");
      setBudgetLimit(0);
      router.refresh();
      alert("Категорію додано!");
    } else {
      alert("Помилка при створенні категорії");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Назва категорії"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Бюджет"
        value={budgetLimit}
        onChange={(e) => setBudgetLimit(Number(e.target.value))}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Зберегти
      </button>
    </form>
  );
}
