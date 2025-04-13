"use client";

import { updateProjectName } from "@/app/actions/project";
import type { Project } from "@/db/schema/project";
import { EditableProjectName } from "./editable-project-name";
import { ProjectDetails } from "./project-details";

type OverviewMainProps = {
	project: Project;
};

export function OverviewMain({ project }: OverviewMainProps) {
	const handleUpdateName = async (name: string) => {
		await updateProjectName({
			projectId: project.id,
			name,
		});
	};

	return (
		<div className="p-6 mt-2 space-y-6 max-w-4xl mx-auto">
			<EditableProjectName project={project} onUpdate={handleUpdateName} />
			<ProjectDetails project={project} />
		</div>
	);
}
