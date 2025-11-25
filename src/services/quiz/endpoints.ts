import apiClient from "@/lib/api-client";
import { isAfter, parseISO } from "date-fns";
import { GET_TOPIC } from "../topics/endpoints";

export const LIST_QUIZZES = async (studentId: string): Promise<Quiz[]> => {
	const { data } = await apiClient.get<Quiz[]>("/lessons/quizzes", {
		params: {
			student_id: studentId,
		},
	});

	return data;
};

export const GET_QUIZ = async (quizId: string): Promise<Quiz> => {
	const { data } = await apiClient.get<Quiz>(`/lessons/quizzes/${quizId}`);
	return data;
};

export const APPROVE_QUIZ = async (data: ApproveQuizRequest) => {
	const response = await apiClient.post<Quiz>(
		`/lessons/quizzes/${data.quizId}/approve`,
		{
			approved: data.approved,
		}
	);

	return response.data;
};

export const SUBMIT_QUIZ_ANSWERS = async (data: SubmitQuizRequest) => {
	const response = await apiClient.post<SubmitQuizResponse>(
		`/lessons/quizzes/${data.quizId}/submit/answers`,
		{
			answers: data.answers,
		}
	);

	return response.data;
};

export const LIST_QUIZ_SUBMISSIONS = async (quizId: string) => {
	const response = await apiClient.get<QuizSubmission[]>(
		`/lessons/quizzes/${quizId}/submissions`
	);

	return response.data;
};

export const GET_QUIZ_SUBMISSION = async (data: QuizSubmissionByIdRequest) => {
	const response = await apiClient.get<QuizSubmission>(
		`/lessons/quizzes/${data.quizId}/submissions/${data.submissionId}`
	);

	return response.data;
};

export const APPROVE_AI_SCORE = async (data: ApproveQuizSubmissionRequest) => {
	const response = await apiClient.post<QuizSubmission>(
		`/lessons/quizzes/${data.quizId}/submissions/${data.submissionId}/approve`,
		{
			approved: data.approved,
		}
	);

	return response.data;
};

export const UPDATE_QUIZ_SCORE = async (data: UpdateQuizScoreRequest) => {
	const response = await apiClient.put<QuizSubmission>(
		`/lessons/quizzes/${data.quizId}/submissions/${data.submissionId}/score`,
		{
			approved: data.approved,
			approved_score: data.approved_score,
		}
	);

	return response.data;
};

export const GET_UPCOMING_QUIZ_FOR_STUDENT = async ({
	queryKey,
}: {
	queryKey: [string, string];
}) => {
	const [_key, studentId] = queryKey;

	// 1. Get all quizzes
	const quizzes = await LIST_QUIZZES(studentId);

	if (!quizzes || quizzes.length === 0) {
		return {
			upcomingQuiz: null,
			topic: null,
			quizSubmissions: [],
		};
	}

	const now = new Date();

	// 2. Select upcoming quiz using your existing logic
	const upcomingQuiz = quizzes
		.filter(
			(q) =>
				q.approved_by_tutor &&
				isAfter(parseISO(new Date(q.due_at).toISOString()), now)
		)
		.sort(
			(a, b) =>
				parseISO(new Date(a.due_at).toISOString()).getTime() -
				parseISO(new Date(b.due_at).toISOString()).getTime()
		)[0];

	if (!upcomingQuiz) {
		return {
			upcomingQuiz: null,
			topic: null,
			quizSubmissions: [],
		};
	}

	// 3. Get topic
	const topic = await GET_TOPIC(upcomingQuiz.topic_id);

	// 4. Get submissions
	const quizSubmissions = await LIST_QUIZ_SUBMISSIONS(upcomingQuiz.id);

	return {
		upcomingQuiz,
		topic,
		quizSubmissions,
	};
};
