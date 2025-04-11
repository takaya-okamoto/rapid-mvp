import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
	const user = await currentUser();

	if (!user) {
		redirect("/");
	}

	const workspaceUser = await db.query.workspaceUser.findFirst({
		where: (workspaceUser, { eq }) => eq(workspaceUser.userId, user.id),
	});

	if (!workspaceUser) {
		redirect("/");
	}

	if (workspaceUser) {
		redirect(`/dashboard/${workspaceUser.workspaceId}`);
	}

	return <div>Dashboard</div>;
}
