import { auth } from "@clerk/nextjs/server";
import { LightbulbIcon, Plus, RocketIcon, SparklesIcon } from "lucide-react";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db";
import { CreateProjectDialog } from "./create-project-dialog";
import { ProjectCard } from "./project-card";

async function getWorkspaceUser(workspaceId: string, userId: string) {
	return db.query.workspaceUser.findFirst({
		where: (wu, { eq, and }) =>
			and(
				eq(wu.userId, userId),
				eq(wu.workspaceId, Number.parseInt(workspaceId)),
			),
		with: {
			workspace: true,
		},
	});
}

export async function getProjects(workspaceId: string) {
	return db.query.project.findMany({
		where: (project, { eq }) =>
			eq(project.workspaceId, Number.parseInt(workspaceId)),
		orderBy: (project, { desc }) => [desc(project.createdAt)],
	});
}

type ProjectListProps = {
	workspaceId: string;
};

export async function ProjectList({ workspaceId }: ProjectListProps) {
	const { userId } = await auth();
	if (!userId) throw new Error("User not found");

	const workspaceUser = await getWorkspaceUser(workspaceId, userId);
	if (!workspaceUser) return notFound();

	const projects = await getProjects(workspaceId);

	return (
		<div className="space-y-2 w-full">
			<div className="pb-4 border-b w-full">
				<div className="flex items-end justify-between px-4 pt-6 pb-4 lg:px-16">
					<div>
						<h1 className="text-3xl font-bold tracking-tight text-primary">
							Projects
						</h1>
						<p className="text-muted-foreground">Manage your projects</p>
					</div>

					<div className="flex items-center justify-end">
						<CreateProjectDialog
							workspaceId={workspaceId}
							trigger={
								<Button className="gap-2 bg-main hover:bg-main-dark text-main-foreground">
									<Plus className="h-4 w-4" />
									<span>New Project</span>
								</Button>
							}
						/>
					</div>
				</div>
			</div>

			{projects.length === 0 ? (
				<div className="flex justify-center w-full px-4 lg:px-16">
					<div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-main bg-gradient-to-b from-background to-muted/30 p-10 p-14 text-center max-w-4xl w-full my-5">
						<div className="mb-8">
							<div className="relative">
								<div className="absolute -top-8 -left-8">
									<SparklesIcon className="h-7 w-7 text-main animate-pulse" />
								</div>
								<div className="rounded-full bg-main/10 p-7 mb-2">
									<RocketIcon className="h-14 w-14 text-main" />
								</div>
								<div className="absolute -bottom-5 -right-8">
									<LightbulbIcon className="h-7 w-7 text-warning animate-pulse" />
								</div>
							</div>
						</div>
						<h2 className="text-3xl font-bold tracking-tight mb-4">
							Start Your First Project
						</h2>
						<p className="text-muted-foreground max-w-lg mb-8 text-lg">
							Create a project to organize your MVPs, track feedback, and
							validate your ideas quickly. Bring your vision to life with Rapid
							MVP!
						</p>
						<div className="flex flex-col gap-4 items-center">
							<CreateProjectDialog
								workspaceId={workspaceId}
								trigger={
									<Button
										size="lg"
										className="gap-2 px-10 py-3 bg-main hover:bg-main-dark text-main-foreground text-lg h-auto"
									>
										<Plus className="h-5 w-5" />
										<span>Create Your First Project</span>
									</Button>
								}
							/>
							<p className="text-sm text-muted-foreground mt-3">
								Projects help you organize your work and test multiple ideas
								simultaneously
							</p>
						</div>
					</div>
				</div>
			) : (
				<div className="space-y-6 px-4 py-6 lg:px-16">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
						{projects.map((project) => (
							<ProjectCard
								key={project.id}
								project={project}
								workspaceId={workspaceId}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export function ProjectListSkeleton() {
	return (
		<div className="w-full space-y-2">
			<div className="pb-4 border-b w-full">
				<div className="flex items-end justify-between px-4 py-6 lg:px-16">
					<div>
						<h1 className="text-3xl font-bold tracking-tight text-primary">
							Projects
						</h1>
						<p className="text-muted-foreground">Manage your projects</p>
					</div>

					<Button className="gap-2 bg-main hover:bg-main-dark text-main-foreground">
						<Plus className="h-4 w-4" />
						<span>New Project</span>
					</Button>
				</div>
			</div>

			<div className="space-y-6 px-4 py-6 lg:px-16">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
					{["skeleton-card-1", "skeleton-card-2", "skeleton-card-3"].map(
						(id) => (
							<Card
								key={id}
								className="h-full border border-main/20 overflow-hidden transition-all duration-300 group"
							>
								<CardHeader className="pb-3 relative">
									<div className="flex items-center justify-between">
										<div className="rounded-full bg-main/10 p-2">
											<Skeleton className="h-4 w-4 rounded-full" />
										</div>
										<Skeleton className="h-4 w-4 rounded-full" />
									</div>
									<div className="mt-2">
										<Skeleton className="h-6 w-3/4" />
									</div>
									<div className="flex items-center gap-1 mt-1">
										<Skeleton className="h-3 w-3 rounded-full" />
										<Skeleton className="h-3 w-24" />
									</div>
								</CardHeader>
								<CardContent>
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-4/5 mt-2" />
								</CardContent>
								<CardFooter className="pt-3 pb-4 border-t border-main/10">
									<div className="flex w-full justify-between items-center">
										<div className="flex items-center gap-1.5">
											<Skeleton className="w-2 h-2 rounded-full" />
											<Skeleton className="h-3 w-12" />
										</div>
										<Skeleton className="h-4 w-16" />
									</div>
								</CardFooter>
							</Card>
						),
					)}
				</div>
			</div>
		</div>
	);
}
