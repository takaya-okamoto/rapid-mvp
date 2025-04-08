// import { auth } from "@clerk/nextjs/server";
// import { createUserMessage, deleteUserMessage } from "../../actions";
// import { db } from "../../db";

export default async function Home() {
	// const { userId } = await auth();
	// if (!userId) throw new Error("User not found");
	// const existingMessage = await db.query.UserMessages.findFirst({
	// 	where: (messages, { eq }) => eq(messages.user_id, userId),
	// });

	return (
		<main>
			<h1>Rapid MVP</h1>
			{/* {existingMessage ? (
				<div>
					<p>{existingMessage.message}</p>
					<form action={deleteUserMessage}>
						<button type="submit">Delete Message</button>
					</form>
				</div>
			) : (
				<form action={createUserMessage}>
					<input type="text" name="message" placeholder="Enter a message" />
					<button type="submit">Save Message</button>
				</form>
			)} */}
		</main>
	);
}
