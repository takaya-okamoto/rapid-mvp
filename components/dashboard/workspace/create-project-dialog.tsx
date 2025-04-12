"use client";

import { LightbulbIcon, RocketIcon, SparklesIcon } from "lucide-react";
import { useState } from "react";

import { createProject } from "@/app/actions/project";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useHandleSubmission from "@/hooks/use-handle-submission";

type CreateProjectDialogProps = {
	workspaceId: string;
	trigger?: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export function CreateProjectDialog({
	workspaceId,
	trigger,
	open: controlledOpen,
	onOpenChange: setControlledOpen,
}: CreateProjectDialogProps) {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

	const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
	const setOpen = setControlledOpen || setUncontrolledOpen;

	const [, formAction, isPending] = useHandleSubmission(
		async (_, formData: FormData) => {
			try {
				const name = formData.get("name") as string;
				const description = formData.get("description") as string;

				const result = await createProject({
					name,
					description,
					workspaceId: Number.parseInt(workspaceId),
				});

				setOpen(false);
				return {
					success: true,
					successMessage: "Project created successfully!",
					redirectPath: result.redirectPath,
				};
			} catch (error) {
				console.error(error);
				return {
					success: false,
					errorMessage: "Failed to create project",
				};
			}
		},
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
			<DialogContent className="sm:max-w-md border-main/20 overflow-hidden">
				<div className="absolute -z-10 inset-0 bg-gradient-to-br from-background via-background to-main/5 opacity-80" />

				<div className="absolute -top-12 -right-12 opacity-10">
					<SparklesIcon className="h-32 w-32 text-main rotate-12" />
				</div>

				<div className="absolute right-4 top-12">
					<SparklesIcon className="h-4 w-4 text-main animate-pulse" />
				</div>

				<div className="absolute bottom-8 left-4">
					<LightbulbIcon className="h-4 w-4 text-warning animate-pulse" />
				</div>

				<DialogHeader className="pt-2">
					<div className="flex justify-center mb-3">
						<div className="rounded-full bg-main/10 p-3 relative">
							<RocketIcon className="h-8 w-8 text-main" />
							<div className="absolute -top-1 -right-1">
								<SparklesIcon className="h-3 w-3 text-main animate-ping" />
							</div>
						</div>
					</div>
					<DialogTitle className="text-center text-2xl">
						Launch a New Project
					</DialogTitle>
					<DialogDescription className="text-center mx-auto max-w-[280px]">
						Bring your ideas to life and validate them quickly with Rapid MVP
					</DialogDescription>
				</DialogHeader>

				<form action={formAction}>
					<div className="space-y-5 py-4">
						<div className="space-y-2">
							<Label htmlFor="name" className="font-medium">
								Project Name
							</Label>
							<Input
								id="name"
								name="name"
								placeholder="Enter an inspiring name"
								required
								className="border-main/20 focus-visible:ring-main/30 transition-all"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="description" className="font-medium">
								Vision & Goals
							</Label>
							<Textarea
								id="description"
								name="description"
								placeholder="Describe what you want to achieve with this project"
								rows={3}
								required
								className="border-main/20 focus-visible:ring-main/30 resize-none transition-all"
							/>
						</div>
					</div>
					<DialogFooter className="flex-col gap-2 sm:flex-col sm:gap-2">
						<Button
							type="submit"
							disabled={isPending}
							className="w-full transition-all bg-main hover:bg-main-dark text-main-foreground gap-2 py-5"
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
									Creating your project...
								</>
							) : (
								<>
									<RocketIcon className="h-5 w-5" />
									Launch Project
								</>
							)}
						</Button>
						<p className="text-xs text-center text-muted-foreground">
							You can edit your project details anytime
						</p>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
