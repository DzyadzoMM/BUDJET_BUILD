import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { expenses } from "@/src/db/schema";
import { eq, and } from "drizzle-orm";
import { getServerSession } from "next-auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // розпаковуємо проміс

    const session = await getServerSession();
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Необхідно увійти в систему" },
        { status: 401 }
      );
    }

    const expenseId = Number(id);

    await db.delete(expenses).where(
      and(eq(expenses.id, expenseId), eq(expenses.userId, userId))
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Помилка при видаленні витрати" },
      { status: 500 }
    );
  }
}
