import { tool } from "ai";
import { z } from "zod";

// Import actions
import {
	createProblem,
	deleteProblem,
	updateProblem,
} from "@/app/actions/problem";

export const createProblemTool = tool({
	description:
		"Create a new problem for a project. projectId and workspaceId are in the system prompt and are numbers.",
	parameters: z.object({
		projectId: z.number(),
		workspaceId: z.number(),
		title: z.string(),
		description: z.string(),
	}),
	execute: async ({ title, description, projectId, workspaceId }) => {
		const result = await createProblem({
			projectId,
			workspaceId,
			title,
			description,
		});

		if (!result.success) {
			return "Failed to create problem";
		}

		return {
			title,
			description,
		};
	},
});

export const updateProblemTool = tool({
	description:
		"Update an existing problem. problemId is a string that contains the problem's ID number. projectId and workspaceId are in the system prompt and are numbers.",
	parameters: z.object({
		problemId: z.string(),
		projectId: z.number(),
		workspaceId: z.number(),
		title: z.string().optional(),
	}),
	execute: async ({ problemId, title, projectId, workspaceId }) => {
		const result = await updateProblem({
			problemId,
			projectId,
			workspaceId,
			title,
		});

		if (!result.success) {
			return "Failed to update problem";
		}

		return {
			problemId,
			title,
		};
	},
});

export const deleteProblemTool = tool({
	description:
		"Delete a problem. problemId is a string that contains the problem's ID number. projectId and workspaceId are in the system prompt and are numbers.",
	parameters: z.object({
		problemId: z.string(),
		projectId: z.number(),
		workspaceId: z.number(),
	}),
	execute: async ({ problemId, projectId, workspaceId }) => {
		const result = await deleteProblem({
			problemId,
			projectId,
			workspaceId,
		});

		if (!result.success) {
			return "Failed to delete problem";
		}

		return {
			problemId,
			message: "Problem deleted successfully",
		};
	},
});
