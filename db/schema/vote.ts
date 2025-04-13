import { boolean, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";

import type { InferSelectModel } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";
import { chat } from "./chat";
import { message } from "./message";

export const vote = pgTable(
	"Vote_v2",
	{
		chatId: varchar("chatId")
			.notNull()
			.references(() => chat.id),
		messageId: uuid("messageId")
			.notNull()
			.references(() => message.id),
		isUpvoted: boolean("isUpvoted").notNull(),
	},
	(table) => [primaryKey({ columns: [table.chatId, table.messageId] })],
);

export type Vote = InferSelectModel<typeof vote>;
