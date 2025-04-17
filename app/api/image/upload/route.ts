import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
	const formData = await request.formData();
	const file = formData.get("file") as File;
	const mvpName = (formData.get("mvpName") as string) || "mvp-image";

	if (!file) {
		return NextResponse.json(
			{ error: "No file found in the request" },
			{ status: 400 },
		);
	}

	const blob = await put(`mvp-images/${mvpName}-${Date.now()}.jpg`, file, {
		access: "public",
		addRandomSuffix: true,
	});

	return NextResponse.json(blob);
}
