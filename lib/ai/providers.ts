import { openai } from "@ai-sdk/openai";

import {
	customProvider,
	extractReasoningMiddleware,
	wrapLanguageModel,
} from "ai";

export const myProvider = customProvider({
	languageModels: {
		// openai
		"chat-model": openai("gpt-4o-mini"),
		"chat-model-reasoning": wrapLanguageModel({
			model: openai("gpt-4o-mini"),
			middleware: extractReasoningMiddleware({ tagName: "think" }),
		}),
		"title-model": openai("gpt-4o-mini"),

		// google
		// "chat-model": google("gemini-2.0-flash-001"),
		// "chat-model-reasoning": wrapLanguageModel({
		// 	model: google("gemini-2.5-pro-exp-03-25"),
		// 	middleware: extractReasoningMiddleware({ tagName: "think" }),
		// }),
		// "title-model": google("gemini-2.0-flash-001"),
	},
});
