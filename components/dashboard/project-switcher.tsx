"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Project } from "@/db/schema/project";
import Link from "next/link";
import { Button } from "../ui/button";

type ProjectSwitcherProps = {
	workspaceId: string;
	projectId: string | undefined;
	projects: Project[];
};

function ProjectSwitcherComponent({
	workspaceId,
	projectId,
	projects,
}: ProjectSwitcherProps) {
	const router = useRouter();
	const [activeProject, setActiveProject] = useState(
		projectId ? projects.find((p) => p.id === Number(projectId)) : projects[0],
	);

	useEffect(() => {
		if (!activeProject || projects.length === 0) {
			router.push(`/dashboard/${workspaceId}`);
		}
	}, [activeProject, projects, workspaceId, router]);

	if (!activeProject || projects.length === 0) {
		return null;
	}

	return (
		<DropdownMenu>
			<Link
				href={`/${workspaceId}/${activeProject.id}`}
				className="grid flex-1 text-left text-sm leading-tight cursor-pointer"
			>
				<span className="truncate font-semibold">{activeProject.name}</span>
			</Link>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<ChevronsUpDown className="ml-auto" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
				align="start"
				side="bottom"
				sideOffset={4}
			>
				<DropdownMenuLabel className="text-xs text-muted-foreground">
					Projects
				</DropdownMenuLabel>
				{projects.map((project, index) => (
					<DropdownMenuItem
						key={project.name}
						onClick={() => setActiveProject(project)}
						className="gap-2 p-2"
					>
						<Link href={`/${workspaceId}/${project.id}`}>{project.name}</Link>
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuItem className="gap-2 p-2">
					<div className="flex size-6 items-center justify-center rounded-md border bg-background">
						<Plus className="size-4" />
					</div>
					<div className="font-medium text-muted-foreground">Add project</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// Memoize the component to prevent unnecessary rerenders
export const ProjectSwitcher = memo(ProjectSwitcherComponent);
