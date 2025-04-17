import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { problem } from "./problem";

export const hypothesis = pgTable("hypothesis", {
	id: uuid("id").primaryKey().notNull().defaultRandom(),
	problemId: uuid("problem_id")
		.notNull()
		.references(() => problem.id),
	hypothesis: text("hypothesis").notNull(),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
