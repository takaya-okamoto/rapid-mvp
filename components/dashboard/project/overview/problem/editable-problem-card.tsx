"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { problem } from "@/db/schema/problem";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

// Define Problem type based on the schema
type Problem = typeof problem.$inferSelect;

type EditableProblemCardProps = {
	problem: Problem;
	handleUpdateProblem: (problem: Problem) => Promise<void>;
	handleDeleteProblem: (id: string) => Promise<void>;
};

export function EditableProblemCard({
	problem,
	handleUpdateProblem,
	handleDeleteProblem,
}: EditableProblemCardProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [editedProblem, setEditedProblem] = useState<Problem>(problem);

	const handleSave = async () => {
		setIsLoading(true);
		try {
			await handleUpdateProblem(editedProblem);
			setIsEditing(false);
		} catch (error) {
			console.error("Error updating problem:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = async () => {
		if (confirm("Are you sure you want to delete this problem?")) {
			await handleDeleteProblem(String(problem.id));
		}
	};

	// Status badge colors using app's color variables
	const statusColors: Record<string, string> = {
		todo: "bg-warning/10 text-warning",
		in_progress: "bg-info/10 text-info",
		solved: "bg-success/10 text-success",
	};

	if (isEditing) {
		return (
			<Card className="border border-main/20 overflow-hidden hover:shadow-md hover:border-main/40 transition-all duration-300">
				<CardHeader className="pb-2">
					<textarea
						className="w-full resize-none rounded-md border p-2 text-lg font-semibold"
						value={editedProblem.problem}
						onChange={(e) =>
							setEditedProblem({
								...editedProblem,
								problem: e.target.value,
							})
						}
						rows={2}
					/>
				</CardHeader>
				<CardContent>
					<div className="mb-4">
						<label htmlFor="status" className="mb-1 block text-sm font-medium">
							Status:
						</label>
						<select
							id="status"
							className="w-full rounded-md border p-2"
							value={editedProblem.status}
							onChange={(e) =>
								setEditedProblem({
									...editedProblem,
									status: e.target.value,
								})
							}
						>
							<option value="todo">To Do</option>
							<option value="in_progress">In Progress</option>
							<option value="solved">Solved</option>
						</select>
					</div>
				</CardContent>
				<CardFooter className="flex justify-end gap-2 pt-3 pb-4 border-t border-main/10">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setIsEditing(false)}
					>
						Cancel
					</Button>
					<Button size="sm" onClick={handleSave} disabled={isLoading}>
						{isLoading ? "Saving..." : "Save"}
					</Button>
				</CardFooter>
			</Card>
		);
	}

	return (
		<Card className="border border-main/20 overflow-hidden hover:shadow-md hover:border-main/40 transition-all duration-300 group">
			<CardHeader className="pb-2 relative">
				<div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setIsEditing(true)}
						className="transition-all duration-300"
					>
						<Edit className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={handleDelete}
						className="text-error hover:bg-error/10 hover:text-error transition-all duration-300"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
				<div className="flex flex-col gap-2">
					<CardTitle className="text-lg font-semibold pr-20">
						{problem.problem}
					</CardTitle>
					<span
						className={`rounded-full px-2 py-1 text-xs font-medium w-fit ${
							statusColors[problem.status] || "bg-muted text-muted-foreground"
						}`}
					>
						{problem.status === "todo"
							? "To Do"
							: problem.status === "in_progress"
								? "In Progress"
								: "Solved"}
					</span>
				</div>
			</CardHeader>
		</Card>
	);
}
