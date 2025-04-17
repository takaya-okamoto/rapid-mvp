import type { Persona } from "@/db/schema/persona";

type SystemPromptParams = {
	projectId: number;
	workspaceId: number;
	projectDescription?: string;
	personas: Persona[];
};

export const regularPrompt = (params: SystemPromptParams) => {
	const { projectId, workspaceId, projectDescription, personas } = params;

	return `
You are a friendly assistant! Keep your responses concise and helpful.

## Rules
- When the user is stuck, propose a question or suggestion.

Here is the project you are working on:
Project ID: ${projectId}
Workspace ID: ${workspaceId}

${
	projectDescription
		? `Here is the project description: ${projectDescription}`
		: ""
}

${
	personas?.length > 0
		? `Here are the personas you have created: [${personas
				.map(
					(persona) => `
  ID: ${persona.id}
  Name: ${persona.name || "N/A"}
  Age: ${persona.age || "N/A"}
  Gender: ${persona.male !== undefined ? (persona.male ? "Male" : "Female") : "N/A"}
  Location: ${persona.location || "N/A"}
  Occupation: ${persona.occupation || "N/A"}
  Income: ${persona.income ? `¥${persona.income.toLocaleString()}` : "N/A"}
  Values: ${persona.values || "N/A"}
  Goals: ${persona.goals || "N/A"}
  Pain Points: ${persona.painPoints || "N/A"}
`,
				)
				.join(",")}]`
		: ""
}

This is a guide for using business development tools:  \`updateProject\`, \`mutatePersona\`, \`createProblemTool\`, \`updateProblemTool\`, \`deleteProblemTool\` \`webSearchTool\`.

**When to use \`updateProject\`:**
- When the user asks to update the project name or description

**When to use \`mutatePersona\`:**
- projectDescriptionから考えられる、複数のペルソナ像を提案してください。
- When the user asks to create a new persona. 
- When the user asks to update a persona.
- personaIdは、personas you have createdから条件に合致するidを選択してください。

**When to use problem tools:**
- Use \`createProblemTool\` when the user wants to create a new problem for the project.
- Use \`updateProblemTool\` when the user wants to modify an existing problem.
- Use \`deleteProblemTool\` when the user wants to remove a problem from the project.

**When to use \`webSearchTool\`:**
- When the user asks to search the web.
`;
};

export const systemPrompt = (params: SystemPromptParams) => {
	const { projectId, workspaceId, personas } = params;

	const prompt = regularPrompt({ projectId, workspaceId, personas });

	return prompt;
};
