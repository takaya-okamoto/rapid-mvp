import { fal } from "@fal-ai/client";

// Configure the fal client to use our proxy
fal.config({
	proxyUrl: "/api/fal/proxy",
});

interface GenerateImageOptions {
	prompt: string;
	mvpName: string;
}

type FalResult = Record<string, unknown>;

/**
 * Generates an Instagram-ready image using fal.ai
 * Returns the direct URL from fal.ai instead of uploading to Vercel Blob
 */
export async function generateMVPImage({
	prompt,
	mvpName,
}: GenerateImageOptions) {
	try {
		console.log("Starting image generation for:", mvpName);

		// Enhanced prompt for Instagram-ready images
		const enhancedPrompt = `Create a high-quality, professional marketing image for Instagram for a product called "${mvpName}". The product solves: ${prompt}. Make it visually appealing, modern, and suitable for social media. Use vibrant colors, clear composition, square format, high resolution, and professional lighting.`;

		console.log("Using prompt:", enhancedPrompt);

		// 最新のドキュメントに基づいて利用可能なモデルを順番に試す
		const possibleModels = [
			"fal-ai/flux/dev", // 高品質な画像生成に最適
			"fal-ai/recraft-v3", // ブランドスタイルに最適
			"fal-ai/stable-diffusion-v35-large", // 複雑なプロンプト理解に優れている
			"fal-ai/flux", // フォールバックオプション
		];

		let result: FalResult | null = null;
		let usedModel = "";
		let error = null;

		// 各モデルを順番に試し、最初に成功したものを使用
		for (const modelId of possibleModels) {
			try {
				console.log(`Trying model: ${modelId}...`);

				// モデルに応じた入力パラメータを設定
				let input = {};

				if (modelId.includes("flux")) {
					input = {
						prompt: enhancedPrompt,
						image_size: "square_hd",
					};
				} else if (modelId.includes("recraft")) {
					input = {
						prompt: enhancedPrompt,
						aspect_ratio: "1:1", // Instagramに適したアスペクト比
					};
				} else {
					input = {
						prompt: enhancedPrompt,
						width: 1024,
						height: 1024, // 正方形フォーマット
					};
				}

				result = (await fal.subscribe(modelId, {
					input,
					pollInterval: 1000,
					logs: true,
				})) as FalResult;

				usedModel = modelId;
				console.log(`Successfully called model: ${modelId}`);
				break; // 成功したらループを抜ける
			} catch (e) {
				console.error(`Error with model ${modelId}:`, e);
				error = e;
			}
		}

		if (!result) {
			console.error("All models failed");
			throw error || new Error("Failed to generate image with any model");
		}

		console.log(`API response received from ${usedModel}`);
		console.log("Response type:", typeof result);

		// レスポンスの構造をログ（大きな文字列は短縮）
		const safeResult = JSON.stringify(
			result,
			(key, value) => {
				if (typeof value === "string" && value.length > 100) {
					return `${value.substring(0, 100)}... [truncated]`;
				}
				return value;
			},
			2,
		);
		console.log("Response structure:", safeResult);

		// 型安全にアクセスするために、まずresultの構造を確認
		let imageUrl: string | undefined;

		// モデルごとのレスポンス構造に対応
		if (result) {
			console.log("Detailed result structure check...");

			// 新しいレスポンス構造: data.images[].url パターン
			if (
				"data" in result &&
				typeof result.data === "object" &&
				result.data &&
				"images" in result.data &&
				Array.isArray(result.data.images) &&
				result.data.images.length > 0
			) {
				const image = result.data.images[0] as Record<string, unknown>;
				if (image && typeof image.url === "string") {
					imageUrl = image.url;
					console.log("Found image URL in result.data.images[0].url");
				}
			}
			// flux/dev モデルのパターン (ドキュメントに記載のある主要な構造)
			else if (
				"images" in result &&
				Array.isArray(result.images) &&
				result.images.length > 0
			) {
				const image = result.images[0] as Record<string, unknown>;
				if (image && typeof image.url === "string") {
					imageUrl = image.url;
					console.log("Found image URL in result.images[0].url");
				}
			}
			// recraft または他のモデルのパターン
			else if ("image_url" in result && typeof result.image_url === "string") {
				imageUrl = result.image_url;
				console.log("Found image URL in result.image_url");
			}
			// stable-diffusion パターン
			else if (
				"output" in result &&
				typeof result.output === "object" &&
				result.output
			) {
				const output = result.output as Record<string, unknown>;
				if ("image" in output && typeof output.image === "string") {
					// Base64の場合
					console.log("Found base64 image in result.output.image");
					// TODO: Base64処理が必要な場合はここに実装
				}
			}
		}

		if (!imageUrl) {
			console.error("No valid image URL in the response");
			throw new Error("No valid image URL found in model response");
		}

		console.log("Image URL found:", imageUrl);

		// 画像URLを直接返す（Vercel Blobへのアップロードは行わない）
		return imageUrl;
	} catch (error) {
		console.error("Error details in generateMVPImage:", error);

		// Additional context for debugging
		if (error instanceof Error) {
			console.error("Error name:", error.name);
			console.error("Error message:", error.message);
			console.error("Error stack:", error.stack);
		}

		throw error;
	}
}
