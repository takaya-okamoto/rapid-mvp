import { google } from "@ai-sdk/google";

import {
	customProvider,
	extractReasoningMiddleware,
	wrapLanguageModel,
} from "ai";

export const myProvider = customProvider({
	languageModels: {
		"chat-model": google("gemini-2.0-flash-001"),
		"chat-model-reasoning": wrapLanguageModel({
			model: google("gemini-2.5-pro-exp-03-25"),
			middleware: extractReasoningMiddleware({ tagName: "think" }),
		}),
		"title-model": google("gemini-2.0-flash-001"),
	},
});
