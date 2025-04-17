"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Persona } from "@/db/schema/persona";
import {
	AlertTriangleIcon,
	DollarSign,
	HeartIcon,
	MapPinIcon,
	PencilIcon,
	TargetIcon,
	Trash2Icon,
	UserIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type EditablePersonaCardProps = {
	persona: Persona;
	handleUpdatePersona: (persona: Persona) => Promise<void>;
	handleDeletePersona: (personaId: string) => Promise<void>;
};

export function EditablePersonaCard({
	persona,
	handleUpdatePersona,
	handleDeletePersona,
}: EditablePersonaCardProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [editedPersona, setEditedPersona] = useState<Persona>(persona);

	const handleInputChange = (field: keyof Persona, value: unknown) => {
		setEditedPersona((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted", editedPersona);
		setIsLoading(true);

		try {
			console.log("Calling handleUpdatePersona");
			await handleUpdatePersona(editedPersona);
			console.log("Update successful");
		} catch (error) {
			console.error("Failed to update persona:", error);
			setEditedPersona(persona);
		} finally {
			setIsLoading(false);
			setIsEditing(false);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedPersona(persona);
	};

	const handleDelete = async () => {
		setIsLoading(true);
		try {
			await handleDeletePersona(persona.id.toString());
			setIsDeleteDialogOpen(false);
			toast.success("Persona deleted successfully");
		} catch (error) {
			console.error("Failed to delete persona:", error);
			toast.error("Failed to delete persona");
		} finally {
			setIsLoading(false);
		}
	};

	if (isEditing) {
		return (
			<Card className="overflow-hidden border-main/10 bg-gradient-to-r from-main/[0.03] to-background p-4">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="flex items-center gap-2 mb-3">
						<div className="rounded-full bg-main/10 p-2 shadow-sm">
							<UserIcon className="h-6 w-6 text-main" />
						</div>
						<div className="flex-1">
							<Input
								value={editedPersona.name || ""}
								onChange={(e) => handleInputChange("name", e.target.value)}
								placeholder="Persona Name"
								className="font-bold"
								disabled={isLoading}
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1">
							<label
								htmlFor="persona-age"
								className="text-xs text-muted-foreground"
							>
								Age
							</label>
							<Input
								id="persona-age"
								type="number"
								value={editedPersona.age || ""}
								onChange={(e) => {
									const value = e.target.value;
									const parsedValue = value ? Number.parseInt(value, 10) : null;
									handleInputChange("age", parsedValue);
								}}
								placeholder="Age"
								disabled={isLoading}
							/>
						</div>

						<div className="space-y-1">
							<span className="text-xs text-muted-foreground">Gender</span>
							<div className="flex gap-2">
								<Button
									type="button"
									size="sm"
									variant={editedPersona.male === true ? "default" : "outline"}
									className={
										editedPersona.male === true
											? "bg-main text-main-foreground"
											: ""
									}
									onClick={() => handleInputChange("male", true)}
									disabled={isLoading}
								>
									Male
								</Button>
								<Button
									type="button"
									size="sm"
									variant={editedPersona.male === false ? "default" : "outline"}
									className={
										editedPersona.male === false
											? "bg-main text-main-foreground"
											: ""
									}
									onClick={() => handleInputChange("male", false)}
									disabled={isLoading}
								>
									Female
								</Button>
								<Button
									type="button"
									size="sm"
									variant={editedPersona.male === null ? "default" : "outline"}
									className={
										editedPersona.male === null
											? "bg-main text-main-foreground"
											: ""
									}
									onClick={() => handleInputChange("male", null)}
									disabled={isLoading}
								>
									Other
								</Button>
							</div>
						</div>

						<div className="space-y-1">
							<label
								htmlFor="persona-occupation"
								className="text-xs text-muted-foreground"
							>
								Occupation
							</label>
							<Input
								id="persona-occupation"
								value={editedPersona.occupation || ""}
								onChange={(e) =>
									handleInputChange("occupation", e.target.value)
								}
								placeholder="Occupation"
								disabled={isLoading}
							/>
						</div>

						<div className="space-y-1">
							<label
								htmlFor="persona-location"
								className="text-xs text-muted-foreground"
							>
								Location
							</label>
							<div className="flex items-center gap-2">
								<MapPinIcon className="h-4 w-4 text-main-dark" />
								<Input
									id="persona-location"
									value={editedPersona.location || ""}
									onChange={(e) =>
										handleInputChange("location", e.target.value)
									}
									placeholder="Location"
									disabled={isLoading}
								/>
							</div>
						</div>

						<div className="space-y-1">
							<label
								htmlFor="persona-income"
								className="text-xs text-muted-foreground"
							>
								Income
							</label>
							<div className="flex items-center gap-2">
								<DollarSign className="h-4 w-4 text-main-dark" />
								<Input
									id="persona-income"
									type="number"
									value={editedPersona.income || ""}
									onChange={(e) => {
										const value = e.target.value;
										const parsedValue = value
											? Number.parseInt(value, 10)
											: null;
										handleInputChange("income", parsedValue);
									}}
									placeholder="Annual Income"
									disabled={isLoading}
								/>
							</div>
						</div>
					</div>

					<div className="space-y-1">
						<label
							htmlFor="persona-values"
							className="text-xs text-muted-foreground flex items-center gap-2"
						>
							<HeartIcon className="h-4 w-4 text-main-dark" />
							Values
						</label>
						<Textarea
							id="persona-values"
							value={editedPersona.values || ""}
							onChange={(e) => handleInputChange("values", e.target.value)}
							placeholder="What does this persona value?"
							rows={2}
							disabled={isLoading}
						/>
					</div>

					<div className="space-y-1">
						<label
							htmlFor="persona-goals"
							className="text-xs text-muted-foreground flex items-center gap-2"
						>
							<TargetIcon className="h-4 w-4 text-main-dark" />
							Goals
						</label>
						<Textarea
							id="persona-goals"
							value={editedPersona.goals || ""}
							onChange={(e) => handleInputChange("goals", e.target.value)}
							placeholder="What are this persona's goals?"
							rows={2}
							disabled={isLoading}
						/>
					</div>

					<div className="space-y-1">
						<label
							htmlFor="persona-pain-points"
							className="text-xs text-muted-foreground flex items-center gap-2"
						>
							<AlertTriangleIcon className="h-4 w-4 text-main-dark" />
							Pain Points
						</label>
						<Textarea
							id="persona-pain-points"
							value={editedPersona.painPoints || ""}
							onChange={(e) => handleInputChange("painPoints", e.target.value)}
							placeholder="What are this persona's pain points?"
							rows={2}
							disabled={isLoading}
						/>
					</div>

					<div className="flex items-center gap-2">
						<Button
							type="submit"
							size="sm"
							className="bg-main hover:bg-main-dark text-main-foreground"
							disabled={isLoading}
							onClick={() => console.log("Save button clicked")}
						>
							Save
						</Button>
						<Button
							type="button"
							size="sm"
							variant="outline"
							onClick={handleCancel}
							disabled={isLoading}
						>
							Cancel
						</Button>
					</div>
				</form>
			</Card>
		);
	}

	return (
		<>
			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Delete Persona</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete &quot;{persona.name || "Unnamed"}
							&quot;? This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="mt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => setIsDeleteDialogOpen(false)}
							disabled={isLoading}
						>
							Cancel
						</Button>
						<Button
							type="button"
							variant="default"
							onClick={handleDelete}
							disabled={isLoading}
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Card className="overflow-hidden transition-all border-main/10 bg-gradient-to-r from-main/[0.03] to-background group relative">
				<div className="p-4">
					<div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity flex">
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7 rounded-full hover:bg-main/10"
							onClick={() => setIsEditing(true)}
						>
							<PencilIcon className="h-3.5 w-3.5 text-main" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7 rounded-full hover:bg-red-100"
							onClick={() => setIsDeleteDialogOpen(true)}
						>
							<Trash2Icon className="h-3.5 w-3.5 text-red-500" />
						</Button>
					</div>

					{/* Basic Info Section */}
					<div className="flex items-start justify-between mb-3">
						<div className="flex items-start space-x-3">
							<div className="rounded-full bg-main/10 p-2 shadow-sm">
								<UserIcon className="h-6 w-6 text-main" />
							</div>
							<div className="flex-1">
								<h3 className="text-lg font-bold text-slate-900">
									{persona.name || "Unnamed"}
								</h3>
								<div className="text-xs text-muted-foreground">
									{persona.age && `${persona.age} years old`}
									{persona.male !== undefined && persona.age && " • "}
									{persona.male !== undefined &&
										(persona.male === true
											? "Male"
											: persona.male === false
												? "Female"
												: "Other")}
									{persona.occupation && (
										<span className="ml-1 font-medium text-slate-700">
											• {persona.occupation}
										</span>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Demographics and Psychographics in a Grid */}
					<div className="grid grid-cols-2 gap-2 mb-3">
						<div className="bg-background rounded-lg p-2 border border-main/5">
							<div className="flex items-center gap-2">
								<div className="flex items-center justify-center rounded-full bg-main/10 p-1.5 w-6 h-6">
									<MapPinIcon className="h-3 w-3 text-main-dark" />
								</div>
								<div className="text-xs">{persona.location}</div>
							</div>
						</div>

						{persona.income && (
							<div className="bg-background rounded-lg p-2 border border-main/5">
								<div className="flex items-center gap-2">
									<div className="flex items-center justify-center rounded-full bg-main/10 p-1.5 w-6 h-6">
										<DollarSign className="h-3 w-3 text-main-dark" />
									</div>
									<div className="text-xs">
										${persona.income.toLocaleString()}
									</div>
								</div>
							</div>
						)}

						{persona.values && (
							<div className="bg-background rounded-lg p-2 border border-main/5">
								<div className="flex items-center gap-2">
									<div className="flex items-center justify-center rounded-full bg-main/10 p-1.5 w-6 h-6">
										<HeartIcon className="h-3 w-3 text-main-dark" />
									</div>
									<div>
										<div className="text-xs font-medium text-slate-700">
											Values
										</div>
										<div className="text-xs line-clamp-2">{persona.values}</div>
									</div>
								</div>
							</div>
						)}

						{persona.goals && (
							<div className="bg-background rounded-lg p-2 border border-main/5">
								<div className="flex items-center gap-2">
									<div className="flex items-center justify-center rounded-full bg-main/10 p-1.5 w-6 h-6">
										<TargetIcon className="h-3 w-3 text-main-dark" />
									</div>
									<div>
										<div className="text-xs font-medium text-slate-700">
											Goals
										</div>
										<div className="text-xs line-clamp-2">{persona.goals}</div>
									</div>
								</div>
							</div>
						)}
					</div>

					{persona.painPoints && (
						<div className="bg-background rounded-lg p-2 border border-main/5">
							<div className="flex items-center gap-2">
								<div className="flex items-center justify-center rounded-full bg-main/10 p-1.5 w-6 h-6">
									<AlertTriangleIcon className="h-3 w-3 text-main-dark" />
								</div>
								<div>
									<div className="text-xs font-medium text-slate-700">
										Pain Points
									</div>
									<div className="text-xs line-clamp-2">
										{persona.painPoints}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</Card>
		</>
	);
}
