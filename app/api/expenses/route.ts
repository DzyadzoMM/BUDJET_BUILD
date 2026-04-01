import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { expenses } from "@/src/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Необхідно увійти в систему" }, { status: 412 });
    }

    const { amount, description, categoryId, type } = await req.json();

    if (!amount || !categoryId) {
      return NextResponse.json({ error: "Сума та категорія обов'язкові" }, { status: 400 });
    }

    await db.insert(expenses).values({
      amount,
      description,
      categoryId,
      type,
      userId, // автоматично прив’язуємо до користувача
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Помилка при створенні витрати" }, { status: 500 });
  }
}
