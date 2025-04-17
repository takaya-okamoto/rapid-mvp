import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MVPsSkeleton() {
	return (
		<div className="p-6 mt-2 space-y-6 max-w-4xl mx-auto">
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<Skeleton className="h-8 w-32" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card className="overflow-hidden transition-all duration-200">
						<CardHeader className="p-4 pb-0">
							<Skeleton className="h-5 w-32 mb-2" />
							<Skeleton className="h-4 w-full" />
						</CardHeader>
						<CardContent className="p-4">
							<div className="space-y-3">
								<Skeleton className="h-32 w-full rounded-md" />
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-4 w-1/2" />
								<div className="flex gap-2 mt-2">
									<Skeleton className="h-8 w-20 rounded-full" />
									<Skeleton className="h-8 w-20 rounded-full" />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="overflow-hidden transition-all duration-200">
						<CardHeader className="p-4 pb-0">
							<Skeleton className="h-5 w-32 mb-2" />
							<Skeleton className="h-4 w-full" />
						</CardHeader>
						<CardContent className="p-4">
							<div className="space-y-3">
								<Skeleton className="h-32 w-full rounded-md" />
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-4 w-1/2" />
								<div className="flex gap-2 mt-2">
									<Skeleton className="h-8 w-20 rounded-full" />
									<Skeleton className="h-8 w-20 rounded-full" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
