import { neon } from "@neondatabase/serverless";
import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/neon-http";
import { chat } from "./schema/chat";
import { document } from "./schema/document";
import { hypothesis } from "./schema/hypothesis";
import { message } from "./schema/message";
import { problem } from "./schema/problem";
import { project } from "./schema/project";
import { suggestion } from "./schema/suggestion";
import { user } from "./schema/user";
import { vote } from "./schema/vote";
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

	problem,
	hypothesis,

	// chat関連
	chat,
	vote,
	message,
	document,
	suggestion,
};

// スキーマを渡してdrizzleインスタンスを作成
export const db = drizzle(sql, { schema });
