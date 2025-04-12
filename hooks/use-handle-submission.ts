"use client";

import { type ActionState, defaultActionState } from "@/types/common";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";

export type CallbacksConfig = {
	onError?: (state: ActionState) => void;
	onSuccess?: (state: ActionState) => void;
};

export function withCallbacks(
	action: (
		actionState: ActionState,
		formData: FormData,
	) => Promise<ActionState>,
	callbacks: CallbacksConfig,
) {
	return async (actionState: ActionState, formData: FormData) => {
		const result = await action(actionState, formData);
		if (!!result?.success === false) {
			callbacks.onError?.(result);
		} else if (!!result?.success === true) {
			callbacks.onSuccess?.(result);
		}
		return result;
	};
}

const useHandleSubmission = (
	action: (
		actionState: ActionState,
		formData: FormData,
	) => Promise<ActionState>,
) => {
	const router = useRouter();

	return useActionState(
		withCallbacks(action, {
			onError: (state) => {
				if (state.errorMessage) {
					toast.error(state.errorMessage ?? "エラーが発生しました");
				}
			},
			onSuccess: (state) => {
				toast.success(state.successMessage ?? "送信が完了しました");
				if (state.redirectPath) {
					router.push(state.redirectPath);
				}
			},
		}),
		defaultActionState,
	);
};

export default useHandleSubmission;
