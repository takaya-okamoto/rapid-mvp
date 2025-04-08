import { db } from "@/db";
import type { NewUser } from "@/db/schema/user";
import { user } from "@/db/schema/user";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Webhook } from "svix";

export async function POST(req: Request) {
	console.log("Webhook received");
	const SIGNING_SECRET = process.env.SIGNING_SECRET;

	if (!SIGNING_SECRET) {
		throw new Error(
			"Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env",
		);
	}

	// Create new Svix instance with secret
	const wh = new Webhook(SIGNING_SECRET);

	console.log("authenticated");

	// Get headers
	const headerPayload = req.headers;

	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		console.log("Error: Missing Svix headers");
		return new Response("Error: Missing Svix headers", {
			status: 400,
		});
	}

	console.log("headers verified");

	// Get body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	let evt: WebhookEvent;

	// Verify payload with headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error: Could not verify webhook:", err);
		return new Response("Error: Verification error", {
			status: 400,
		});
	}

	console.log("payload verified");

	if (evt.type === "user.created") {
		try {
			console.log("userId:", evt.data.id);

			const newUser: NewUser = {
				id: evt.data.id,
				email: evt.data.email_addresses[0].email_address,
				firstName: evt.data.first_name ?? "",
				lastName: evt.data.last_name ?? "",
				profileImage: evt.data.image_url ?? "",
			};

			const userResult = await db.insert(user).values(newUser).returning();
			console.log("userResult", userResult);
		} catch (error) {
			console.error("Error: Could not create user:", error);
		}
	}

	if (evt.type === "user.updated") {
		try {
			const updatedUser: NewUser = {
				id: evt.data.id,
				email: evt.data.email_addresses[0].email_address,
				firstName: evt.data.first_name ?? "",
				lastName: evt.data.last_name ?? "",
				profileImage: evt.data.image_url ?? "",
			};

			await db.update(user).set(updatedUser).where(eq(user.id, evt.data.id));
		} catch (error) {
			console.error("Error: Could not update user:", error);
		}
	}

	if (evt.type === "user.deleted") {
		try {
			await db.delete(user).where(eq(user.id, evt.data.id as string));
		} catch (error) {
			console.error("Error: Could not delete user:", error);
		}
	}

	console.log("Webhook processed");

	return new Response("Webhook received", { status: 200 });
}
