import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
	CREATE_SCHEDULE,
	DELETE_SCHEDULE,
	DISABLE_SCHEDULE,
	ENABLE_SCHEDULE,
	UPDATE_SCHEDULE,
} from "./endpoints";
import { toast } from "sonner";

export const useCreateScheduleMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: CREATE_SCHEDULE,
		mutationKey: ["schedules", "create"],
		onSuccess: () => {
			toast.success("Schedule created successfully");

			queryClient.invalidateQueries({
				queryKey: ["schedules"],
			});
		},
		onError: (error) => {
			console.error("Schedule creation failed:", error);
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

export const useUpdateScheduleMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: UPDATE_SCHEDULE,
		mutationKey: ["schedules", "update"],
		onSuccess: () => {
			toast.success("Schedule updated successfully");

			queryClient.invalidateQueries({
				queryKey: ["schedules"],
			});
		},
		onError: (error) => {
			console.error("Schedule update failed:", error);
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

export const useEnableScheduleMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ENABLE_SCHEDULE,
		mutationKey: ["schedules", "enable"],
		onSuccess: () => {
			toast.success("Schedule enabled successfully");

			queryClient.invalidateQueries({
				queryKey: ["schedules"],
			});
		},
		onError: (error) => {
			console.error("Schedule update failed:", error);
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

export const useDisableScheduleMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: DISABLE_SCHEDULE,
		mutationKey: ["schedules", "disable"],
		onSuccess: () => {
			toast.success("Schedule disabled successfully");

			queryClient.invalidateQueries({
				queryKey: ["schedules"],
			});
		},
		onError: (error) => {
			console.error("Schedule update failed:", error);
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

export const useDeleteScheduleMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: DELETE_SCHEDULE,
		mutationKey: ["delete-schedule"],
		onSuccess: () => {
			toast.success("Schedule deleted successfully");

			queryClient.invalidateQueries({
				queryKey: ["schedules"],
			});
		},
		onError: (error) => {
			console.error("Schedule deletion failed:", error);
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
