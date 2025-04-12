import { Suspense } from "react";

import {
	ProjectList,
	ProjectListSkeleton,
} from "@/components/dashboard/workspace/project-list";
import { WorkspaceWrapper } from "@/components/dashboard/workspace/workspace-wrapper";

export default async function DashboardPage({
	params,
}: {
	params: { workspaceId: string };
}) {
	return (
		<WorkspaceWrapper>
			<Suspense fallback={<ProjectListSkeleton />}>
				<ProjectList workspaceId={params.workspaceId} />
			</Suspense>
		</WorkspaceWrapper>
	);
}
