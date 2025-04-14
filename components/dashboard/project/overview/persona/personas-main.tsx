"use client";

import { updatePersona } from "@/app/actions/persona";
import { Button } from "@/components/ui/button";
import type { Persona } from "@/db/schema/persona";
import { Sparkles, UserIcon } from "lucide-react";
import Link from "next/link";
import { EditablePersonaCard } from "./editable-persona-card";

type PersonasMainProps = {
	personas: Persona[];
	projectId: string;
	workspaceId: string;
};

export function PersonasMain({
	personas,
	projectId,
	workspaceId,
}: PersonasMainProps) {
	// Handler for updating personas
	const handleUpdatePersona = async (
		updatedPersona: Persona,
	): Promise<void> => {
		try {
			// Destructure to avoid duplicates
			const { id, projectId: personaProjectId, ...rest } = updatedPersona;

			const submitData = {
				id,
				projectId: Number(personaProjectId),
				workspaceId: Number(workspaceId),
				...rest,
			};

			// Call updatePersona and wait for the result
			await updatePersona(submitData);
		} catch (error) {
			console.error("PersonasMain: Error updating persona", error);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-bold tracking-tight">Personas</h2>
			</div>

			{personas.length === 0 ? (
				<div className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-slate-50 to-indigo-50 p-10 shadow-sm">
					<div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-100/60 blur-3xl" />
					<div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-100/60 blur-3xl" />

					<div className="relative flex flex-col items-center justify-center space-y-6 text-center">
						<div className="rounded-full bg-indigo-100/70 p-4">
							<UserIcon className="h-12 w-12 text-indigo-600" />
						</div>

						<div className="max-w-md space-y-2">
							<h3 className="text-2xl font-bold tracking-tight text-slate-900">
								No Personas Yet
							</h3>
							<p className="text-muted-foreground">
								Personas help you define and understand your target audience,
								leading to better product decisions.
							</p>
						</div>

						<Button className="group relative overflow-hidden" asChild>
							<Link
								href={`/dashboard/${workspaceId}/${projectId}/overview/personas/?persona=true`}
							>
								<div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
								<Sparkles className="mr-2 h-4 w-4 text-main-foreground" />
								Create with AI Chat
							</Link>
						</Button>

						<div className="mt-4 rounded-lg bg-slate-100/70 p-3 text-sm text-slate-700">
							<span className="font-medium">Pro Tip:</span> Chat with our AI to
							rapidly generate detailed personas based on your target market!
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-4">
					{personas.map((persona) => (
						<EditablePersonaCard
							key={persona.id}
							persona={persona}
							handleUpdatePersona={handleUpdatePersona}
						/>
					))}
				</div>
			)}
		</div>
	);
}
