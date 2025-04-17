import { MVPsMain } from "@/components/dashboard/project/overview/mvp/mvps-main";
import { MVPsSkeleton } from "@/components/dashboard/project/overview/mvp/mvps-skeleton";
import { db } from "@/db";
import { mvp } from "@/db/schema/mvp";
import { problem } from "@/db/schema/problem";
import { eq } from "drizzle-orm";
import { Suspense } from "react";

type MVPsPageProps = {
	params: Promise<{
		projectId: string;
		workspaceId: string;
	}>;
};

// Fetch MVPs for the project
async function getMVPs(projectId: string) {
	// Get all problems for this project
	const problems = await db
		.select()
		.from(problem)
		.where(eq(problem.projectId, Number(projectId)));

	if (problems.length === 0) {
		return [];
	}

	// Get all MVPs for these problems
	const problemIds = problems.map((p) => p.id);
	const mvpResults = await Promise.all(
		problemIds.map((problemId) =>
			db.select().from(mvp).where(eq(mvp.problemId, problemId)),
		),
	);

	// Flatten the array of arrays
	const mvps = mvpResults.flat();

	// Get corresponding problem details for each MVP
	const problemMap = Object.fromEntries(
		problems.map((problem) => [problem.id, problem]),
	);

	// Add problem data to each MVP
	const mVPsWithProblems = mvps.map((mvpItem) => ({
		...mvpItem,
		problem: problemMap[mvpItem.problemId],
	}));

	return mVPsWithProblems;
}

// MVPs detail component
async function MVPsDetail({
	projectId,
	workspaceId,
}: {
	projectId: string;
	workspaceId: string;
}) {
	// Get MVPs with their associated problems
	const mvps = await getMVPs(projectId);

	// Get all problems for this project for the generate MVP button
	const problems = await db
		.select()
		.from(problem)
		.where(eq(problem.projectId, Number(projectId)));

	return (
		<div className="p-6 mt-2 space-y-6 max-w-4xl mx-auto">
			<MVPsMain
				mvps={mvps}
				problems={problems}
				projectId={projectId}
				workspaceId={workspaceId}
			/>
		</div>
	);
}

export default async function MVPsPage({ params }: MVPsPageProps) {
	const { projectId, workspaceId } = await params;

	return (
		<Suspense fallback={<MVPsSkeleton />}>
			<MVPsDetail projectId={projectId} workspaceId={workspaceId} />
		</Suspense>
	);
}
