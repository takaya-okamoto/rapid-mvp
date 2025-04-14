"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OverviewMainSkeleton() {
	return (
		<div className="p-6 space-y-6 max-w-4xl mx-auto">
			<ProjectHeaderSkeleton />
			<ProjectDetailsSkeleton />
		</div>
	);
}

function ProjectHeaderSkeleton() {
	return (
		<div className="flex items-center gap-3">
			<Skeleton className="h-12 w-12 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-8 w-64" />
				<Skeleton className="h-4 w-40" />
			</div>
		</div>
	);
}

function ProjectDetailsSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-6 w-48 mb-2" />
				<Skeleton className="h-4 w-72" />
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<Skeleton className="h-24 w-full" />
					<div className="grid grid-cols-3 gap-4">
						<Skeleton className="h-20 w-full" />
						<Skeleton className="h-20 w-full" />
						<Skeleton className="h-20 w-full" />
					</div>
					<div className="flex justify-end pt-4">
						<Skeleton className="h-10 w-40" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
