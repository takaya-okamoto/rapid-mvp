"use client";

import { createMVP } from "@/app/actions/mvp";
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
import type { Problem } from "@/db/schema/problem";
import { AlertCircle, ImageIcon, Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type CreateMVPButtonProps = {
	problems: Problem[];
	workspaceId: string;
	projectId: string;
	onSuccess?: () => void;
};

type LoadingState =
	| "idle"
	| "generating-mvp"
	| "creating-image"
	| "uploading"
	| "error";

export function CreateMVPButton({
	problems,
	workspaceId,
	projectId,
	onSuccess,
}: CreateMVPButtonProps) {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [loadingState, setLoadingState] = useState<LoadingState>("idle");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [selectedProblemId, setSelectedProblemId] = useState<number>(
		problems[0]?.id,
	);

	async function handleCreateMVP() {
		if (!selectedProblemId) {
			toast.error("Please select a problem");
			return;
		}

		setIsLoading(true);
		setLoadingState("generating-mvp");
		setErrorMessage(null);

		try {
			// Notify user we're working on it
			const toastId = toast.loading("Creating your MVP with AI...");

			// Setup progress update monitor
			const progressCheckInterval = setInterval(() => {
				if (loadingState === "generating-mvp") {
					setLoadingState("creating-image");
					toast.loading("Creating Instagram-ready image...", {
						id: toastId,
					});
				} else if (loadingState === "creating-image") {
					setLoadingState("uploading");
					toast.loading("Finalizing your MVP...", {
						id: toastId,
					});
				}
			}, 10000); // Update progress message every 10 seconds

			const { success, error, mvp } = await createMVP({
				problemId: selectedProblemId,
				workspaceId,
				projectId,
				generateWithAI: true,
			});

			clearInterval(progressCheckInterval);

			if (success) {
				toast.success("MVP created successfully", {
					id: toastId,
					description: mvp?.imageUrl
						? "Including an Instagram-ready image!"
						: undefined,
				});
				setOpen(false);
				onSuccess?.();
			} else {
				throw error || new Error("Failed to create MVP");
			}
		} catch (error) {
			console.error("Error creating MVP:", error);
			setLoadingState("error");

			// Extract error message
			const errorMsg =
				error instanceof Error ? error.message : "An unexpected error occurred";

			setErrorMessage(errorMsg);

			toast.error("Failed to create MVP", {
				description: errorMsg,
			});
		} finally {
			setIsLoading(false);
		}
	}

	if (problems.length === 0) {
		return null;
	}

	const renderLoadingState = () => {
		if (!isLoading && loadingState !== "error") return null;

		if (loadingState === "error") {
			return (
				<div className="py-8 flex flex-col items-center justify-center space-y-4">
					<div className="rounded-full bg-red-50 p-3">
						<AlertCircle className="h-6 w-6 text-red-500" />
					</div>
					<div className="text-center">
						<p className="font-medium text-red-700">Error Creating MVP</p>
						<p className="text-sm text-slate-600 mt-1">
							{errorMessage || "An unexpected error occurred"}
						</p>
						<Button
							variant="outline"
							size="sm"
							className="mt-4"
							onClick={() => setLoadingState("idle")}
						>
							Try Again
						</Button>
					</div>
				</div>
			);
		}

		return (
			<div className="py-12 flex flex-col items-center justify-center space-y-4">
				<Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
				<div className="text-center">
					<p className="font-medium">
						{loadingState === "generating-mvp"
							? "Generating MVP with AI"
							: loadingState === "creating-image"
								? "Creating Instagram-ready image"
								: "Saving your MVP"}
					</p>
					<p className="text-sm text-muted-foreground mt-1">
						{loadingState === "generating-mvp"
							? "This may take a moment while we analyze the problem and create a solution..."
							: loadingState === "creating-image"
								? "Creating a professional image for your MVP..."
								: "Almost done, saving everything..."}
					</p>

					<div className="flex items-center justify-center gap-2 mt-4">
						<div
							className={`w-3 h-3 rounded-full ${loadingState === "generating-mvp" ? "bg-indigo-500" : "bg-slate-300"}`}
						/>
						<div
							className={`w-3 h-3 rounded-full ${loadingState === "creating-image" ? "bg-indigo-500" : "bg-slate-300"}`}
						/>
						<div
							className={`w-3 h-3 rounded-full ${loadingState === "uploading" ? "bg-indigo-500" : "bg-slate-300"}`}
						/>
					</div>
				</div>
			</div>
		);
	};

	return (
		<Dialog open={open} onOpenChange={(value) => !isLoading && setOpen(value)}>
			<DialogTrigger asChild>
				<Button className="gap-2">
					<PlusCircle className="h-4 w-4" />
					Create MVP
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create new MVP</DialogTitle>
					<DialogDescription>
						Select a problem to generate an MVP solution with Instagram-ready
						image
					</DialogDescription>
				</DialogHeader>

				{isLoading || loadingState === "error" ? (
					renderLoadingState()
				) : (
					<div className="py-4">
						<label
							htmlFor="problem-select"
							className="text-sm font-medium mb-2 block"
						>
							Problem to solve
						</label>
						<select
							id="problem-select"
							className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							value={selectedProblemId}
							onChange={(e) => setSelectedProblemId(Number(e.target.value))}
							disabled={isLoading}
						>
							{problems.map((problem) => (
								<option key={problem.id} value={problem.id}>
									{problem.problem}
								</option>
							))}
						</select>

						<div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm">
							<div className="flex items-start gap-2">
								<ImageIcon className="h-5 w-5 text-indigo-500 mt-0.5" />
								<div>
									<p className="font-medium text-slate-800">
										Instagram-ready image included
									</p>
									<p className="text-slate-600">
										We&apos;ll automatically generate a professional Instagram
										image for your MVP
									</p>
								</div>
							</div>
						</div>
					</div>
				)}

				<DialogFooter>
					{loadingState !== "error" && (
						<Button onClick={handleCreateMVP} disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="h-4 w-4 mr-2 animate-spin" />
									Creating...
								</>
							) : (
								"Create MVP with AI"
							)}
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
