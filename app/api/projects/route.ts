import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { projects } from "@/src/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json({ error: "Необхідно увійти в систему" }, { status: 401 });
    }

    const { name, description } = await req.json();
    console.log("Received data:", { name, description });

    if (!name) {
      return NextResponse.json({ error: "Назва проекту обов'язкова" }, { status: 400 });
    }

    await db.insert(projects).values({
      name,
      description,
      userId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Помилка при створенні проекту" }, { status: 500 });
  }
}
