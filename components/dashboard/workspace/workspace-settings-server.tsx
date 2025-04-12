import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import { db } from "@/db";
import { workspace } from "@/db/schema/workspace";
import { eq } from "drizzle-orm";
import { WorkspaceSettingsForm } from "./workspace-settings";

async function getWorkspaceUser(workspaceId: string, userId: string) {
	return db.query.workspaceUser.findFirst({
		where: (wu, { eq, and }) =>
			and(
				eq(wu.userId, userId),
				eq(wu.workspaceId, Number.parseInt(workspaceId)),
			),
		with: {
			workspace: true,
		},
	});
}

type WorkspaceSettingsProps = {
	workspaceId: string;
};

export async function WorkspaceSettings({
	workspaceId,
}: WorkspaceSettingsProps) {
	const { userId } = await auth();
	if (!userId) throw new Error("User not found");

	const workspaceUser = await getWorkspaceUser(workspaceId, userId);
	if (!workspaceUser) return notFound();

	const [workspaceData] = await db
		.select()
		.from(workspace)
		.where(eq(workspace.id, Number.parseInt(workspaceId)));

	return (
		<div className="space-y-2 w-full">
			<div className="pb-4 border-b w-full">
				<div className="flex items-end justify-between px-4 pt-6 pb-4 lg:px-16">
					<div>
						<h1 className="text-3xl font-bold tracking-tight text-primary">
							Settings
						</h1>
						<p className="text-muted-foreground">
							Manage your workspace settings
						</p>
					</div>
				</div>
			</div>

			<div className="space-y-6 px-4 py-6 lg:px-16">
				<WorkspaceSettingsForm
					workspaceId={workspaceId}
					initialData={workspaceData}
				/>
			</div>
		</div>
	);
}
