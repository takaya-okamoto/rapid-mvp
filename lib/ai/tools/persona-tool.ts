import { updatePersona } from "@/app/actions/persona";
import { createPersona } from "@/app/actions/persona";
import { tool } from "ai";
import { z } from "zod";

export const mutatePersonaTool = tool({
	description:
		"Mutate a persona. projectId and workspaceId are in the system prompt and are numbers. personaId is in the system prompt and is a number.",
	parameters: z.object({
		personaId: z.string().optional(),
		projectId: z.string(),
		workspaceId: z.string(),
		method: z.enum(["create", "update"]),
		name: z.string(),
		male: z.boolean(),
		age: z.number(),
		location: z.string(),
		occupation: z.string(),
		income: z.number(),
		values: z.string(),
		goals: z.string(),
		painPoints: z.string(),
	}),
	execute: async ({
		method,
		projectId,
		workspaceId,
		personaId,
		name,
		male,
		age,
		location,
		occupation,
		income,
		values,
		goals,
		painPoints,
	}) => {
		try {
			if (method === "create") {
				const result = await createPersona({
					projectId: Number(projectId),
					workspaceId: Number(workspaceId),
					name,
					male,
					age,
					location,
					occupation,
					income,
					values,
					goals,
					painPoints,
				});

				if (!result.success) {
					return "Failed to create persona";
				}

				return {
					name: result.persona.name,
					male: result.persona.male,
					age: result.persona.age,
					location: result.persona.location,
					occupation: result.persona.occupation,
					income: result.persona.income,
					values: result.persona.values,
					goals: result.persona.goals,
					painPoints: result.persona.painPoints,
				};
			}

			if (!personaId) {
				return "Persona ID is required";
			}

			const updateResult = await updatePersona({
				id: personaId.toString(),
				projectId: Number(projectId),
				workspaceId: Number(workspaceId),
				name,
				male,
				age,
				location,
				occupation,
				income,
				values,
				goals,
				painPoints,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});

			if (!updateResult.success) {
				return "Failed to update persona";
			}

			return {
				name: updateResult.persona.name,
				male: updateResult.persona.male,
				age: updateResult.persona.age,
				location: updateResult.persona.location,
				occupation: updateResult.persona.occupation,
				income: updateResult.persona.income,
				values: updateResult.persona.values,
				goals: updateResult.persona.goals,
				painPoints: updateResult.persona.painPoints,
			};
		} catch (error) {
			console.error("Failed to mutate persona", error, null, 2);
			return "Failed to mutate persona";
		}
	},
});
