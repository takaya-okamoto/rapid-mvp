import { Suspense } from "react";

import {
	WorkspaceSettings,
	WorkspaceSettingsSkeleton,
	WorkspaceWrapper,
} from "@/components/dashboard/workspace";

export default async function SettingsPage({
	params,
}: {
	params: Promise<{ workspaceId: string }>;
}) {
	const { workspaceId } = await params;

	return (
		<WorkspaceWrapper>
			<Suspense fallback={<WorkspaceSettingsSkeleton />}>
				<WorkspaceSettings workspaceId={workspaceId} />
			</Suspense>
		</WorkspaceWrapper>
	);
}
