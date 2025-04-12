"use client";

import { ChevronsUpDown, Plus } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Workspace } from "@/db/schema/workspace";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { Button } from "../ui/button";

type WorkspaceSwitcherProps = {
	workspaceId: string;
	workspaces: Workspace[];
};

function WorkspaceSwitcherComponent({
	workspaceId,
	workspaces,
}: WorkspaceSwitcherProps) {
	const router = useRouter();
	const [activeWorkspace, setActiveWorkspace] = useState(
		workspaceId
			? workspaces.find((w) => w.id === Number(workspaceId))
			: workspaces[0],
	);

	if (!activeWorkspace) {
		return null;
	}

	return (
		<DropdownMenu>
			<Link
				href={`/dashboard/${workspaceId}`}
				className="grid flex-1 text-left text-sm cursor-pointer"
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
				{workspaces.map((workspace) => (
					<DropdownMenuItem
						key={workspace.name}
						onClick={() => {
							setActiveWorkspace(workspace);
							router.push(`/dashboard/${workspace.id}`);
						}}
						className="gap-2 p-2"
					>
						{workspace.name}
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

// Memoize the component to prevent unnecessary rerenders
export const WorkspaceSwitcher = memo(WorkspaceSwitcherComponent);
