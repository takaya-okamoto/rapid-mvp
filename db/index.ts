import { neon } from "@neondatabase/serverless";
import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/neon-http";
import { project } from "./schema/project";
import { user } from "./schema/user";
import { workspace, workspaceRelations } from "./schema/workspace";
import { workspaceUser, workspaceUserRelations } from "./schema/workspace-user";

loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL must be a Neon postgres connection string");
}

const sql = neon(process.env.DATABASE_URL);

// リレーションを含めたスキーマを定義
const schema = {
	user,
	project,
	workspace,
	workspaceUser,
	workspaceRelations,
	workspaceUserRelations,
};

// スキーマを渡してdrizzleインスタンスを作成
export const db = drizzle(sql, { schema });
