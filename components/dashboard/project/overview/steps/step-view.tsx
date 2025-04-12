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
	[Step.Details]: "Enter basic information about your project",
	[Step.Personas]: "Define characteristics of your target users",
	[Step.Problem]: "Clarify the problems that need to be solved",
	[Step.Hypothesis]: "Set up hypotheses to be validated",
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
	const stepPath = `/dashboard/project/${projectId}/${step.toLowerCase()}`;

	return (
		<div className="flex relative mb-6">
			{/* Timeline section on the left */}
			<div className="flex flex-col items-center mr-4 w-6">
				{/* Circle indicator with number */}
				<div
					className={cn(
						"w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200",
						isActive
							? "bg-main text-main-foreground"
							: "border-1 border-muted-foreground/40 bg-background text-muted-foreground",
					)}
				>
					{index}
				</div>
				{!isLast && <div className="w-0.5 bg-muted-foreground/30 h-21 mt-2" />}
			</div>

			{/* Content section on the right */}
			<div className="flex-1">
				{isActive ? (
					<div className="p-3 rounded-md border border-muted-foreground/10 bg-accent/30">
						<h3 className="font-medium text-xl text-foreground leading-none">
							{step}
						</h3>
						<p className="text-muted-foreground mt-1">
							{stepDescriptions[step]}
						</p>
					</div>
				) : (
					<Link href={stepPath} className="block w-full">
						<div className="p-3 rounded-md border border-muted-foreground/10 hover:border-muted-foreground/20 hover:bg-accent/10 transition-all duration-200 group flex items-center justify-between">
							<div>
								<h3 className="font-medium text-xl text-muted-foreground leading-none pt-[2px] group-hover:text-foreground/80 transition-colors duration-200">
									{step}
								</h3>
								<p className="text-muted-foreground/70 mt-1 group-hover:text-muted-foreground/90 transition-colors duration-200">
									{stepDescriptions[step]}
								</p>
							</div>
							<ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors duration-200" />
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

			<div className="flex-1">
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
		<div className="flex flex-col h-full w-full px-6">
			<div className="flex justify-center text-2xl font-bold text-foreground mt-12 mb-4">
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
