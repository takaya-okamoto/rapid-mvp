import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { project } from "./project";

export const persona = pgTable("persona", {
	id: uuid("id").notNull().defaultRandom(),
	projectId: integer("projectId")
		.notNull()
		.references(() => project.id),

	// 基本属性
	name: text("name"), // 名前
	male: boolean("male"), // 性別
	age: integer("age"), // 年齢
	location: text("location").notNull(), // 居住地
	occupation: text("occupation"), // 職業
	income: integer("income"), // 年収

	// 心理的側面
	values: text("values"), // 顧客が大切にする価値観や信念
	goals: text("goals"), // 達成したい目標や理想像
	painPoints: text("pain_points"), // 日常や業務で直面する課題や不満

	// 作成・更新日時
	createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
});

export type Persona = typeof persona.$inferSelect;
export type NewPersona = typeof persona.$inferInsert;
