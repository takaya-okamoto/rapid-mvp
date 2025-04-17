"use client";

import { Button } from "@/components/ui/button";
import type { problem } from "@/db/schema/problem";
import { ClipboardListIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { EditableProblemCard } from "./editable-problem-card";

// Define Problem type based on the schema
type Problem = typeof problem.$inferSelect;

type ProblemsMainProps = {
	problems: Problem[];
	projectId: string;
	workspaceId: string;
};

export function ProblemsMain({
	problems,
	projectId,
	workspaceId,
}: ProblemsMainProps) {
	const [isLoading, setIsLoading] = useState(false);

	// Handler for updating problems
	const handleUpdateProblem = async (
		updatedProblem: Problem,
	): Promise<void> => {
		try {
			// Implementation will be added later
			console.log("Update problem:", updatedProblem);
		} catch (error) {
			console.error("ProblemsMain: Error updating problem", error);
		}
	};

	// Handler for deleting problems
	const handleDeleteProblem = async (problemId: string): Promise<void> => {
		setIsLoading(true);
		try {
			// Implementation will be added later
			console.log("Delete problem:", problemId);
		} catch (error) {
			console.error("ProblemsMain: Error deleting problem", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-bold tracking-tight">Problems</h2>
			</div>

			{problems.length === 0 ? (
				<div className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-slate-50 to-indigo-50 p-10 shadow-sm">
					<div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-100/60 blur-3xl" />
					<div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-100/60 blur-3xl" />

					<div className="relative flex flex-col items-center justify-center space-y-6 text-center">
						<div className="rounded-full bg-indigo-100/70 p-4">
							<ClipboardListIcon className="h-12 w-12 text-indigo-600" />
						</div>

						<div className="max-w-md space-y-2">
							<h3 className="text-2xl font-bold tracking-tight text-slate-900">
								No Problems Identified Yet
							</h3>
							<p className="text-muted-foreground">
								Identify and track problems your product is solving to ensure
								your MVP addresses real user needs.
							</p>
						</div>

						<Button className="group relative overflow-hidden" asChild>
							<Link
								href={`/dashboard/${workspaceId}/${projectId}/overview/problem/?problem=true`}
							>
								<div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
								<Sparkles className="mr-2 h-4 w-4 text-main-foreground" />
								Create with AI Chat
							</Link>
						</Button>

						<div className="mt-4 rounded-lg bg-slate-100/70 p-3 text-sm text-slate-700">
							<span className="font-medium">Pro Tip:</span> Chat with our AI to
							identify key problems your target users are facing!
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-4">
					{problems.map((problem) => (
						<EditableProblemCard
							key={problem.id}
							problem={problem}
							handleUpdateProblem={handleUpdateProblem}
							handleDeleteProblem={handleDeleteProblem}
						/>
					))}
				</div>
			)}
		</div>
	);
}
