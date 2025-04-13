import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

type NextStepButtonProps = {
	workspaceId: number;
	projectId: number;
};

export function NextStepButton({
	workspaceId,
	projectId,
}: NextStepButtonProps) {
	return (
		<Link href={`/dashboard/${workspaceId}/${projectId}/overview/personas`}>
			<Button
				className="bg-main hover:bg-main-dark text-main-foreground group relative overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg"
				size="lg"
			>
				<span className="flex items-center gap-2">
					Consider a persona.
					<ChevronRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
				</span>
				<span className="absolute bottom-0 left-0 h-1 w-0 bg-main-light group-hover:w-full transition-all duration-500" />
			</Button>
		</Link>
	);
}
