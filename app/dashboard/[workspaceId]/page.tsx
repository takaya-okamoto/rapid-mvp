import { Suspense } from "react";

import {
	ProjectList,
	ProjectListSkeleton,
} from "@/components/dashboard/workspace/project-list";
import { WorkspaceWrapper } from "@/components/dashboard/workspace/workspace-wrapper";

export default async function DashboardPage({
	params,
}: {
	params: Promise<{ workspaceId: string }>;
}) {
	const { workspaceId } = await params;

	return (
		<WorkspaceWrapper>
			<Suspense fallback={<ProjectListSkeleton />}>
				<ProjectList workspaceId={workspaceId} />
			</Suspense>
		</WorkspaceWrapper>
	);
}
