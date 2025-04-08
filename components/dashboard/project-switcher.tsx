"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";

const data = {
	projects: [
		{
			id: "1",
			name: "Acme Inc",
		},
		{
			id: "2",
			name: "Acme Corp.",
		},
		{
			id: "3",
			name: "Evil Corp.",
		},
	],
};

type ProjectSwitcherProps = {
	workspaceId: string;
	projectId: string | undefined;
};

export function ProjectSwitcher({
	workspaceId,
	projectId,
}: ProjectSwitcherProps) {
	const [activeProject, setActiveProject] = React.useState(
		projectId
			? data.projects.find((p) => p.id === projectId)
			: data.projects[0],
	);

	if (!activeProject || !workspaceId) {
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
				{data.projects.map((project, index) => (
					<DropdownMenuItem
						key={project.name}
						onClick={() => setActiveProject(project)}
						className="gap-2 p-2"
					>
						<Link href={`/${workspaceId}/${project.id}`}>
							{project.name}
							<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
						</Link>
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
