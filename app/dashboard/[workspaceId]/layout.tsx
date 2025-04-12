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
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col h-screen">
			<header className="flex h-14 z-70 shrink-0 items-center gap-2 px-6 pt-2">
				<div className="flex w-full items-center justify-between gap-2">
					<DashboardBreadcrumb />

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

			<DashboardMenu />

			<Separator />

			{children}
		</div>
	);
}
