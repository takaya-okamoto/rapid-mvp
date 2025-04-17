import { ProblemsMain } from "@/components/dashboard/project/overview/problem/problems-main";
import { ProblemsSkeleton } from "@/components/dashboard/project/overview/problem/problems-skeleton";
import { db } from "@/db";
import { problem } from "@/db/schema/problem";
import { eq } from "drizzle-orm";
import { Suspense } from "react";

type ProblemPageProps = {
	params: Promise<{
		projectId: string;
		workspaceId: string;
	}>;
};

// Fetch problems for the project
async function getProblems(projectId: string) {
	// Convert string projectId from URL to number for database query
	const problems = await db
		.select()
		.from(problem)
		.where(eq(problem.projectId, Number(projectId)));

	return problems;
}

// Problems detail component
async function ProblemsDetail({
	projectId,
	workspaceId,
}: { projectId: string; workspaceId: string }) {
	const problems = await getProblems(projectId);
	return (
		<div className="p-6 mt-2 space-y-6 max-w-4xl mx-auto">
			<ProblemsMain
				problems={problems}
				projectId={projectId}
				workspaceId={workspaceId}
			/>
		</div>
	);
}

export default async function ProblemPage({ params }: ProblemPageProps) {
	const { projectId, workspaceId } = await params;

	return (
		<Suspense fallback={<ProblemsSkeleton />}>
			<ProblemsDetail projectId={projectId} workspaceId={workspaceId} />
		</Suspense>
	);
}
