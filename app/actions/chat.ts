"use server";

import { type Message, generateText } from "ai";
import { cookies } from "next/headers";

import {
	deleteMessagesByChatIdAfterTimestamp,
	getMessageById,
} from "@/db/queries";
import { myProvider } from "@/lib/ai/providers";

export async function saveChatModelAsCookie(model: string) {
	const cookieStore = await cookies();
	cookieStore.set("chat-model", model);
}

export async function generateTitleFromUserMessage({
	message,
}: {
	message: Message;
}) {
	const { text: title } = await generateText({
		model: myProvider.languageModel("title-model"),
		system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
		prompt: JSON.stringify(message),
	});

	return title;
}

export async function deleteTrailingMessages({ id }: { id: string }) {
	const [message] = await getMessageById({ id });

	await deleteMessagesByChatIdAfterTimestamp({
		chatId: message.chatId,
		timestamp: message.createdAt,
	});
}
