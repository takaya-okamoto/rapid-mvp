"use server";

import { db } from "@/db";
import { problem } from "@/db/schema/problem";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type CreateProblemParams = {
	projectId: number;
	workspaceId: number;
	title: string;
	description: string;
};

export async function createProblem({
	projectId,
	workspaceId,
	title,
}: CreateProblemParams) {
	try {
		await db.insert(problem).values({
			projectId,
			problem: title,
			status: "todo",
		});

		revalidatePath(`/dashboard/${workspaceId}/${projectId}/overview/problem`);

		return { success: true };
	} catch (error) {
		console.error("Failed to create problem:", error);
		return { success: false, error };
	}
}

type UpdateProblemParams = {
	problemId: string;
	projectId: number;
	workspaceId: number;
	title?: string;
	description?: string;
};

export async function updateProblem({
	problemId,
	projectId,
	workspaceId,
	title,
}: UpdateProblemParams) {
	try {
		const updateData: Partial<typeof problem.$inferInsert> = {};

		if (title !== undefined) updateData.problem = title;

		if (Object.keys(updateData).length === 0) {
			return { success: true }; // Nothing to update
		}

		await db
			.update(problem)
			.set(updateData)
			.where(eq(problem.id, Number.parseInt(problemId, 10)));

		revalidatePath(`/dashboard/${workspaceId}/${projectId}/overview/problem`);

		return { success: true };
	} catch (error) {
		console.error("Failed to update problem:", error);
		return { success: false, error };
	}
}

type DeleteProblemParams = {
	problemId: string;
	projectId: number;
	workspaceId: number;
};

export async function deleteProblem({
	problemId,
	projectId,
	workspaceId,
}: DeleteProblemParams) {
	try {
		await db
			.delete(problem)
			.where(eq(problem.id, Number.parseInt(problemId, 10)));

		revalidatePath(`/dashboard/${workspaceId}/${projectId}/overview/problem`);

		return { success: true };
	} catch (error) {
		console.error("Failed to delete problem:", error);
		return { success: false, error };
	}
}
