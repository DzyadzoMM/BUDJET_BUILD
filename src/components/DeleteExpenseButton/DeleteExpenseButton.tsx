"use client";

export default function DeleteExpenseButton({ id }: { id: number }) {
  const handleDelete = async () => {
    const res = await fetch(`/api/expenses/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Витрату видалено!");
      // Можна додати оновлення сторінки або revalidate
    } else {
      alert("Помилка при видаленні витрати");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800 font-medium"
    >
      Видалити
    </button>
  );
}
