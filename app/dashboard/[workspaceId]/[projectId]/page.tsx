import { db } from "@/db";

type ProjectPageProps = {
	params: Promise<{
		workspaceId: string;
		projectId: string;
	}>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { projectId } = await params;

	const project = await db.query.project.findFirst({
		where: (project, { eq }) => eq(project.id, Number(projectId)),
	});

	return <div>{project?.name}</div>;
}
