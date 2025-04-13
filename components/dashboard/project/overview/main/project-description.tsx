import { RocketIcon } from "lucide-react";

type ProjectDescriptionProps = {
	description: string | null;
};

export function ProjectDescription({ description }: ProjectDescriptionProps) {
	return (
		<div className="p-4 bg-card rounded-lg border border-border/60">
			<h3 className="font-medium text-primary mb-2 flex items-center gap-2">
				<RocketIcon className="h-4 w-4 text-main" /> Description
			</h3>
			<p className="text-foreground/80">
				{description ||
					"No description available for this project. Add a description to help your team understand the goals and scope."}
			</p>
		</div>
	);
}
