"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ExpenseForm({ categories }: { categories: any[] }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [type, setType] = useState("material");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      alert("Спочатку увійдіть у систему");
      return;
    }

    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        description,
        categoryId,
        type,
      }),
    });

    if (res.ok) {
      setAmount(0);
      setDescription("");
      setCategoryId(null);
      router.refresh();
      alert("Витрату додано!");
    } else {
      alert("Помилка при додаванні витрати");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        placeholder="Сума"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <select
        value={categoryId ?? ""}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        className="border p-2 rounded w-full"
        required
      >
        <option value="">Оберіть категорію</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="material">Матеріали</option>
        <option value="labor">Робота</option>
        <option value="logistic">Логістика</option>
      </select>
      <button type="submit" className="bg-green-600 text-white p-2 rounded w-full">
        Додати витрату
      </button>
    </form>
  );
}
