import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserIcon } from "lucide-react";

type PersonaToolComponentProps = {
	name?: string;
	occupation?: string;
};

export function PersonaToolComponent({
	name,
	occupation,
}: PersonaToolComponentProps) {
	if (!name || !occupation) {
		// skelton
		return (
			<Card className="transition-all">
				<CardHeader className="flex flex-row items-center gap-2">
					<div className="rounded-full bg-main/10 p-2 shadow-sm">
						<Skeleton className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<CardTitle>
							<Skeleton className="w-24 h-4" />
						</CardTitle>
						<CardDescription>
							<Skeleton className="w-32 h-4" />
						</CardDescription>
					</div>
				</CardHeader>
			</Card>
		);
	}

	return (
		<Card className="transition-all hover:shadow-md">
			<CardHeader className="flex flex-row items-center gap-2">
				<div className="rounded-full bg-main/10 p-2 shadow-sm">
					<UserIcon className="h-5 w-5 text-main" />
				</div>
				<div>
					<CardTitle>{name}</CardTitle>
					<CardDescription>{occupation}</CardDescription>
				</div>
			</CardHeader>
		</Card>
	);
}
