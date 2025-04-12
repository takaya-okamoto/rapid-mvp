export type ActionState = {
	errorMessage?: string;
	successMessage?: string;
	success?: boolean;
	redirectPath?: string;
};

export const defaultActionState: ActionState = {
	errorMessage: undefined,
	successMessage: undefined,
	success: false,
	redirectPath: undefined,
};
