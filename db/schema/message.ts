import { json, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import type { InferSelectModel } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";

import { chat } from "./chat";

export const message = pgTable("Message_v2", {
	id: uuid("id").primaryKey().notNull().defaultRandom(),
	chatId: varchar("chatId")
		.notNull()
		.references(() => chat.id),
	role: varchar("role").notNull(),
	parts: json("parts").notNull(),
	attachments: json("attachments").notNull(),
	createdAt: timestamp("createdAt").notNull(),
});

export type DBMessage = InferSelectModel<typeof message>;
