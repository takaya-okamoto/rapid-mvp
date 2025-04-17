import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Create a static array of unique IDs to use as keys
const SKELETON_ITEMS = ["skeleton-1", "skeleton-2", "skeleton-3"];

export function ProblemsSkeleton() {
	return (
		<div className="p-6 mt-2 space-y-6 max-w-4xl mx-auto">
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<Skeleton className="h-10 w-32" />
				</div>

				<div className="flex flex-col gap-4">
					{SKELETON_ITEMS.map((id) => (
						<Card key={id} className="shadow-sm">
							<CardHeader className="pb-2">
								<div className="flex justify-between">
									<Skeleton className="h-6 w-4/5" />
									<Skeleton className="h-6 w-20 rounded-full" />
								</div>
							</CardHeader>
							<CardFooter className="flex justify-end gap-2">
								<Skeleton className="h-9 w-20" />
								<Skeleton className="h-9 w-24" />
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
