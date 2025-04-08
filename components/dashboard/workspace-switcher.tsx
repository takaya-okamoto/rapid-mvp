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
	workspaces: [
		{
			id: "1",
			name: "Default Workspace",
		},
		{
			id: "2",
			name: "Workspace 2",
		},
		{
			id: "3",
			name: "Workspace 3",
		},
	],
};

type WorkspaceSwitcherProps = {
	workspaceId: string;
};

export function WorkspaceSwitcher({ workspaceId }: WorkspaceSwitcherProps) {
	const [activeWorkspace, setActiveWorkspace] = React.useState(
		workspaceId
			? data.workspaces.find((w) => w.id === workspaceId)
			: data.workspaces[0],
	);

	if (!activeWorkspace) {
		return null;
	}

	return (
		<DropdownMenu>
			<Link
				href={`/${workspaceId}`}
				className="grid flex-1 text-left text-sm leading-tight cursor-pointer"
			>
				<span className="truncate font-semibold">{activeWorkspace.name}</span>
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
					Workspaces
				</DropdownMenuLabel>
				{data.workspaces.map((workspace, index) => (
					<DropdownMenuItem
						key={workspace.name}
						onClick={() => setActiveWorkspace(workspace)}
						className="gap-2 p-2"
					>
						<Link href={`/${workspace.id}`}>
							{workspace.name}
							<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
						</Link>
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuItem className="gap-2 p-2">
					<div className="flex size-6 items-center justify-center rounded-md border bg-background">
						<Plus className="size-4" />
					</div>
					<div className="font-medium text-muted-foreground">Add workspace</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
