import { useQuery } from "@tanstack/react-query";
import {
	GET_QUIZ,
	GET_QUIZ_SUBMISSION,
	GET_UPCOMING_QUIZ_FOR_STUDENT,
	LIST_QUIZ_SUBMISSIONS,
	LIST_QUIZZES,
} from "./endpoints";

export const useGetQuizzesQuery = (studentId: string) => {
	return useQuery({
		queryKey: ["quizzes", studentId],
		queryFn: () => LIST_QUIZZES(studentId),
		enabled: !!studentId,
	});
};

export const useGetQuizQuery = (quizId: string) => {
	return useQuery({
		queryKey: ["quiz", quizId],
		queryFn: () => GET_QUIZ(quizId),
		enabled: !!quizId,
	});
};

export const useGetQuizSubmissionsQuery = (quizId: string) => {
	return useQuery({
		queryKey: ["quiz", "submissions", quizId],
		queryFn: () => LIST_QUIZ_SUBMISSIONS(quizId),
		enabled: !!quizId,
	});
};

export const useGetQuizSubmissionQuery = (data: QuizSubmissionByIdRequest) => {
	return useQuery({
		queryKey: ["quiz", "submission", data.quizId, data.submissionId],
		queryFn: () => GET_QUIZ_SUBMISSION(data),
		enabled: !!data.quizId && !!data.submissionId,
	});
};

export const useUpcomingQuizQuery = (studentId: string) =>
	useQuery({
		queryKey: ["upcoming-quiz", studentId],
		queryFn: GET_UPCOMING_QUIZ_FOR_STUDENT,
		enabled: !!studentId,
	});
