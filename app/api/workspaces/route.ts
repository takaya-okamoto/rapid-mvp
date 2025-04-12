import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET() {
	const user = await currentUser();

	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const userId = user.id;

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
