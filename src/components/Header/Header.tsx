"use client";

import { Building2 } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="px-4 py-6 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Building2 className="w-8 h-8 text-emerald-500" />
        <span className="text-2xl font-semibold text-slate-100">
          Будівельний калькулятор
        </span>
      </div>

      <div className="flex items-center gap-4">
        {session ? (
          <>
            <div className="flex items-center gap-2">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-slate-700"
                />
              )}
              <span className="text-slate-100 font-medium">
                {session.user?.name}
              </span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-sm text-slate-400 hover:text-emerald-400"
            >
              Вийти
            </button>
          </>
        ) : (
          <span className="text-slate-400 text-sm">Гість</span>
        )}
      </div>
    </header>
  );
}
