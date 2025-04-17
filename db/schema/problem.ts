import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { project } from "./project";

export const problem = pgTable("problem", {
	id: uuid("id").primaryKey().notNull().defaultRandom(),
	projectId: uuid("project_id")
		.notNull()
		.references(() => project.id),
	problem: text("problem").notNull(),

	status: text("status").notNull(), // todo, in_progress, solved

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
