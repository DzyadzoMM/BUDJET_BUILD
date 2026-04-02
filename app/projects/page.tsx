// app/projects/page.tsx
import { db } from "@/src/db";
import { projects } from "@/src/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { eq } from "drizzle-orm";
import ProjectClient from "./ProjectClient";

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return <p>Будь ласка, увійдіть</p>;
  }

  const allProjects = await db.query.projects.findMany({
    where: (proj, { eq }) => eq(proj.userId, userId),
  });

  return <ProjectClient allProjects={allProjects} />;
}
