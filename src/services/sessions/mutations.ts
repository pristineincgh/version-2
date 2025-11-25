import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { END_SESSION, ENTER_CLASSROOM } from "./endpoints";

export const useEndSessionMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: END_SESSION,
		mutationKey: ["end-session"],
		onSuccess: () => {
			toast.success("Session ended successfully");
			queryClient.invalidateQueries({
				queryKey: ["sessions"],
			});
		},
		onError: (error) => {
			console.error("Session end failed:", error);
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

export const useEnterClassroomMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ENTER_CLASSROOM,
		mutationKey: ["enter-classroom"],
		onSuccess: () => {
			toast.success("Session joined successfully");
			queryClient.invalidateQueries({
				queryKey: ["sessions"],
			});
		},
		onError: (error) => {
			console.error("Session end failed:", error);
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
