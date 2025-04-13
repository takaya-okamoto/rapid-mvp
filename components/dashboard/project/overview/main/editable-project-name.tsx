"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Project } from "@/db/schema/project";
import { CalendarIcon, PencilIcon, RocketIcon } from "lucide-react";
import { useState } from "react";

type EditableProjectNameProps = {
	project: Project;
	onUpdate: (name: string) => Promise<void>;
};

export function EditableProjectName({
	project,
	onUpdate,
}: EditableProjectNameProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(project.name);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || name === project.name) {
			setIsEditing(false);
			setName(project.name);
			return;
		}

		setIsLoading(true);
		try {
			await onUpdate(name);
		} catch (error) {
			console.error("Failed to update project name:", error);
			setName(project.name);
		} finally {
			setIsLoading(false);
			setIsEditing(false);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setName(project.name);
	};

	if (isEditing) {
		return (
			<div className="flex items-start gap-3">
				<div className="p-3 rounded-full bg-main/10 text-main">
					<RocketIcon className="h-6 w-6" />
				</div>
				<div className="flex-1">
					<form onSubmit={handleSubmit} className="space-y-2">
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="text-xl font-bold py-2 h-auto"
							placeholder="Project Name"
							autoFocus
							disabled={isLoading}
						/>
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
						<div className="flex items-center gap-2 pt-1">
							<Button
								type="submit"
								size="sm"
								className="bg-main hover:bg-main-dark text-main-foreground"
								disabled={isLoading}
							>
								Save
							</Button>
							<Button
								type="button"
								size="sm"
								variant="outline"
								onClick={handleCancel}
								disabled={isLoading}
							>
								Cancel
							</Button>
						</div>
					</form>
				</div>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-3 group relative">
			<div className="p-3 rounded-full bg-main/10 text-main">
				<RocketIcon className="h-6 w-6" />
			</div>
			<div>
				<div className="flex items-center gap-2">
					<h1 className="text-3xl font-bold tracking-tight text-primary">
						{project.name}
					</h1>
					<button
						type="button"
						onClick={() => setIsEditing(true)}
						className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded-full cursor-pointer"
						aria-label="Edit project name"
					>
						<PencilIcon className="h-4 w-4 text-muted-foreground" />
					</button>
				</div>
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
