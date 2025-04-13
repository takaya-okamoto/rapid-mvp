import { updateProjectDescription } from "@/app/actions/project";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/db/schema/project";
import { EditableProjectDescription } from "./editable-project-description";
import { NextStepButton } from "./next-step-button";
import { ProjectMetrics } from "./project-metrics";

type ProjectDetailsProps = {
	project: Project;
};

export function ProjectDetails({ project }: ProjectDetailsProps) {
	const handleUpdateDescription = async (description: string) => {
		await updateProjectDescription({
			projectId: project.id,
			description,
		});
	};

	return (
		<Card className="border border-main/10 overflow-hidden">
			<CardContent className="pt-6">
				<div className="space-y-6">
					<EditableProjectDescription
						description={project.description}
						onUpdate={handleUpdateDescription}
					/>
					<ProjectMetrics />
					<div className="flex justify-end pt-4">
						<NextStepButton
							workspaceId={project.workspaceId}
							projectId={project.id}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
