import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import {
	CREATE_TOPIC,
	DELETE_TOPIC,
	SET_TOPIC_PROGRESS,
	UPDATE_TOPIC,
} from "./endpoints";

export const useCreateNewTopicMutation = () => {
	const queryClient = useQueryClient();
	const params = useParams();
	const { roadmap_id } = params;

	return useMutation({
		mutationFn: CREATE_TOPIC,
		mutationKey: ["create-new-topic"],
		onSuccess: () => {
			toast.success("Topic created successfully");
			queryClient.invalidateQueries({
				queryKey: ["roadmap", roadmap_id],
			});
			queryClient.invalidateQueries({
				queryKey: ["topics", roadmap_id],
			});
		},
		onError: (error) => {
			console.error("Topic creation failed:", error);
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

export const useUpdateTopicMutation = () => {
	const queryClient = useQueryClient();
	const params = useParams();
	const { roadmap_id } = params;

	return useMutation({
		mutationFn: UPDATE_TOPIC,
		mutationKey: ["update-topic"],
		onSuccess: () => {
			toast.success("Topic updated successfully");
			queryClient.invalidateQueries({
				queryKey: ["roadmap", roadmap_id],
			});
			queryClient.invalidateQueries({
				queryKey: ["topics", roadmap_id],
			});
		},
		onError: (error) => {
			console.error("Topic update failed:", error);
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

export const useDeleteTopicMutation = () => {
	const queryClient = useQueryClient();
	const params = useParams();
	const { roadmap_id } = params;

	return useMutation({
		mutationFn: DELETE_TOPIC,
		mutationKey: ["delete-topic"],
		onSuccess: () => {
			toast.success("Topic deleted successfully");
			queryClient.invalidateQueries({
				queryKey: ["roadmap", roadmap_id],
			});
			queryClient.invalidateQueries({
				queryKey: ["topics", roadmap_id],
			});
		},
		onError: (error) => {
			console.error("Topic deletion failed:", error);
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

export const useSetTopicProgressMutation = () => {
	const queryClient = useQueryClient();
	const params = useParams();
	const { roadmap_id } = params;

	return useMutation({
		mutationFn: SET_TOPIC_PROGRESS,
		mutationKey: ["set-topic-progress"],
		onSuccess: () => {
			toast.success("Topic progress set successfully");
			queryClient.invalidateQueries({
				queryKey: ["roadmap", roadmap_id],
			});
			queryClient.invalidateQueries({
				queryKey: ["topics", roadmap_id],
			});
		},
		onError: (error) => {
			console.error("Topic progress set failed:", error);
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
