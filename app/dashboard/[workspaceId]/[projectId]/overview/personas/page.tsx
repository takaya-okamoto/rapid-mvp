import { PersonasMain } from "@/components/dashboard/project/overview/persona/personas-main";
import { PersonasSkeleton } from "@/components/dashboard/project/overview/persona/personas-skeleton";
import { db } from "@/db";
import { persona } from "@/db/schema/persona";
import { eq } from "drizzle-orm";
import { Suspense } from "react";

type PersonasPageProps = {
	params: Promise<{
		projectId: string;
		workspaceId: string;
	}>;
};

// Fetch personas for the project
async function getPersonas(projectId: string) {
	const personas = await db
		.select()
		.from(persona)
		.where(eq(persona.projectId, Number(projectId)));

	return personas;
}

// Personas detail component
async function PersonasDetail({
	projectId,
	workspaceId,
}: { projectId: string; workspaceId: string }) {
	const personas = await getPersonas(projectId);
	return (
		<div className="p-6 mt-2 space-y-6 max-w-4xl mx-auto">
			<PersonasMain
				personas={personas}
				projectId={projectId}
				workspaceId={workspaceId}
			/>
		</div>
	);
}

export default async function PersonasPage({ params }: PersonasPageProps) {
	const { projectId, workspaceId } = await params;

	return (
		<Suspense fallback={<PersonasSkeleton />}>
			<PersonasDetail projectId={projectId} workspaceId={workspaceId} />
		</Suspense>
	);
}
