import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const userId = searchParams.get("userId");

	if (!userId) {
		return NextResponse.json({ error: "User ID is required" }, { status: 400 });
	}

	try {
		const workspaceUsers = await db.query.workspaceUser.findMany({
			where: (workspaceUser, { eq }) => eq(workspaceUser.userId, userId),
			with: {
				workspace: true,
			},
		});

		const workspaces = workspaceUsers.map((user) => user.workspace);

		return NextResponse.json(workspaces);
	} catch (error) {
		console.error("Error fetching workspaces:", error);
		return NextResponse.json(
			{ error: "Failed to fetch workspaces" },
			{ status: 500 },
		);
	}
}
