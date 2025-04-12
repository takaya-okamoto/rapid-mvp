"use client";

import type { Project } from "@/db/schema/project";
import type { Workspace } from "@/db/schema/workspace";
import { useAuth } from "@clerk/nextjs";
import { Slash } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BreadcrumbItem } from "../ui/breadcrumb";
import { Skeleton } from "../ui/skeleton";
import { ProjectSwitcher } from "./project-switcher";
import { WorkspaceSwitcher } from "./workspace-switcher";

export function DashboardBreadcrumbSwitcherContainer() {
	const params = useParams<{ workspaceId: string; projectId: string }>();
	const { workspaceId, projectId } = params;
	const { userId, isLoaded } = useAuth();
	const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchData = useCallback(async () => {
		if (!userId) return;

		try {
			const response = await fetch("/api/workspaces", {
				next: { tags: ["workspaces"] },
			});
			const workspaceData = await response.json();
			setWorkspaces(workspaceData);

			// Extract workspace IDs and fetch projects with no-store cache option
			const workspaceIds = workspaceData.map(
				(workspace: Workspace) => workspace.id,
			);

			if (workspaceIds.length > 0) {
				const projectsResponse = await fetch(
					`/api/projects?workspaceIds=${workspaceIds.join(",")}`,
					{
						next: { tags: ["projects"] },
					},
				);
				const projectsData = await projectsResponse.json();
				setProjects(projectsData);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	}, [userId]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	if (!isLoaded || isLoading) {
		return <DashboardBreadcrumbSwitcherContainerSkeleton />;
	}

	if (!userId) {
		return null;
	}

	return (
		<>
			<Slash size={14} className="mx-1" />

			<BreadcrumbItem>
				<WorkspaceSwitcher workspaceId={workspaceId} workspaces={workspaces} />
			</BreadcrumbItem>

			{projectId && (
				<>
					<Slash size={14} className="mr-1" />

					<BreadcrumbItem>
						<ProjectSwitcher
							workspaceId={workspaceId}
							projectId={projectId}
							projects={projects}
						/>
					</BreadcrumbItem>
				</>
			)}
		</>
	);
}

export function DashboardBreadcrumbSwitcherContainerSkeleton() {
	return (
		<>
			<Slash size={14} className="mx-1" />
			<Skeleton className="w-20 h-4 mx-1" />
			<Slash size={14} className="mx-1" />
			<Skeleton className="w-20 h-4 mx-1" />
		</>
	);
}
