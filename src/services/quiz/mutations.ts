import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	APPROVE_AI_SCORE,
	APPROVE_QUIZ,
	SUBMIT_QUIZ_ANSWERS,
	UPDATE_QUIZ_SCORE,
} from "./endpoints";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useApproveQuizMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: APPROVE_QUIZ,
		mutationKey: ["approve-quiz"],
		onSuccess: (data) => {
			toast.success("Quiz approved successfully");
			queryClient.invalidateQueries({
				queryKey: ["quizzes"],
			});

			queryClient.invalidateQueries({
				queryKey: ["quiz", data.id],
			});
		},
		onError: (error) => {
			console.error("Quiz approval failed:", error);
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

export const useSubmitQuizMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: SUBMIT_QUIZ_ANSWERS,
		mutationKey: ["submit-quiz"],
		onSuccess: async (data) => {
			toast.success(data.message);

			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: ["quizzes"],
				}),
				queryClient.invalidateQueries({
					queryKey: ["quiz", data.quiz_id],
				}),
			]);
		},
		onError: (error) => {
			console.error("Quiz submission failed:", error);
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

export const useApproveAIScoreMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: APPROVE_AI_SCORE,
		mutationKey: ["approve-ai-score"],
		onSuccess: async (data) => {
			toast.success("AI score approved successfully");

			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: ["quizzes"],
				}),
				queryClient.invalidateQueries({
					queryKey: ["quiz", data.quiz_id],
				}),
				queryClient.invalidateQueries({
					queryKey: ["quiz", "submissions", data.quiz_id],
				}),
				queryClient.invalidateQueries({
					queryKey: ["quiz", "submission", data.quiz_id, data.id],
				}),
			]);
		},
		onError: (error) => {
			console.error("Quiz score approval failed:", error);
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

export const useUpdateQuizScoreMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: UPDATE_QUIZ_SCORE,
		mutationKey: ["update-quiz-score"],
		onSuccess: async (data) => {
			toast.success("Quiz score updated successfully");

			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: ["quizzes"],
				}),
				queryClient.invalidateQueries({
					queryKey: ["quiz", data.quiz_id],
				}),
			]);
		},
		onError: (error) => {
			console.error("Quiz score update failed:", error);
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
