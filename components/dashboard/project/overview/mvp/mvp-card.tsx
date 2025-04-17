import type { MVP } from "@/app/actions/mvp";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Problem } from "@/db/schema/problem";
import { Box, ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type MVPCardProps = {
	mvp: MVP;
	problem: Problem;
	onDelete: () => void;
	disabled: boolean;
};

export function MVPCard({ mvp, problem, onDelete, disabled }: MVPCardProps) {
	const [imageError, setImageError] = useState(false);

	return (
		<Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
			<CardHeader className="p-4 pb-2">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Box className="h-4 w-4 text-indigo-600" />
						<CardTitle className="text-lg">{mvp.name}</CardTitle>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={onDelete}
						disabled={disabled}
						className="h-8 w-8 text-slate-500 hover:text-red-500"
					>
						<Trash2 className="h-4 w-4" />
						<span className="sr-only">Delete</span>
					</Button>
				</div>
				<CardDescription className="text-xs">
					Problem: {problem.problem}
				</CardDescription>
			</CardHeader>
			<CardContent className="p-4 pt-0">
				<div className="space-y-3">
					<div className="relative h-48 w-full overflow-hidden rounded-md bg-slate-100">
						{mvp.imageUrl && !imageError ? (
							<Image
								src={mvp.imageUrl}
								alt={mvp.name}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 50vw"
								onError={() => setImageError(true)}
								priority
							/>
						) : (
							<div className="flex h-full w-full flex-col items-center justify-center text-slate-400">
								<ImageIcon className="h-8 w-8" />
								<p className="mt-2 text-xs">
									{imageError
										? "画像を読み込めませんでした"
										: "画像がありません"}
								</p>
							</div>
						)}
					</div>

					<p className="text-sm text-slate-700">{mvp.description}</p>

					{mvp.hashtags && (
						<div className="flex flex-wrap gap-1.5">
							{mvp.hashtags
								.split(" ")
								.filter((tag) => tag.trim())
								.map((tag) => (
									<span
										key={tag}
										className="inline-flex rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
									>
										{tag}
									</span>
								))}
						</div>
					)}
				</div>
			</CardContent>
			{mvp.scenario && (
				<CardFooter className="border-t bg-slate-50 p-3">
					<div className="space-y-1 text-xs">
						<p className="font-medium text-slate-900">Scenario</p>
						<p className="text-slate-700">{mvp.scenario}</p>
					</div>
				</CardFooter>
			)}
		</Card>
	);
}
