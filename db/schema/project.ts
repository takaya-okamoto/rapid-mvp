import { sql } from "drizzle-orm";
import {
	index,
	integer,
	pgPolicy,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { workspace } from "./workspace";

// projects テーブルの定義
export const project = pgTable(
	"project",
	{
		id: serial("id").primaryKey(),

		// ワークスペースのID
		workspaceId: integer("workspace_id")
			.notNull()
			.references(() => workspace.id, { onDelete: "cascade" }),

		// プロジェクトの名前
		name: varchar("name", { length: 255 }).notNull(),

		// プロジェクトの説明
		description: text("description"),

		// プロジェクトの作成日時
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),

		// プロジェクトの更新日時
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		index("workspace_id_idx").on(table.workspaceId),
		// そのワークスペースのメンバーのみがプロジェクトを閲覧できる
		pgPolicy("project_select_policy", {
			for: "select",
			using: sql`EXISTS (
        SELECT 1 FROM workspace_user
        WHERE workspace_user.workspace_id = project.workspace_id
        AND workspace_user.user_id = auth.uid()
      )`,
		}),
		// そのワークスペースの管理者のみがプロジェクトを更新できる
		pgPolicy("project_update_policy", {
			for: "update",
			using: sql`EXISTS (
        SELECT 1 FROM workspace_user
        WHERE workspace_user.workspace_id = project.workspace_id
        AND workspace_user.user_id = auth.uid()
        AND workspace_user.role = 'ADMIN'
      )`,
		}),
		// そのワークスペースの管理者のみがプロジェクトを削除できる
		pgPolicy("project_delete_policy", {
			for: "delete",
			using: sql`EXISTS (
        SELECT 1 FROM workspace_user
        WHERE workspace_user.workspace_id = project.workspace_id
        AND workspace_user.user_id = auth.uid()
        AND workspace_user.role = 'ADMIN'
      )`,
		}),
		// そのワークスペースの管理者のみがプロジェクトを作成できる
		pgPolicy("project_insert_policy", {
			for: "insert",
			withCheck: sql`EXISTS (
        SELECT 1 FROM workspace_user
        WHERE workspace_user.workspace_id = project.workspace_id
        AND workspace_user.user_id = auth.uid()
        AND workspace_user.role = 'ADMIN'
      )`,
		}),
	],
);
