import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

// users テーブルの定義
export const user = pgTable("user", {
	// ユーザーのID (ClerkのuserIdと同じ)
	id: varchar("id").primaryKey(),

	// first name
	firstName: varchar("first_name", { length: 255 }).notNull(),

	// last name
	lastName: varchar("last_name", { length: 255 }).notNull(),

	// ユーザーのプロフィール画像
	profileImage: varchar("profile_image", { length: 255 }).notNull(),

	// ユーザーのメールアドレス
	email: varchar("email", { length: 255 }).notNull(),

	// ユーザーの作成日時
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),

	// ユーザーの更新日時
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
