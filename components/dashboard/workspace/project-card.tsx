"use client";

import { CalendarIcon, RocketIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/db/schema/project";

type ProjectCardProps = {
	project: Project;
	workspaceId: string;
};

export function ProjectCard({ project, workspaceId }: ProjectCardProps) {
	// Format the date nicely
	const formattedDate = new Date(project.createdAt).toLocaleDateString(
		undefined,
		{
			year: "numeric",
			month: "short",
			day: "numeric",
		},
	);

	return (
		<Link
			href={`/dashboard/${workspaceId}/${project.id}/overview`}
			className="block h-full transition-all hover:scale-[1.02]"
		>
			<Card className="h-full border border-main/20 overflow-hidden hover:shadow-lg hover:border-main/40 transition-all duration-300 group">
				<CardHeader className="pb-3 relative">
					<div className="flex items-center justify-between">
						<div className="rounded-full bg-main/10 p-2 transform transition-transform group-hover:rotate-12 duration-300">
							<RocketIcon className="h-4 w-4 text-main" />
						</div>
						<SparklesIcon className="h-4 w-4 text-main/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					</div>
					<CardTitle className="line-clamp-1 text-lg mt-2">
						{project.name}
					</CardTitle>
					<CardDescription className="line-clamp-1 flex items-center gap-1 text-xs">
						<CalendarIcon className="h-3 w-3" />
						{formattedDate}
					</CardDescription>
				</CardHeader>
				<CardContent className="pb-0">
					<p className="text-sm text-muted-foreground line-clamp-2">
						{project.description || "No description provided"}
					</p>
				</CardContent>
				<CardFooter className="pt-3 pb-4 border-t border-main/10">
					<div className="flex w-full justify-between items-center">
						<div className="flex items-center gap-1.5">
							<div className="w-2 h-2 rounded-full bg-main/60" />
							<span className="text-xs text-muted-foreground">Active</span>
						</div>
						<span className="text-main font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							Details &rarr;
						</span>
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
}
