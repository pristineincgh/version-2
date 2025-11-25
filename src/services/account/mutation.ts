import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	UPDATE_PASSWORD,
	UPDATE_USER_PROFILE,
	UPLOAD_USER_AVATAR,
} from "./endpoints";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";

export const useUploadAvatarMutation = () => {
	return useMutation({
		mutationKey: ["upload-avatar"],
		mutationFn: UPLOAD_USER_AVATAR,
		onSuccess: (data) => {
			toast.success(data.message);
		},
		onError: (error) => {
			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data.detail);
			} else {
				const errorMessage =
					`An error occurred: ${error.message}` ||
					"An error occurred. Please try again.";
				toast.error(errorMessage);
			}
		},
	});
};

export const useUpdateProfileMutation = () => {
	const params = useParams();
	const { user_id } = params;
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["update-profile"],
		mutationFn: UPDATE_USER_PROFILE,
		onSuccess: (data) => {
			toast.success(data.message);

			queryClient.invalidateQueries({
				queryKey: ["user", user_id],
			});
		},
		onError: (error) => {
			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data.detail);
			} else {
				const errorMessage =
					`An error occurred: ${error.message}` ||
					"An error occurred. Please try again.";
				toast.error(errorMessage);
			}
		},
	});
};

export const useUpdatePasswordMutation = () => {
	return useMutation({
		mutationKey: ["update-password"],
		mutationFn: UPDATE_PASSWORD,
		onSuccess: (data) => {
			toast.success(data.message);
		},
		onError: (error) => {
			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data.detail);
			} else {
				const errorMessage =
					`An error occurred: ${error.message}` ||
					"An error occurred. Please try again.";
				toast.error(errorMessage);
			}
		},
	});
};
