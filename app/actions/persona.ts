"use server";

import { db } from "@/db";
import { type NewPersona, type Persona, persona } from "@/db/schema/persona";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";

type CreatePersonaParams = {
	projectId: number;
	workspaceId: number;
	name?: string;
	male?: boolean;
	age?: number;
	location: string;
	occupation?: string;
	income?: number;
	values?: string;
	goals?: string;
	painPoints?: string;
};

export async function createPersona(params: CreatePersonaParams) {
	const {
		projectId,
		workspaceId,
		name,
		male,
		age,
		location,
		occupation,
		income,
		values,
		goals,
		painPoints,
	} = params;

	const newPersona: NewPersona = {
		projectId,
		name: name || null,
		male: male !== undefined ? male : null,
		age: age || null,
		location,
		occupation: occupation || null,
		income: income || null,
		values: values || null,
		goals: goals || null,
		painPoints: painPoints || null,
	};

	const [createdPersona] = await db
		.insert(persona)
		.values(newPersona)
		.returning();

	revalidateTag("personas");
	revalidatePath(`/dashboard/${workspaceId}/${projectId}/overview/personas`);
	return {
		success: true,
		persona: createdPersona,
	};
}

export async function updatePersona(
	params: Persona & { projectId: number; workspaceId: number },
) {
	const {
		id,
		projectId,
		workspaceId,
		name,
		male,
		age,
		location,
		occupation,
		income,
		values,
		goals,
		painPoints,
	} = params;

	const updateData: Partial<NewPersona> = {
		updatedAt: new Date().toISOString(),
	};

	if (name !== undefined) updateData.name = name || null;
	if (male !== undefined) updateData.male = male;
	if (age !== undefined) updateData.age = age || null;
	if (location !== undefined) updateData.location = location;
	if (occupation !== undefined) updateData.occupation = occupation || null;
	if (income !== undefined) updateData.income = income || null;
	if (values !== undefined) updateData.values = values || null;
	if (goals !== undefined) updateData.goals = goals || null;
	if (painPoints !== undefined) updateData.painPoints = painPoints || null;

	const [updatedPersona] = await db
		.update(persona)
		.set(updateData)
		.where(eq(persona.id, id))
		.returning();

	revalidatePath(`/dashboard/${workspaceId}/${projectId}/overview/personas`);
	revalidateTag("personas");

	return { success: true, persona: updatedPersona };
}

export async function deletePersona(
	id: string,
	projectId: number,
	workspaceId: number,
) {
	await db.delete(persona).where(eq(persona.id, id));

	revalidatePath(`/dashboard/${workspaceId}/${projectId}/overview/personas`);
	revalidateTag("personas");

	return { success: true };
}

export async function getPersonas(projectId: number) {
	const personas = await db
		.select()
		.from(persona)
		.where(eq(persona.projectId, projectId));

	return personas;
}

export async function getPersona(id: string) {
	const [result] = await db.select().from(persona).where(eq(persona.id, id));

	return result;
}
