import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { problem } from "./problem";

export const hypothesis = pgTable("hypothesis", {
	id: serial("id").primaryKey(),
	problemId: integer("problem_id")
		.notNull()
		.references(() => problem.id),
	hypothesis: text("hypothesis").notNull(),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Hypothesis = typeof hypothesis.$inferSelect;
export type NewHypothesis = typeof hypothesis.$inferInsert;
