"use server";

import { db } from "@/db";
import { mvp } from "@/db/schema/mvp";
import { persona } from "@/db/schema/persona";
import { problem } from "@/db/schema/problem";
import { project } from "@/db/schema/project";
import { generateMVPImage } from "@/lib/image-generation";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { eq, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// MVP type definitions
export type MVP = typeof mvp.$inferSelect;
export type NewMVP = typeof mvp.$inferInsert;

// Create MVP based on problem ID
export async function createMVP(data: {
	problemId: number;
	name?: string;
	description?: string;
	imageUrl?: string;
	hashtags?: string;
	scenario?: string;
	workspaceId: string;
	projectId: string;
	generateWithAI?: boolean;
}): Promise<{ success: boolean; mvp?: MVP; error?: unknown }> {
	try {
		const mvpData = {
			problemId: data.problemId,
			name: data.name || "",
			description: data.description || "",
			imageUrl: data.imageUrl || null,
			hashtags: data.hashtags || null,
			scenario: data.scenario || null,
		};

		// If AI generation is requested
		if (data.generateWithAI) {
			// Get problem details
			const problemData = await db
				.select()
				.from(problem)
				.where(eq(problem.id, data.problemId))
				.then((rows) => rows[0]);

			if (problemData) {
				// Get project details
				const projectData = await db
					.select()
					.from(project)
					.where(eq(project.id, problemData.projectId))
					.then((rows) => rows[0]);

				// Get personas for the project
				const personas = await db
					.select()
					.from(persona)
					.where(eq(persona.projectId, problemData.projectId));

				// Use AI to generate MVP details
				const result = await generateObject({
					model: openai("gpt-4o"),
					schema: z.object({
						mvp: z.object({
							name: z
								.string()
								.describe("Name of the MVP (Minimum Viable Product)"),
							description: z
								.string()
								.describe("Detailed description of the MVP"),
							hashtags: z
								.string()
								.describe("Relevant hashtags for the MVP (space-separated)"),
							scenario: z.string().describe("Usage scenario for the MVP"),
						}),
					}),
					prompt: `Create an MVP (Minimum Viable Product) that solves the following problem:
					
Problem: ${problemData.problem}

Project Overview: ${projectData?.description || "No description available"}

${
	personas.length > 0
		? `Target Personas:
${personas
	.map(
		(p, index) => `
Persona ${index + 1}:
- Name: ${p.name || "Not specified"}
- Age: ${p.age || "Not specified"}
- Occupation: ${p.occupation || "Not specified"}
- Location: ${p.location || "Not specified"}
- Values: ${p.values || "Not specified"}
- Goals: ${p.goals || "Not specified"}
- Pain Points: ${p.painPoints || "Not specified"}
`,
	)
	.join("")}`
		: "No specific personas defined."
}

Please include a name, description, relevant hashtags (space-separated), and usage scenario for the MVP.
The MVP should be a product or service idea with minimal features that effectively addresses this problem.
Make your response in English.
					`,
				});

				// Apply generated results to MVP data
				mvpData.name = result.object.mvp.name;
				mvpData.description = result.object.mvp.description;
				mvpData.hashtags = result.object.mvp.hashtags;
				mvpData.scenario = result.object.mvp.scenario;

				// Generate Instagram-ready image for the MVP
				try {
					const imageUrl = await generateMVPImage({
						prompt: `${mvpData.description} ${mvpData.hashtags}`,
						mvpName: mvpData.name,
					});

					// Update MVP data with the image URL from fal.ai directly
					mvpData.imageUrl = imageUrl;
				} catch (imageError) {
					console.error("Error generating image for MVP:", imageError);
					// Continue without image if generation fails
				}
			}
		}

		const [newMVP] = await db.insert(mvp).values(mvpData).returning();

		// Update cache
		revalidatePath(
			`/dashboard/${data.workspaceId}/${data.projectId}/overview/mvps`,
		);

		return { success: true, mvp: newMVP };
	} catch (error) {
		console.error("Error creating MVP:", error);
		return { success: false, error };
	}
}

// Get MVPs by problem ID
export async function getMVPsByProblemId(problemId: number): Promise<MVP[]> {
	try {
		const mvps = await db
			.select()
			.from(mvp)
			.where(eq(mvp.problemId, problemId));

		return mvps;
	} catch (error) {
		console.error("Error fetching MVPs:", error);
		throw new Error("Failed to fetch MVPs");
	}
}

// Get all MVPs by project ID
export async function getMVPsByProjectId(projectId: number): Promise<MVP[]> {
	try {
		// First get problem IDs related to the project
		const problems = await db
			.select({ id: problem.id })
			.from(problem)
			.where(eq(problem.projectId, projectId));

		// Return empty array if no problems exist
		if (problems.length === 0) {
			return [];
		}

		// Get MVPs related to the retrieved problem IDs
		const problemIds = problems.map((p) => p.id);

		if (problemIds.length === 1) {
			// Use simple equivalence operator if there's only one problem ID
			return db.select().from(mvp).where(eq(mvp.problemId, problemIds[0]));
		}

		// Build OR conditions for multiple problem IDs
		const conditions = problemIds.map((id) => eq(mvp.problemId, id));
		return db
			.select()
			.from(mvp)
			.where(or(...conditions));
	} catch (error) {
		console.error("Error fetching MVPs by project ID:", error);
		throw new Error("Failed to fetch MVPs by project ID");
	}
}

// Delete an MVP
export async function deleteMVP(
	mvpId: number,
	workspaceId: string,
	projectId: string,
): Promise<{ success: boolean; error?: unknown }> {
	try {
		await db.delete(mvp).where(eq(mvp.id, mvpId));

		// Update cache
		revalidatePath(`/dashboard/${workspaceId}/${projectId}/overview/mvps`);

		return { success: true };
	} catch (error) {
		console.error("Error deleting MVP:", error);
		return { success: false, error };
	}
}

// Update an MVP
export async function updateMVP(
	mvpId: number,
	data: Partial<Omit<NewMVP, "id" | "createdAt" | "updatedAt">>,
	workspaceId: string,
	projectId: string,
): Promise<{ success: boolean; mvp?: MVP; error?: unknown }> {
	try {
		const [updatedMVP] = await db
			.update(mvp)
			.set({
				...data,
				updatedAt: new Date(),
			})
			.where(eq(mvp.id, mvpId))
			.returning();

		// Update cache
		revalidatePath(`/dashboard/${workspaceId}/${projectId}/overview/mvps`);

		return { success: true, mvp: updatedMVP };
	} catch (error) {
		console.error("Error updating MVP:", error);
		return { success: false, error };
	}
}
