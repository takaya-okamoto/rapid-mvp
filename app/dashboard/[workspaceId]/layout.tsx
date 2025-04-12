import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";

import { DashboardBreadcrumb } from "@/components/dashboard/dashboard-breadcrumb";
import { DashboardMenu } from "@/components/dashboard/dashboard-menu";
import { Separator } from "@/components/ui/separator";

export default async function DashboardLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ workspaceId: string; projectId: string | undefined }>;
}) {
	const { workspaceId, projectId } = await params;
	return (
		<div className="flex flex-col h-screen">
			<header className="flex h-14 z-70 shrink-0 items-center gap-2 px-6 pt-2">
				<div className="flex w-full items-center justify-between gap-2">
					<DashboardBreadcrumb
						workspaceId={workspaceId}
						projectId={projectId}
					/>

					<div className="flex items-center gap-2">
						<SignedOut>
							<SignInButton />
							<SignUpButton />
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</div>
				</div>
			</header>

			<DashboardMenu workspaceId={workspaceId} projectId={projectId} />

			<Separator />

			<main className="flex-1 overflow-auto">
				<div className="max-w-screen-xl px-4 py-6 lg:px-8">{children}</div>
			</main>
		</div>
	);
}
