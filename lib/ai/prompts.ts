type SystemPromptParams = {
	projectId: number;
	workspaceId: number;
};

export const regularPrompt = (params: SystemPromptParams) => {
	const { projectId, workspaceId } = params;

	return `
You are a friendly assistant! Keep your responses concise and helpful.
When using tools, always response is short and concise.

Here is the project you are working on:
Project ID: ${projectId}
Workspace ID: ${workspaceId}

This is a guide for using business development tools: \`updateProject\`.

**When to use \`updateProject\`:**
- When the user asks to update the project name or description
`;
};

export const systemPrompt = (params: SystemPromptParams) => {
	const { projectId, workspaceId } = params;

	return regularPrompt({ projectId, workspaceId });
};
