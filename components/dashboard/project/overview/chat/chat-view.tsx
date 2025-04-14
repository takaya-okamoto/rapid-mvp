import { Chat } from "@/components/dashboard/project/overview/chat/chat";
import { Skeleton } from "@/components/ui/skeleton";
import { getMessagesByChatId, getProject } from "@/db/queries";
import type { DBMessage } from "@/db/schema/message";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import type { Attachment, UIMessage } from "ai";
import { Suspense } from "react";

type ChatViewProps = {
	chatId: string;
	workspaceId: string;
	projectId: string;
};

export function ChatView({ chatId, workspaceId, projectId }: ChatViewProps) {
	return (
		<Suspense fallback={<ChatSkeleton />}>
			<ChatContent
				chatId={chatId}
				workspaceId={workspaceId}
				projectId={projectId}
			/>
		</Suspense>
	);
}

async function ChatContent({
	chatId,
	workspaceId,
	projectId,
}: { chatId: string; workspaceId: string; projectId: string }) {
	const [messagesFromDb, project] = await Promise.all([
		getMessagesByChatId({
			id: chatId,
		}),
		getProject({
			id: projectId,
		}),
	]);

	const uiMessages = convertToUIMessages(messagesFromDb);

	const hasUiMessages = uiMessages.length > 0;

	return (
		<Chat
			key={chatId}
			id={chatId}
			initialMessages={hasUiMessages ? uiMessages : []}
			selectedChatModel={DEFAULT_CHAT_MODEL}
			workspaceId={workspaceId}
			projectId={projectId}
			projectDescription={project?.description ?? ""}
		/>
	);
}

function convertToUIMessages(messages: Array<DBMessage>): Array<UIMessage> {
	return messages.map((message) => ({
		id: message.id,
		parts: message.parts as UIMessage["parts"],
		role: message.role as UIMessage["role"],
		// Note: content will soon be deprecated in @ai-sdk/react
		content: "",
		createdAt: message.createdAt,
		experimental_attachments: (message.attachments as Array<Attachment>) ?? [],
	}));
}

function ChatSkeleton() {
	return (
		<div className="flex h-full flex-col min-w-0 bg-background max-h-[calc(100vh-7rem)]">
			{/* Messages area */}
			<div className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4 max-h-[calc(100vh-13rem)]">
				{/* User message */}
				<div className="w-full mx-auto max-w-3xl px-4">
					<div className="flex gap-4 w-full ml-auto max-w-2xl w-fit justify-end">
						<div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
							<Skeleton className="h-4 w-32 mb-2" />
							<Skeleton className="h-4 w-56" />
						</div>
					</div>
				</div>

				{/* AI response */}
				<div className="w-full mx-auto max-w-3xl px-4">
					<div className="flex gap-4 w-full">
						<div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background">
							<Skeleton className="h-4 w-4 rounded-full" />
						</div>
						<div className="bg-muted rounded-lg p-3 max-w-[80%]">
							<Skeleton className="h-4 w-48 mb-2" />
							<Skeleton className="h-4 w-64 mb-2" />
							<Skeleton className="h-4 w-40" />
						</div>
					</div>
				</div>

				{/* Thinking message */}
				<div className="w-full mx-auto max-w-3xl px-4">
					<div className="flex gap-4 w-full">
						<div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background">
							<Skeleton className="h-4 w-4 rounded-full" />
						</div>
						<div className="bg-muted rounded-lg p-3">
							<div className="flex space-x-2">
								<Skeleton className="h-3 w-3 rounded-full" />
								<Skeleton className="h-3 w-3 rounded-full" />
								<Skeleton className="h-3 w-3 rounded-full" />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Input area */}
			<form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
				<div className="relative w-full flex flex-col gap-4">
					<Skeleton className="min-h-[24px] h-24 overflow-hidden rounded-2xl bg-muted pb-10" />

					{/* Input buttons */}
					<div className="absolute bottom-0 p-2 w-fit flex flex-row justify-start">
						<Skeleton className="h-8 w-8 rounded-full" />
					</div>

					<div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">
						<Skeleton className="h-8 w-8 rounded-full" />
					</div>
				</div>
			</form>
		</div>
	);
}
