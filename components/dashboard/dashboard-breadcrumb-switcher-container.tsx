import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { Slash } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import { cache } from "react";
import { BreadcrumbItem } from "../ui/breadcrumb";
import { Skeleton } from "../ui/skeleton";
import { ProjectSwitcher } from "./project-switcher";
import { WorkspaceSwitcher } from "./workspace-switcher";

type DashboardBreadcrumbSwitcherContainerProps = {
	workspaceId: string;
	projectId: string | undefined;
};

// Cache the workspace user query
const getWorkspaceUser = cache(async (userId: string) => {
	noStore(); // Opt out of static rendering
	return db.query.workspaceUser.findMany({
		where: (workspaceUser, { eq }) => eq(workspaceUser.userId, userId),
		with: {
			workspace: true,
		},
	});
});

// Cache the projects query
const getProjects = cache(async (workspaceIds: number[]) => {
	noStore(); // Opt out of static rendering
	return db.query.project.findMany({
		where: (project, { inArray }) => inArray(project.workspaceId, workspaceIds),
	});
});

// Preload function to be called by parent components
export function preloadDashboardBreadcrumbData(userId: string) {
	void getWorkspaceUser(userId);
}

export async function DashboardBreadcrumbSwitcherContainer({
	workspaceId,
	projectId,
}: DashboardBreadcrumbSwitcherContainerProps) {
	const user = await currentUser();

	if (!user) {
		return null;
	}

	const workspaceUser = await getWorkspaceUser(user.id);
	const workspaces = workspaceUser.map((user) => user.workspace);
	const workspaceIds = workspaces.map((workspace) => workspace.id);
	const projects = await getProjects(workspaceIds);

	return (
		<>
			<Slash size={14} />
			<BreadcrumbItem>
				<WorkspaceSwitcher workspaceId={workspaceId} workspaces={workspaces} />
			</BreadcrumbItem>

			<Slash size={14} />
			<BreadcrumbItem>
				<ProjectSwitcher
					workspaceId={workspaceId}
					projectId={projectId}
					projects={projects}
				/>
			</BreadcrumbItem>
		</>
	);
}

export async function DashboardBreadcrumbSwitcherContainerSkeleton() {
	return (
		<>
			<Slash size={14} />
			<Skeleton className="w-20 h-4" />
			<Skeleton className="w-20 h-4" />
		</>
	);
}
