"use client";

import { SaveIcon } from "lucide-react";

import { updateWorkspace } from "@/app/actions/workspace";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import type { Workspace } from "@/db/schema/workspace";
import useHandleSubmission from "@/hooks/use-handle-submission";

export function WorkspaceSettingsSkeleton() {
	return (
		<div className="w-full space-y-2">
			<div className="pb-4 border-b w-full">
				<div className="flex items-end justify-between px-4 pt-6 pb-4 lg:px-16">
					<div>
						<h1 className="text-3xl font-bold tracking-tight text-primary">
							Settings
						</h1>
						<p className="text-muted-foreground">
							Manage your workspace settings
						</p>
					</div>
				</div>
			</div>

			<div className="space-y-6 px-4 py-6 lg:px-16">
				<Card className="border border-main/20 overflow-hidden transition-all duration-300 h-full">
					<CardHeader className="pb-3 relative">
						<CardTitle>Workspace Profile</CardTitle>
						<CardDescription>
							Update your workspace information visible to all members.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Label className="font-medium">Workspace Name</Label>
							<Skeleton className="h-9 w-full" />
						</div>
						<div className="space-y-2">
							<Label className="font-medium">Description</Label>
							<Skeleton className="h-16 w-full" />
						</div>
					</CardContent>
					<CardFooter className="pt-3 pb-4 border-t border-main/10 flex justify-end">
						<Button className="gap-2 bg-main hover:bg-main-dark text-main-foreground">
							<SaveIcon className="h-4 w-4" />
							Save Changes
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}

export function WorkspaceSettingsForm({
	workspaceId,
	initialData,
}: {
	workspaceId: string;
	initialData: Workspace;
}) {
	const [, formAction, isPending] = useHandleSubmission(
		async (_, formData: FormData) => {
			try {
				const name = formData.get("name") as string;
				const description = formData.get("description") as string;

				await updateWorkspace({
					id: Number.parseInt(workspaceId),
					name,
					description,
					createdAt: initialData.createdAt,
					updatedAt: new Date(),
				});

				return {
					success: true,
					successMessage: "Workspace updated successfully!",
					redirectPath: "/dashboard",
				};
			} catch (error) {
				console.error(error);
				return {
					success: false,
					errorMessage: "Failed to update workspace",
				};
			}
		},
	);

	return (
		<form action={formAction}>
			<Card className="border border-main/20 overflow-hidden transition-all duration-300 group h-full hover:border-main/40 hover:shadow-md">
				<CardHeader className="pb-3">
					<CardTitle>Workspace Profile</CardTitle>
					<CardDescription>
						Update your workspace information visible to all members.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="name" className="font-medium">
							Workspace Name
						</Label>
						<Input
							id="name"
							name="name"
							defaultValue={initialData.name}
							placeholder="Enter workspace name"
							required
							className="border-main/20 focus-visible:ring-main/30 transition-all"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="description" className="font-medium">
							Description
						</Label>
						<Textarea
							id="description"
							name="description"
							defaultValue={initialData.description || ""}
							placeholder="Describe the purpose of this workspace"
							rows={4}
							className="border-main/20 focus-visible:ring-main/30 resize-none transition-all"
						/>
					</div>
				</CardContent>
				<CardFooter className="pt-3 pb-4 border-t border-main/10 flex justify-end">
					<Button
						type="submit"
						disabled={isPending}
						className="transition-all bg-main hover:bg-main-dark text-main-foreground gap-2"
					>
						{isPending ? (
							<>
								<svg
									className="animate-spin -ml-1 mr-2 h-4 w-4 text-main-foreground"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									/>
								</svg>
								Saving...
							</>
						) : (
							<>
								<SaveIcon className="h-4 w-4" />
								Save Changes
							</>
						)}
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
