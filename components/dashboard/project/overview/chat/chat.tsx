"use client";

import { Messages } from "@/components/dashboard/project/overview/chat/messages";
import { MultimodalInput } from "@/components/dashboard/project/overview/chat/multimodal-input";
import type { Vote } from "@/db/schema/vote";
import { fetcher, generateUUID } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import type { Attachment, UIMessage } from "ai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

export function Chat({
	id,
	initialMessages,
	selectedChatModel,
	workspaceId,
	projectId,
	projectDescription,
}: {
	id: string;
	initialMessages: Array<UIMessage>;
	selectedChatModel: string;
	workspaceId: string;
	projectId: string;
	projectDescription: string;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const persona = useMemo(() => searchParams.get("persona"), [searchParams]);

	const {
		messages,
		setMessages,
		handleSubmit,
		input,
		setInput,
		status,
		stop,
		reload,
		append,
	} = useChat({
		id,
		body: { id, selectedChatModel: selectedChatModel, workspaceId, projectId },
		initialMessages,
		experimental_throttle: 100,
		sendExtraMessageFields: true,
		generateId: generateUUID,
		onFinish: () => {
			router.refresh();
		},
		onError: (error) => {
			console.error(error);
			toast.error(error.message);
		},
	});

	const { data: votes } = useSWR<Array<Vote>>(
		messages.length >= 2 ? `/api/vote?chatId=${id}` : null,
		fetcher,
	);

	const [attachments, setAttachments] = useState<Array<Attachment>>([]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (persona) {
			append({
				id: generateUUID(),
				role: "user",
				content: `Create a persona.

Here is the project description: \n
${projectDescription}`,
			});

			// remove the persona query param
			router.replace(
				`/dashboard/${workspaceId}/${projectId}/overview/personas`,
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [persona]);

	return (
		<>
			<div className="flex h-full flex-col min-w-0 bg-background max-h-[calc(100vh-7rem)]">
				{/* <ChatHeader chatId={id} selectedModelId={selectedChatModel} /> */}

				<Messages
					chatId={id}
					status={status}
					votes={votes}
					messages={messages}
					setMessages={setMessages}
					reload={reload}
				/>

				<form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
					<MultimodalInput
						input={input}
						setInput={setInput}
						handleSubmit={handleSubmit}
						status={status}
						stop={stop}
						attachments={attachments}
						setAttachments={setAttachments}
						setMessages={setMessages}
					/>
				</form>
			</div>
		</>
	);
}
