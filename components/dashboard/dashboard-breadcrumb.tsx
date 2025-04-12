import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { Suspense } from "react";
import {
	DashboardBreadcrumbSwitcherContainer,
	DashboardBreadcrumbSwitcherContainerSkeleton,
} from "./dashboard-breadcrumb-switcher-container";

export async function DashboardBreadcrumb() {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/dashboard">
						<Image src="/logo.svg" alt="RapidMVP" width={28} height={28} />
					</BreadcrumbLink>
				</BreadcrumbItem>

				<Suspense fallback={<DashboardBreadcrumbSwitcherContainerSkeleton />}>
					<DashboardBreadcrumbSwitcherContainer />
				</Suspense>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
