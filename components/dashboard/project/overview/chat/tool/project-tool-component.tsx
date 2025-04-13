import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type ProjectToolComponentProps = {
	name?: string;
	description?: string;
};

export function ProjectToolComponent({
	name,
	description,
}: ProjectToolComponentProps) {
	if (!name || !description) {
		// skelton
		return (
			<Card>
				<CardHeader>
					<CardTitle>
						<Skeleton className="w-24 h-4" />
					</CardTitle>
					<CardDescription>
						<Skeleton className="w-32 h-4" />
					</CardDescription>
				</CardHeader>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>{name}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
		</Card>
	);
}
