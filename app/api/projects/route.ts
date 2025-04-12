import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const workspaceIdsParam = searchParams.get("workspaceIds");

	if (!workspaceIdsParam) {
		return NextResponse.json(
			{ error: "Workspace IDs are required" },
			{ status: 400 },
		);
	}

	try {
		const workspaceIds = workspaceIdsParam
			.split(",")
			.map((id) => Number.parseInt(id, 10));

		const projects = await db.query.project.findMany({
			where: (project, { inArray }) =>
				inArray(project.workspaceId, workspaceIds),
		});

		return NextResponse.json(projects);
	} catch (error) {
		console.error("Error fetching projects:", error);
		return NextResponse.json(
			{ error: "Failed to fetch projects" },
			{ status: 500 },
		);
	}
}
