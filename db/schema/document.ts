import {
	pgTable,
	primaryKey,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

import type { InferSelectModel } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";
import { user } from "./user";

export const document = pgTable(
	"Document",
	{
		id: uuid("id").notNull().defaultRandom(),
		createdAt: timestamp("createdAt").notNull(),
		title: text("title").notNull(),
		content: text("content"),
		kind: varchar("text", { enum: ["text", "code", "image", "sheet"] })
			.notNull()
			.default("text"),
		userId: varchar("userId")
			.notNull()
			.references(() => user.id),
	},
	(table) => [primaryKey({ columns: [table.id, table.createdAt] })],
);

export type Document = InferSelectModel<typeof document>;
