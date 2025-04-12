"use server";

import { db } from "@/db";
import { workspace } from "@/db/schema/workspace";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

type UpdateWorkspaceParams = {
	id: number;
	name: string;
	description?: string;
};

export async function updateWorkspace(params: UpdateWorkspaceParams) {
	const { id, name, description } = params;

	await db
		.update(workspace)
		.set({
			name,
			description: description || null,
			updatedAt: new Date(),
		})
		.where(eq(workspace.id, id));

	revalidateTag("workspaces");

	return {
		success: true,
	};
}
