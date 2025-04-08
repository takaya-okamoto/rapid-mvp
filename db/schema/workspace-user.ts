import {
	index,
	integer,
	pgTable,
	primaryKey,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { workspace } from "./workspace";

// workspace_users テーブルの定義（join テーブル）
export const workspaceUser = pgTable(
	"workspace_user",
	{
		// ユーザーのID
		userId: varchar("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),

		// ワークスペースのID
		workspaceId: integer("workspace_id")
			.notNull()
			.references(() => workspace.id, { onDelete: "cascade" }),

		// ロール(ADMIN or MEMBER)
		role: varchar("role", { length: 50 }),

		// 参加日時
		joinedAt: timestamp("joined_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		index("workspace_user_id_idx").on(table.userId),
		index("user_workspace_id_idx").on(table.workspaceId),
		primaryKey({ columns: [table.userId, table.workspaceId] }),
	],
);
