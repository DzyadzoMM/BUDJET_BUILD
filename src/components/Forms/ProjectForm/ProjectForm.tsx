"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      alert("Спочатку увійдіть у систему");
      return;
    }

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        userId: session.user.id,
      }),
    });

    if (res.ok) {
      setName("");
      setDescription("");
      router.refresh();
      alert("Проект додано!");
      onClose();
    } else {
      alert("Помилка при створенні проекту");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}            
            onChange={(e) => setName(e.target.value)}
            placeholder="Назва проекту"
            className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
          />
          <input
            type="text"
             value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Опис проекту"
            className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-100"
          />
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded"
          >
            Create
          </button>
    </form>
  );
}

    