"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function DashboardMenu() {
	const pathname = usePathname();
	const { workspaceId, projectId } = useParams();

	// pathnameがまだ取得できない場合は何もレンダリングしない
	if (!pathname) {
		return null;
	}

	const ROOT_MENU_ITEMS = [
		{
			label: "Projects",
			href: `/dashboard/${workspaceId}`,
		},
		{
			label: "Settings",
			href: `/dashboard/${workspaceId}/settings`,
		},
	];

	const PROJECT_MENU_ITEMS = [
		{
			label: "Overview",
			href: `/dashboard/${workspaceId}/${projectId}/overview`,
		},
		{
			label: "MVPs",
			href: `/dashboard/${workspaceId}/${projectId}/mvps`,
		},
		{
			label: "Feedbacks",
			href: `/dashboard/${workspaceId}/${projectId}/feedbacks`,
		},
	];
	const menuItems = projectId ? PROJECT_MENU_ITEMS : ROOT_MENU_ITEMS;

	const isActive = (href: string) => {
		// Make Overview active for all overview subpaths
		if (href.includes("/overview") && pathname.includes("/overview")) {
			return true;
		}
		// Otherwise use exact match
		return pathname === href;
	};

	return (
		<nav className="flex overflow-x-auto px-6 w-full">
			{menuItems.map((item) => (
				<Link
					key={item.href}
					href={item.href}
					className={cn(
						"relative px-4 py-3 text-sm font-medium transition-colors hover:text-foreground/80",
						"whitespace-nowrap flex items-center",
						isActive(item.href) ? "text-primary" : "text-foreground/60",
					)}
				>
					{item.label}
					{isActive(item.href) && (
						<span className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted-foreground" />
					)}
				</Link>
			))}
		</nav>
	);
}
