"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Steps list
 *
 * 1. Details
 * 2. Personas
 * 3. Problem
 * 4. Hypothesis
 */

enum Step {
	Details = "Details",
	Personas = "Personas",
	Problem = "Problem",
	Hypothesis = "Hypothesis",
}

// Step descriptions in English
const stepDescriptions: Record<Step, string> = {
	[Step.Details]: "Basic project information",
	[Step.Personas]: "Target user profiles",
	[Step.Problem]: "Problem definition",
	[Step.Hypothesis]: "Validation hypotheses",
};

function StepItem({
	step,
	isActive,
	isLast,
	index,
}: {
	step: Step;
	isActive: boolean;
	isLast: boolean;
	index: number;
}) {
	const params = useParams();
	const projectId = params.projectId as string;
	const workspaceId = params.workspaceId as string;

	const overviewPath = `/dashboard/${workspaceId}/${projectId}/overview`;

	const stepPath =
		step === Step.Details
			? overviewPath
			: `${overviewPath}/${step.toLowerCase()}`;

	return (
		<div className="flex relative mb-6">
			{/* Timeline section on the left */}
			<div className="flex flex-col items-center mr-4 w-6">
				{/* Circle indicator with number */}
				<div
					className={cn(
						"w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-200",
						isActive
							? "bg-main/80 text-main-foreground"
							: "border-1 border-muted-foreground/40 bg-background text-muted-foreground",
					)}
				>
					{index}
				</div>
				{!isLast && <div className="w-0.5 bg-muted-foreground/30 h-21 mt-2" />}
			</div>

			{/* Content section on the right */}
			<div className="w-96">
				{isActive ? (
					<div className="p-3 rounded-md border border-muted-foreground/10 bg-accent/30 flex items-center justify-between transition-all duration-500 ease-in-out">
						<div>
							<h3 className="font-medium text-lg text-foreground leading-none transition-colors duration-500 ease-in-out">
								{step}
							</h3>
							<p className="text-sm text-muted-foreground mt-1 transition-colors duration-500 ease-in-out">
								{stepDescriptions[step]}
							</p>
						</div>
					</div>
				) : (
					<Link href={stepPath} className="block w-full">
						<div className="p-3 rounded-md border border-muted-foreground/10 hover:border-muted-foreground/20 hover:bg-accent/10 transition-all duration-300 ease-in-out group flex items-center justify-between">
							<div>
								<h3 className="font-medium text-lg text-muted-foreground leading-none group-hover:text-foreground/80 transition-colors duration-300 ease-in-out">
									{step}
								</h3>
								<p className="text-sm text-muted-foreground/70 mt-1 group-hover:text-muted-foreground/90 transition-colors duration-300 ease-in-out">
									{stepDescriptions[step]}
								</p>
							</div>
							<ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors duration-300 ease-in-out" />
						</div>
					</Link>
				)}
			</div>
		</div>
	);
}

function StepItemSkeleton() {
	return (
		<div className="flex relative mb-6">
			<div className="flex flex-col items-center mr-4 w-6">
				<Skeleton className="relative w-6 h-6 rounded-full mt-3" />
				<Skeleton className="w-0.5 h-16 mt-2" />
			</div>

			<div className="w-96">
				<Skeleton className="w-full h-20 rounded-md" />
			</div>
		</div>
	);
}

export function StepView() {
	const pathname = usePathname();

	const currentStep =
		Object.values(Step).find((step) => pathname.includes(step.toLowerCase())) ||
		Step.Details;

	return (
		<div className="flex flex-col h-full w-full px-6 ">
			<div className="flex justify-center text-xl font-bold text-muted-foreground mt-12 mb-4">
				Validate Steps
			</div>

			<div className="flex-1 flex flex-col">
				<Suspense
					fallback={
						<div className="pt-4">
							{Object.values(Step).map((step) => (
								<StepItemSkeleton key={`skeleton-${step}`} />
							))}
						</div>
					}
				>
					<div className="pt-4 px-4">
						{Object.values(Step).map((step, index) => (
							<StepItem
								key={step}
								step={step}
								isActive={step === currentStep}
								isLast={index === Object.values(Step).length - 1}
								index={index + 1}
							/>
						))}
					</div>
				</Suspense>
			</div>
		</div>
	);
}
