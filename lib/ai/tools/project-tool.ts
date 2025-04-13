import { updateProject } from "@/app/actions/project";
import { tool } from "ai";
import { z } from "zod";

export const updateProjectTool = tool({
	description:
		"Update the project name and description. projectId and workspaceId are in the system prompt and are numbers.",
	parameters: z.object({
		projectId: z.number(),
		workspaceId: z.number(),
		name: z.string(),
		description: z.string(),
	}),
	execute: async ({ name, description, projectId, workspaceId }) => {
		const result = await updateProject({
			projectId,
			workspaceId,
			name,
			description,
		});

		if (!result.success) {
			return "Failed to update project";
		}

		return {
			name: name,
			description: description,
		};
	},
});
