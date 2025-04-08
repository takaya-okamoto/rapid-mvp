"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ProjectSwitcher } from "./project-switcher";
import { WorkspaceSwitcher } from "./workspace-switcher";

type DashboardBreadcrumbProps = {
	workspaceId: string;
	projectId: string | undefined;
};

export function DashboardBreadcrumb({
	workspaceId,
	projectId,
}: DashboardBreadcrumbProps) {
	const pathname = usePathname();
	const isProjectDetailPage = /^\/dashboard\/projects\/[^\/]+$/.test(pathname);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/dashboard">
						<Image src="/logo.svg" alt="RapidMVP" width={32} height={32} />
					</BreadcrumbLink>
				</BreadcrumbItem>

				<Slash size={14} />
				<BreadcrumbItem>
					<WorkspaceSwitcher workspaceId={workspaceId} />
				</BreadcrumbItem>

				{isProjectDetailPage && (
					<>
						<Slash size={14} />
						<BreadcrumbItem>
							<ProjectSwitcher
								workspaceId={workspaceId}
								projectId={projectId}
							/>
						</BreadcrumbItem>
					</>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
