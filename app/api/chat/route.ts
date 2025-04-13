import { generateTitleFromUserMessage } from "@/app/actions/chat";
import {
	deleteChatById,
	getChatById,
	saveChat,
	saveMessages,
} from "@/db/queries";
import { systemPrompt } from "@/lib/ai/prompts";
import { myProvider } from "@/lib/ai/providers";
// import { createDocument } from "@/lib/ai/tools/create-document";
// import { getWeather } from "@/lib/ai/tools/get-weather";
// import { requestSuggestions } from "@/lib/ai/tools/request-suggestions";
// import { updateDocument } from "@/lib/ai/tools/update-document";

import {
	generateUUID,
	getMostRecentUserMessage,
	getTrailingMessageId,
} from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

import {
	type UIMessage,
	appendResponseMessages,
	createDataStreamResponse,
	smoothStream,
	streamText,
} from "ai";

export const maxDuration = 60;

export async function POST(request: Request) {
	try {
		const {
			id,
			messages,
			selectedChatModel,
			workspaceId,
			projectId,
		}: {
			id: string;
			messages: Array<UIMessage>;
			selectedChatModel: string;
			workspaceId: string;
			projectId: string;
		} = await request.json();

		const user = await currentUser();

		console.log("workspaceId", workspaceId);
		console.log("projectId", projectId);

		if (!user) {
			return new Response("Unauthorized", { status: 401 });
		}

		const userMessage = getMostRecentUserMessage(messages);

		if (!userMessage) {
			return new Response("No user message found", { status: 400 });
		}

		const chat = await getChatById({ id });

		if (!chat) {
			console.log("generating title");
			const title = await generateTitleFromUserMessage({
				message: userMessage,
			});

			console.log("saving chat");

			await saveChat({
				id,
				userId: user.id,
				title,
				workspaceId: Number(workspaceId),
				projectId: Number(projectId),
			});

			console.log("chat saved");
		} else {
			if (chat.userId !== user.id) {
				return new Response("Unauthorized", { status: 401 });
			}
		}

		console.log("saving messages");

		await saveMessages({
			messages: [
				{
					chatId: id,
					id: userMessage.id,
					role: "user",
					parts: userMessage.parts,
					attachments: userMessage.experimental_attachments ?? [],
					createdAt: new Date(),
				},
			],
		});

		console.log("messages saved");

		return createDataStreamResponse({
			execute: (dataStream) => {
				const result = streamText({
					model: myProvider.languageModel(selectedChatModel),
					system: systemPrompt(),
					messages,
					maxSteps: 5,
					// experimental_activeTools:
					// 	selectedChatModel === "chat-model-reasoning"
					// 		? []
					// 		: [
					// 				"getWeather",
					// 				"createDocument",
					// 				"updateDocument",
					// 				"requestSuggestions",
					// 			],
					experimental_transform: smoothStream({ chunking: "word" }),
					experimental_generateMessageId: generateUUID,
					// tools: {
					// 	getWeather,
					// 	createDocument: createDocument({ user, dataStream }),
					// 	updateDocument: updateDocument({ user, dataStream }),
					// 	requestSuggestions: requestSuggestions({
					// 		user,
					// 		dataStream,
					// 	}),
					// },
					onFinish: async ({ response }) => {
						if (user.id) {
							try {
								const assistantId = getTrailingMessageId({
									messages: response.messages.filter(
										(message) => message.role === "assistant",
									),
								});

								if (!assistantId) {
									throw new Error("No assistant message found!");
								}

								const [, assistantMessage] = appendResponseMessages({
									messages: [userMessage],
									responseMessages: response.messages,
								});

								await saveMessages({
									messages: [
										{
											id: assistantId,
											chatId: id,
											role: assistantMessage.role,
											parts: assistantMessage.parts,
											attachments:
												assistantMessage.experimental_attachments ?? [],
											createdAt: new Date(),
										},
									],
								});
							} catch (error) {
								console.error("Failed to save chat", error);
							}
						}
					},
					experimental_telemetry: {
						isEnabled: false,
						functionId: "stream-text",
					},
				});

				result.consumeStream();

				result.mergeIntoDataStream(dataStream, {
					sendReasoning: true,
				});
			},
			onError: () => {
				return "Oops, an error occurred!";
			},
		});
	} catch (error) {
		console.error("Failed to process chat", error);
		return new Response("An error occurred while processing your request!", {
			status: 404,
		});
	}
}

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	if (!id) {
		return new Response("Not Found", { status: 404 });
	}

	const user = await currentUser();

	if (!user) {
		return new Response("Unauthorized", { status: 401 });
	}

	try {
		const chat = await getChatById({ id });

		if (chat.userId !== user.id) {
			return new Response("Unauthorized", { status: 401 });
		}

		await deleteChatById({ id });

		return new Response("Chat deleted", { status: 200 });
	} catch (error) {
		console.error("Failed to delete chat", error);
		return new Response("An error occurred while processing your request!", {
			status: 500,
		});
	}
}
