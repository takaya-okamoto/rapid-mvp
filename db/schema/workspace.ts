import { relations, sql } from "drizzle-orm";
import {
	pgPolicy,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { workspaceUser } from "./workspace-user";

// workspaces テーブルの定義
export const workspace = pgTable(
	"workspace",
	{
		id: serial("id").primaryKey(),

		// ワークスペースの名前
		name: varchar("name", { length: 255 }).notNull(),

		// ワークスペースの説明
		description: text("description"),

		// ワークスペースの作成日時
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),

		// ワークスペースの更新日時
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	() => [
		// メンバーのみがワークスペースを閲覧できる
		pgPolicy("workspace_select_policy", {
			for: "select",
			using: sql`EXISTS (
      SELECT 1 FROM workspace_user
      WHERE workspace_user.workspace_id = workspace.id
      AND workspace_user.user_id = auth.uid()
    )`,
		}),
		// 管理者のみがワークスペースを更新できる
		pgPolicy("workspace_update_policy", {
			for: "update",
			using: sql`EXISTS (
      SELECT 1 FROM workspace_user
      WHERE workspace_user.workspace_id = workspace.id
      AND workspace_user.user_id = auth.uid()
      AND workspace_user.role = 'ADMIN'
    )`,
		}),
		// 管理者のみがワークスペースを削除できる
		pgPolicy("workspace_delete_policy", {
			for: "delete",
			using: sql`EXISTS (
      SELECT 1 FROM workspace_user
      WHERE workspace_user.workspace_id = workspace.id
      AND workspace_user.user_id = auth.uid()
      AND workspace_user.role = 'ADMIN'
    )`,
		}),
	],
);

export const workspaceRelations = relations(workspace, ({ many }) => ({
	workspaceUsers: many(workspaceUser),
}));

export type NewWorkspace = typeof workspace.$inferInsert;
export type Workspace = typeof workspace.$inferSelect;
