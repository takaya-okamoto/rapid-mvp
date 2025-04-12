"use server";

import { db } from "@/db";
import { type NewProject, project } from "@/db/schema/project";
import { revalidateTag } from "next/cache";

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
		redirectPath: `/dashboard/${workspaceId}/${createdProject.id}`,
	};
}
