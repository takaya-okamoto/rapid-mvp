"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon, RocketIcon } from "lucide-react";
import { useState } from "react";

type EditableProjectDescriptionProps = {
	description: string | null;
	onUpdate: (description: string) => Promise<void>;
};

export function EditableProjectDescription({
	description,
	onUpdate,
}: EditableProjectDescriptionProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [value, setValue] = useState(description || "");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (value === description) {
			setIsEditing(false);
			return;
		}

		setIsLoading(true);
		try {
			await onUpdate(value);
		} catch (error) {
			console.error("Failed to update project description:", error);
			setValue(description || "");
		} finally {
			setIsLoading(false);
			setIsEditing(false);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setValue(description || "");
	};

	if (isEditing) {
		return (
			<div className="p-4 bg-card rounded-lg border border-border/60">
				<h3 className="font-medium text-primary mb-3 flex items-center gap-2">
					<RocketIcon className="h-4 w-4 text-main" /> Description
				</h3>
				<form onSubmit={handleSubmit} className="space-y-3">
					<Textarea
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="Add a description to help your team understand the goals and scope."
						rows={4}
						className="resize-none"
						disabled={isLoading}
						autoFocus
					/>
					<div className="flex items-center gap-2">
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
		);
	}

	return (
		<div className="p-4 bg-card rounded-lg border border-border/60 group relative">
			<h3 className="font-medium text-primary mb-2 flex items-center gap-2">
				<RocketIcon className="h-4 w-4 text-main" /> Description
				<button
					type="button"
					onClick={() => setIsEditing(true)}
					className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded-full cursor-pointer"
					aria-label="Edit description"
				>
					<PencilIcon className="h-3.5 w-3.5 text-muted-foreground" />
				</button>
			</h3>
			<p className="text-foreground/80">
				{description ||
					"No description available for this project. Add a description to help your team understand the goals and scope."}
			</p>
		</div>
	);
}
