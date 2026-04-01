"use client";

import { Building2, TrendingUp, FileBarChart, Shield } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (isRegister) {
      // Виклик API для реєстрації нового користувача
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        // після реєстрації одразу виконуємо signIn
        await signIn("credentials", { email, password, callbackUrl: "/" });
      }
    } else {
      // Виклик NextAuth для входу
      await signIn("credentials", { email, password, callbackUrl: "/" });
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 pb-16">
      <div className="w-full max-w-md space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight">
            Спрощене відстеження витрат на будівництво
          </h1>
          <p className="text-lg text-slate-400">
            Відстежуйте бюджети, керуйте витратами та прогнозуйте витрати на всі ваші будівельні проєкти в одному місці.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 py-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-2">
            <TrendingUp className="w-6 h-6 text-emerald-500" />
            <h3 className="text-sm font-semibold text-slate-100">Відстеження в реальному часі</h3>
            <p className="text-xs text-slate-400">Витрати в моменті їх появи</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-2">
            <FileBarChart className="w-6 h-6 text-emerald-500" />
            <h3 className="text-sm font-semibold text-slate-100">Прогнозування AI</h3>
            <p className="text-xs text-slate-400">Прогнозуйте витрати на проєкт</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-2">
            <Building2 className="w-6 h-6 text-emerald-500" />
            <h3 className="text-sm font-semibold text-slate-100">Мульти-Проєкт</h3>
            <p className="text-xs text-slate-400">Керуйте всіма сайтами разом</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-2">
            <Shield className="w-6 h-6 text-emerald-500" />
            <h3 className="text-sm font-semibold text-slate-100">Безпечно та надійно</h3>
            <p className="text-xs text-slate-400">Ваші дані захищені</p>
          </div>
        </div>

        {/* Login/Register Form */}
        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold text-slate-100">
              {isRegister ? "Реєстрація" : "Увійти"}
            </h2>
            <p className="text-sm text-slate-400">
              {isRegister
                ? "Створіть новий акаунт для керування проєктами"
                : "Увійдіть, щоб керувати своїми проєктами та витратами"}
            </p>
          </div>

          {!isRegister && (
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full h-12 bg-white hover:bg-slate-50 text-slate-900 font-medium rounded-lg transition-colors flex items-center justify-center gap-3"
            >
              {/* SVG логотип Google */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21.35 11.1h-9.17v2.92h5.3c-.23 1.24-.93 2.29-1.98 2.98v2.48h3.2c1.87-1.72 2.95-4.25 2.95-7.2 0-.62-.06-1.22-.1-1.78z"
                />
              </svg>
              Увійти з Google
            </button>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full h-12 px-4 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full h-12 px-4 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
            >
              {isRegister ? "Зареєструватися" : "Увійти"}
            </button>
          </form>

          <p className="text-xs text-center text-slate-400">
            {isRegister ? "Вже маєте акаунт?" : "Немає облікового запису?"}{" "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-emerald-500 hover:text-emerald-400 font-medium"
            >
              {isRegister ? "Увійти" : "Зареєструватися"}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
