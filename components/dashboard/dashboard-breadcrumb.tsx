import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { Suspense } from "react";
import {
	DashboardBreadcrumbSwitcherContainer,
	DashboardBreadcrumbSwitcherContainerSkeleton,
	preloadDashboardBreadcrumbData,
} from "./dashboard-breadcrumb-switcher-container";

type DashboardBreadcrumbProps = {
	workspaceId: string;
	projectId: string | undefined;
};

export async function DashboardBreadcrumb({
	workspaceId,
	projectId,
}: DashboardBreadcrumbProps) {
	const user = await currentUser();
	if (user) {
		preloadDashboardBreadcrumbData(user.id);
	}

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/dashboard">
						<Image src="/logo.svg" alt="RapidMVP" width={28} height={28} />
					</BreadcrumbLink>
				</BreadcrumbItem>

				<Suspense fallback={<DashboardBreadcrumbSwitcherContainerSkeleton />}>
					<DashboardBreadcrumbSwitcherContainer
						workspaceId={workspaceId}
						projectId={projectId}
					/>
				</Suspense>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
