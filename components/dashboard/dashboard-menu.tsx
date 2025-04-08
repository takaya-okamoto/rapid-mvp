"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardMenu() {
	const pathname = usePathname();

	// pathnameがまだ取得できない場合は何もレンダリングしない
	if (!pathname) {
		return null;
	}

	const isProjectDetailPage = /^\/dashboard\/projects\/[^\/]+$/.test(pathname);

	const ROOT_MENU_ITEMS = [
		{
			label: "Projects",
			href: "/dashboard/projects",
		},
	];

	const PROJECT_MENU_ITEMS = [
		{
			label: "Overview",
			href: "/dashboard/projects/overview",
		},
	];

	const menuItems = isProjectDetailPage ? PROJECT_MENU_ITEMS : ROOT_MENU_ITEMS;

	return (
		<div className="flex h-10 z-70 shrink-0 items-center gap-2 px-6">
			{menuItems.map((item) => (
				<Link key={item.href} href={item.href}>
					{item.label}
				</Link>
			))}
		</div>
	);
}
