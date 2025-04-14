import { ChatView } from "@/components/dashboard/project/overview/chat/chat-view";
import { StepView } from "@/components/dashboard/project/overview/steps/step-view";
import { Separator } from "@/components/ui/separator";

type OverviewLayoutProps = {
	children: React.ReactNode;
	params: Promise<{
		projectId: string;
		workspaceId: string;
	}>;
};

export default async function OverviewLayout({
	children,
	params,
}: OverviewLayoutProps) {
	const { projectId, workspaceId } = await params;

	const chatId = `${workspaceId}-${projectId}`;

	return (
		<div className="flex flex-1 w-full">
			<div className="w-1/6">
				<StepView />
			</div>

			<Separator orientation="vertical" />

			<div className="w-2/3 max-h-[calc(100vh-7rem)] overflow-y-auto">
				{children}
			</div>

			<Separator orientation="vertical" />

			<div className="w-1/3">
				<ChatView
					chatId={chatId}
					workspaceId={workspaceId}
					projectId={projectId}
				/>
			</div>
		</div>
	);
}
