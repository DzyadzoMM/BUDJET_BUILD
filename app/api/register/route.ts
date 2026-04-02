import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email та пароль обов'язкові" }, { status: 400 });
    }

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existing.length > 0) {
      return NextResponse.json({ error: "Користувач вже існує" }, { status: 400 });
    }

    const passwordHash = await hash(password, 10);

    await db.insert(users).values({
      email,
      passwordHash,
      name: email.split("@")[0], 
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Помилка при реєстрації" }, { status: 500 });
  }
}
