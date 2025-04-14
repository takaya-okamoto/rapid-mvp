import { OverviewMain } from "@/components/dashboard/project/overview/main/overview-main";
import { OverviewMainSkeleton } from "@/components/dashboard/project/overview/main/overview-skeleton";
import { db } from "@/db";
import { project as projectSchema } from "@/db/schema/project";
import { and } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type MainPageProps = {
	params: Promise<{
		projectId: string;
		workspaceId: string;
	}>;
};

// プロジェクトデータを取得する関数
async function getProject(projectId: string, workspaceId: string) {
	const [project] = await db
		.select()
		.from(projectSchema)
		.where(
			and(
				eq(projectSchema.id, Number(projectId)),
				eq(projectSchema.workspaceId, Number(workspaceId)),
			),
		);

	if (!project) {
		notFound();
	}

	return project;
}

// プロジェクト詳細を表示するコンポーネント
async function ProjectDetail({
	projectId,
	workspaceId,
}: { projectId: string; workspaceId: string }) {
	const project = await getProject(projectId, workspaceId);
	return <OverviewMain project={project} />;
}

export default async function MainPage({ params }: MainPageProps) {
	const { projectId, workspaceId } = await params;

	return (
		<Suspense fallback={<OverviewMainSkeleton />}>
			<ProjectDetail projectId={projectId} workspaceId={workspaceId} />
		</Suspense>
	);
}
