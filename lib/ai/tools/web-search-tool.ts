import { tool } from "ai";
import { z } from "zod";

// Define types for Tavily API responses
interface TavilySearchResult {
	title: string;
	url: string;
	content: string;
	score: number;
	raw_content: string | null;
}

interface TavilySearchResponse {
	query: string;
	answer: string;
	results: TavilySearchResult[];
	response_time: string;
	images?: Array<{ url: string; description?: string }>;
}

// Default fallback response when errors occur
const fallbackResponse = {
	results: [],
	answer:
		"検索結果を取得できませんでした。しばらく経ってからもう一度お試しください。",
};

// Tavily search implementation using tool and zod
export const webSearchTool = tool({
	description:
		"Search the web for real-time information about any topic. Use this tool when you need up-to-date information that might not be available in your training data, or when you need to verify current facts. The search results will include relevant snippets and URLs from web pages. This is particularly useful for questions about current events, technology updates, or any topic that requires recent information.",
	parameters: z.object({
		search_term: z
			.string()
			.describe(
				"The search term to look up on the web. Be specific and include relevant keywords for better results. For technical queries, include version numbers or dates if relevant.",
			),
	}),
	execute: async ({ search_term }) => {
		try {
			const apiKey = process.env.TAVILY_API_KEY;

			if (!apiKey) {
				console.error("TAVILY_API_KEY is not defined in environment variables");
				return fallbackResponse;
			}

			// Set a timeout for the fetch request
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

			try {
				const response = await fetch("https://api.tavily.com/search", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${apiKey}`,
					},
					body: JSON.stringify({
						query: search_term,
						search_depth: "advanced",
						include_answer: true,
						max_results: 5,
						include_domains: [],
						exclude_domains: [],
					}),
					signal: controller.signal,
				});

				clearTimeout(timeoutId);

				if (!response.ok) {
					const errorText = await response.text();
					console.error(`Tavily API error: ${response.status} - ${errorText}`);
					return fallbackResponse;
				}

				const data = await response.json();

				// Ensure we have a valid TavilySearchResponse
				if (!data || typeof data !== "object") {
					console.error("Invalid API response format", data);
					return fallbackResponse;
				}

				const tavilyResponse = data as TavilySearchResponse;

				const results = Array.isArray(tavilyResponse.results)
					? tavilyResponse.results.map((result) => ({
							title: result.title || "No title",
							url: result.url || "",
							content: result.content || "No content available",
						}))
					: [];

				const answer =
					typeof tavilyResponse.answer === "string"
						? tavilyResponse.answer
						: `No direct answer available for: ${search_term}`;

				return {
					results,
					answer,
				};
			} catch (fetchError) {
				clearTimeout(timeoutId);
				console.error("Fetch error in web search tool:", fetchError);
				return fallbackResponse;
			}
		} catch (outerError) {
			// Catch any other errors that might occur
			console.error("Unexpected error in web search tool:", outerError);
			return fallbackResponse;
		}
	},
});
