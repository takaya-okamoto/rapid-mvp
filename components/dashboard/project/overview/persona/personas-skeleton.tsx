import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PersonasSkeleton() {
	return (
		<div className="p-6 mt-2 space-y-6 max-w-4xl mx-auto">
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h2 className="text-3xl font-bold tracking-tight">Personas</h2>
				</div>
				<div className="flex flex-col gap-4">
					<PersonaSkeletonCard />
					<PersonaSkeletonCard />
				</div>
			</div>
		</div>
	);
}

function PersonaSkeletonCard() {
	return (
		<Card className="overflow-hidden transition-all border-main/10 bg-gradient-to-r from-main/[0.03] to-background">
			<div className="p-4">
				{/* Basic Info Section Skeleton */}
				<div className="flex items-start justify-between mb-3">
					<div className="flex items-start space-x-3">
						<Skeleton className="rounded-full w-10 h-10" />
						<div className="flex-1">
							<Skeleton className="h-5 w-24 mb-1" />
							<Skeleton className="h-3 w-32" />
						</div>
					</div>
					<Skeleton className="h-7 w-12" />
				</div>

				{/* Demographics and Psychographics Skeleton */}
				<div className="grid grid-cols-2 gap-2 mb-3">
					<div className="bg-background rounded-lg p-2 border border-main/5">
						<div className="flex items-center gap-2">
							<Skeleton className="w-6 h-6 rounded-full" />
							<Skeleton className="h-3 w-20" />
						</div>
					</div>

					<div className="bg-background rounded-lg p-2 border border-main/5">
						<div className="flex items-center gap-2">
							<Skeleton className="w-6 h-6 rounded-full" />
							<Skeleton className="h-3 w-16" />
						</div>
					</div>

					<div className="bg-background rounded-lg p-2 border border-main/5">
						<div className="flex items-center gap-2">
							<Skeleton className="w-6 h-6 rounded-full" />
							<div className="flex-1">
								<Skeleton className="h-3 w-12 mb-1" />
								<Skeleton className="h-3 w-full" />
							</div>
						</div>
					</div>

					<div className="bg-background rounded-lg p-2 border border-main/5">
						<div className="flex items-center gap-2">
							<Skeleton className="w-6 h-6 rounded-full" />
							<div className="flex-1">
								<Skeleton className="h-3 w-12 mb-1" />
								<Skeleton className="h-3 w-full" />
							</div>
						</div>
					</div>
				</div>

				{/* Pain Points Skeleton */}
				<div className="bg-background rounded-lg p-2 border border-main/5">
					<div className="flex items-center gap-2">
						<Skeleton className="w-6 h-6 rounded-full" />
						<div className="flex-1">
							<Skeleton className="h-3 w-16 mb-1" />
							<Skeleton className="h-3 w-full" />
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
}
