import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { problem } from "./problem";

export const mvp = pgTable("mvp", {
	id: serial("id").primaryKey(),
	problemId: integer("problem_id")
		.notNull()
		.references(() => problem.id, { onDelete: "cascade" }),

	// 画像のURL
	imageUrl: text("image_url"),

	// 名前
	name: text("name").notNull(),

	// 説明
	description: text("description").notNull(),

	// ハッシュタグ
	hashtags: text("hashtags"),

	// シナリオ
	scenario: text("scenario"),

	// 作成日時
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
