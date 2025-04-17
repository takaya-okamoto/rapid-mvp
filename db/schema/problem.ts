import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { project } from "./project";

export const problem = pgTable("problem", {
	id: serial("id").primaryKey(),
	projectId: integer("project_id")
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),

	problem: text("problem").notNull(),

	status: text("status").notNull(), // todo, in_progress, solved

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Problem = typeof problem.$inferSelect;
export type NewProblem = typeof problem.$inferInsert;
