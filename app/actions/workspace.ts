"use server";

import { db } from "@/db";
import { type Workspace, workspace } from "@/db/schema/workspace";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function updateWorkspace(params: Workspace) {
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
