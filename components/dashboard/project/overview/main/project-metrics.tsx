import { Card, CardContent } from "@/components/ui/card";

import {
	ClipboardCheckIcon,
	LightbulbIcon,
	MessageSquareIcon,
} from "lucide-react";

export function ProjectMetrics() {
	// Note: Replace with actual metrics when available
	const hypothesesCount = 0;
	const verifiedMvpsCount = 0;
	const feedbackCount = 0;

	return (
		<div className="grid grid-cols-3 gap-4">
			<Card className="p-6 border-0 shadow-sm">
				<CardContent className="p-0 flex">
					<div className="mr-6">
						<div className="w-20 h-20 rounded-full bg-info/10 flex items-center justify-center">
							<LightbulbIcon className="h-8 w-8 text-info" />
						</div>
					</div>
					<div>
						<div className="text-4xl font-bold text-muted-foreground">
							{hypothesesCount}
						</div>
						<div className="text-muted-foreground mt-1">Hypotheses</div>
					</div>
				</CardContent>
			</Card>

			<Card className="p-6 border-0 shadow-sm">
				<CardContent className="p-0 flex">
					<div className="mr-6">
						<div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
							<ClipboardCheckIcon className="h-8 w-8 text-success" />
						</div>
					</div>
					<div>
						<div className="text-4xl font-bold text-muted-foreground">
							{verifiedMvpsCount}
						</div>
						<div className="text-muted-foreground mt-1">Verified MVPs</div>
					</div>
				</CardContent>
			</Card>

			<Card className="p-6 border-0 shadow-sm">
				<CardContent className="p-0 flex">
					<div className="mr-6">
						<div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center">
							<MessageSquareIcon className="h-8 w-8 text-warning" />
						</div>
					</div>
					<div>
						<div className="text-4xl font-bold text-muted-foreground">
							{feedbackCount}
						</div>
						<div className="text-muted-foreground mt-1">Feedback</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
