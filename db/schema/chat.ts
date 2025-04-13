import {
	integer,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

import type { InferSelectModel } from "drizzle-orm";
import { project } from "./project";
import { user } from "./user";
import { workspace } from "./workspace";

export const chat = pgTable("Chat", {
	id: varchar("id").primaryKey().notNull(),
	workspaceId: integer("workspaceId")
		.notNull()
		.references(() => workspace.id, { onDelete: "cascade" }),
	projectId: integer("projectId")
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	createdAt: timestamp("createdAt").notNull(),
	title: text("title").notNull(),
	userId: varchar("userId")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export type Chat = InferSelectModel<typeof chat>;
