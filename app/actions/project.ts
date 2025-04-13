"use server";

import { db } from "@/db";
import { type NewProject, project } from "@/db/schema/project";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";

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

	const [createdProject] = await db
		.insert(project)
		.values(newProject)
		.returning();

	revalidateTag("projects");

	return {
		success: true,
		redirectPath: `/dashboard/${workspaceId}/${createdProject.id}/overview`,
	};
}

type UpdateProjectNameParams = {
	projectId: number;
	name: string;
};

export async function updateProjectName(params: UpdateProjectNameParams) {
	const { projectId, name } = params;

	if (!name.trim()) {
		return { success: false, error: "Project name cannot be empty" };
	}

	await db
		.update(project)
		.set({
			name,
			updatedAt: new Date(),
		})
		.where(eq(project.id, projectId));

	revalidateTag("projects");

	return { success: true };
}

type UpdateProjectDescriptionParams = {
	projectId: number;
	description: string;
};

export async function updateProjectDescription(
	params: UpdateProjectDescriptionParams,
) {
	const { projectId, description } = params;

	await db
		.update(project)
		.set({
			description: description.trim() ? description : null,
			updatedAt: new Date(),
		})
		.where(eq(project.id, projectId));

	revalidateTag("projects");

	return { success: true };
}

type UpdateProjectParams = {
	projectId: number;
	workspaceId: number;
	name?: string;
	description?: string;
};

export async function updateProject(params: UpdateProjectParams) {
	const { projectId, workspaceId, name, description } = params;

	await db
		.update(project)
		.set({
			name,
			description,
			updatedAt: new Date(),
		})
		.where(eq(project.id, projectId));

	const revalidatePathParams = `/dashboard/${workspaceId}/${projectId}/overview`;

	revalidatePath(revalidatePathParams);

	return { success: true };
}
