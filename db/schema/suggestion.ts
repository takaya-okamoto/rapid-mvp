import type { InferSelectModel } from "drizzle-orm";
import {
	boolean,
	foreignKey,
	pgTable,
	primaryKey,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { document } from "./document";
import { user } from "./user";

export const suggestion = pgTable(
	"Suggestion",
	{
		id: uuid("id").notNull().defaultRandom(),
		documentId: uuid("documentId").notNull(),
		documentCreatedAt: timestamp("documentCreatedAt").notNull(),
		originalText: text("originalText").notNull(),
		suggestedText: text("suggestedText").notNull(),
		description: text("description"),
		isResolved: boolean("isResolved").notNull().default(false),
		userId: varchar("userId")
			.notNull()
			.references(() => user.id),
		createdAt: timestamp("createdAt").notNull(),
	},
	(table) => [
		primaryKey({ columns: [table.id] }),
		foreignKey({
			columns: [table.documentId, table.documentCreatedAt],
			foreignColumns: [document.id, document.createdAt],
		}),
	],
);

export type Suggestion = InferSelectModel<typeof suggestion>;
