"use client";

import { type MVP, deleteMVP } from "@/app/actions/mvp";
import type { Problem } from "@/db/schema/problem";
import { useState } from "react";
import { toast } from "sonner";
import { CreateMVPButton } from "./create-mvp-button";
import { MVPCard } from "./mvp-card";

type MVPsMainProps = {
	mvps: (MVP & { problem: Problem })[];
	problems: Problem[];
	projectId: string;
	workspaceId: string;
};

export function MVPsMain({
	mvps,
	problems,
	projectId,
	workspaceId,
}: MVPsMainProps) {
	const [isLoading, setIsLoading] = useState(false);

	// Delete an MVP
	const handleDeleteMVP = async (mvpId: number) => {
		setIsLoading(true);
		try {
			const { success, error } = await deleteMVP(mvpId, workspaceId, projectId);

			if (success) {
				toast.success("MVP deleted successfully");
			} else {
				throw error;
			}
		} catch (error) {
			console.error("Failed to delete MVP:", error);
			toast.error("An error occurred while deleting the MVP");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-bold tracking-tight">MVPs</h2>
				<CreateMVPButton
					problems={problems}
					projectId={projectId}
					workspaceId={workspaceId}
				/>
			</div>

			{mvps.length === 0 ? (
				<div className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-slate-50 to-indigo-50 p-10 shadow-sm">
					<div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-100/60 blur-3xl" />
					<div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-100/60 blur-3xl" />

					<div className="relative flex flex-col items-center justify-center space-y-6 text-center">
						<div className="max-w-md space-y-2">
							<h3 className="text-2xl font-bold tracking-tight text-slate-900">
								No MVPs yet
							</h3>
							<p className="text-muted-foreground">
								Create an MVP (Minimum Viable Product) to materialize your ideas
								for solving the problem.
							</p>
						</div>

						{problems.length === 0 && (
							<div className="mt-4 rounded-lg bg-slate-100/70 p-3 text-sm text-slate-700">
								<span className="font-medium">Hint:</span> Define a problem
								first before creating an MVP.
							</div>
						)}
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{mvps.map((mvp) => (
						<MVPCard
							key={mvp.id}
							mvp={mvp}
							problem={mvp.problem}
							onDelete={() => handleDeleteMVP(mvp.id)}
							disabled={isLoading}
						/>
					))}
				</div>
			)}
		</div>
	);
}
