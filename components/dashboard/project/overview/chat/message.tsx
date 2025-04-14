"use client";

// import { DocumentToolCall, DocumentToolResult } from "./document";
// import { DocumentPreview } from "./document-preview";
import { Markdown } from "@/components/dashboard/project/overview/chat/markdown";
import { MessageActions } from "@/components/dashboard/project/overview/chat/message-actions";
import { MessageEditor } from "@/components/dashboard/project/overview/chat/message-editor";
import { MessageReasoning } from "@/components/dashboard/project/overview/chat/message-reasoning";
import { PreviewAttachment } from "@/components/dashboard/project/overview/chat/preview-attachment";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Vote } from "@/db/schema/vote";
import { cn } from "@/lib/utils";
import type { UseChatHelpers } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import cx from "classnames";
import equal from "fast-deep-equal";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, SparklesIcon } from "lucide-react";
import { memo, useState } from "react";
import { ProjectToolComponent } from "./tool/project-tool-component";

const PurePreviewMessage = ({
	chatId,
	message,
	vote,
	isLoading,
	setMessages,
	reload,
}: {
	chatId: string;
	message: UIMessage;
	vote: Vote | undefined;
	isLoading: boolean;
	setMessages: UseChatHelpers["setMessages"];
	reload: UseChatHelpers["reload"];
}) => {
	const [mode, setMode] = useState<"view" | "edit">("view");

	return (
		<AnimatePresence>
			<motion.div
				data-testid={`message-${message.role}`}
				className="w-full mx-auto max-w-3xl px-4 group/message"
				initial={{ y: 5, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				data-role={message.role}
			>
				<div
					className={cn(
						"flex gap-4 w-full group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl",
						{
							"w-full": mode === "edit",
							"group-data-[role=user]/message:w-fit": mode !== "edit",
						},
					)}
				>
					{message.role === "assistant" && (
						<div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background">
							<div className="translate-y-px">
								<SparklesIcon size={14} />
							</div>
						</div>
					)}

					<div className="flex flex-col gap-4 w-full">
						{message.experimental_attachments && (
							<div
								data-testid="message-attachments"
								className="flex flex-row justify-end gap-2"
							>
								{message.experimental_attachments.map((attachment) => (
									<PreviewAttachment
										key={attachment.url}
										attachment={attachment}
									/>
								))}
							</div>
						)}

						{message.parts?.map((part, index) => {
							const { type } = part;
							const key = `message-${message.id}-part-${index}`;

							if (type === "reasoning") {
								return (
									<MessageReasoning
										key={key}
										isLoading={isLoading}
										reasoning={part.reasoning}
									/>
								);
							}

							if (type === "text") {
								if (mode === "view") {
									return (
										<div key={key} className="flex flex-row gap-2 items-start">
											{message.role === "user" && (
												<Tooltip>
													<TooltipTrigger asChild>
														<Button
															data-testid="message-edit-button"
															variant="ghost"
															className="px-2 h-fit rounded-full text-muted-foreground opacity-0 group-hover/message:opacity-100"
															onClick={() => {
																setMode("edit");
															}}
														>
															<Pencil />
														</Button>
													</TooltipTrigger>
													<TooltipContent>Edit message</TooltipContent>
												</Tooltip>
											)}

											<div
												data-testid="message-content"
												className={cn("flex flex-col gap-4", {
													"bg-main/20 text-accent-foreground px-3 py-2 rounded-xl":
														message.role === "user",
												})}
											>
												<Markdown>{part.text}</Markdown>
											</div>
										</div>
									);
								}

								if (mode === "edit") {
									return (
										<div key={key} className="flex flex-row gap-2 items-start">
											<div className="size-8" />

											<MessageEditor
												key={message.id}
												message={message}
												setMode={setMode}
												setMessages={setMessages}
												reload={reload}
											/>
										</div>
									);
								}
							}

							if (type === "tool-invocation") {
								const { toolInvocation } = part;
								const { toolName, toolCallId, state } = toolInvocation;

								if (state === "call") {
									const { args } = toolInvocation;
									console.log({ args });

									return (
										<div
											key={toolCallId}
											className={cx({
												skeleton: [
													"updateProject",
													"mutatePersonaTool",
												].includes(toolName),
											})}
										>
											{toolName === "updateProjectTool" ? (
												<ProjectToolComponent />
											) : toolName === "mutatePersonaTool" ? (
												// <PersonaToolComponent />
												<div>PersonaToolComponent</div>
											) : null}
										</div>
									);
								}

								if (state === "result") {
									const { result } = toolInvocation;

									return (
										<div key={toolCallId}>
											{toolName === "updateProjectTool" ? (
												<ProjectToolComponent
													name={result.name}
													description={result.description}
												/>
											) : toolName === "mutatePersonaTool" ? (
												<div>PersonaToolComponent</div>
											) : null}
										</div>
									);
								}
							}
						})}

						<MessageActions
							key={`action-${message.id}`}
							chatId={chatId}
							message={message}
							vote={vote}
							isLoading={isLoading}
						/>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export const PreviewMessage = memo(
	PurePreviewMessage,
	(prevProps, nextProps) => {
		if (prevProps.isLoading !== nextProps.isLoading) return false;
		if (prevProps.message.id !== nextProps.message.id) return false;
		if (!equal(prevProps.message.parts, nextProps.message.parts)) return false;
		if (!equal(prevProps.vote, nextProps.vote)) return false;

		return true;
	},
);

export const ThinkingMessage = () => {
	const role = "assistant";

	return (
		<motion.div
			data-testid="message-assistant-loading"
			className="w-full mx-auto max-w-3xl px-4 group/message "
			initial={{ y: 5, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
			data-role={role}
		>
			<div
				className={cx(
					"flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl",
					{
						"group-data-[role=user]/message:bg-muted": true,
					},
				)}
			>
				<div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
					<SparklesIcon size={14} />
				</div>

				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-col gap-4 text-muted-foreground">
						Hmm...
					</div>
				</div>
			</div>
		</motion.div>
	);
};
