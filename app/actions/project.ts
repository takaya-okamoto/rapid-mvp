"use server";

import { db } from "@/db";
import { type NewProject, project } from "@/db/schema/project";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type CreateProjectParams = {
	name: string;
	description?: string;
	workspaceId: number;
};

export async function createProject(params: CreateProjectParams) {
	const { name, description, workspaceId } = params;

	const newProject: NewProject = {
		name,
		description: description || null,
		workspaceId,
	};

	// Insert the project into the database
	const result = await db.insert(project).values(newProject).returning();

	// Revalidate the dashboard page to reflect the changes
	revalidatePath(`/dashboard/${workspaceId}`);

	redirect(`/dashboard/${workspaceId}/${result[0].id}`);
}
