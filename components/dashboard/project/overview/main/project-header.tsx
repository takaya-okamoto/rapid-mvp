import type { Project } from "@/db/schema/project";
import { CalendarIcon, RocketIcon } from "lucide-react";

type ProjectHeaderProps = {
	project: Project;
};

export function ProjectHeader({ project }: ProjectHeaderProps) {
	return (
		<div className="flex items-center gap-3 group">
			<div className="p-3 rounded-full bg-main/10 text-main">
				<RocketIcon className="h-6 w-6" />
			</div>
			<div>
				<h1 className="text-3xl font-bold tracking-tight text-primary">
					{project.name}
				</h1>
				<p className="text-muted-foreground flex items-center gap-1.5 mt-1">
					<CalendarIcon className="h-3.5 w-3.5" />
					<span>
						Created on{" "}
						{new Date(project.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</span>
				</p>
			</div>
		</div>
	);
}
