// interface Quiz {
// 	id: string;
// 	title: string;
// 	description: string;
// 	difficulty: "Easy" | "Medium" | "Hard";
// 	questionCount: number;
// 	estimatedTime: number; // in minutes
// 	category: string;
// 	status: "Not Started" | "In Progress" | "Completed" | "Locked";
// }

interface Question {
	id: number;
	text: string;
	options: string[];
	answer: string;
	points: number;
}

interface Quiz {
	id: string;
	session_id: string;
	topic_id: string;
	status: QuizStatus;
	due_at: Date;
	approved_by_tutor: boolean;
	total_points: number;
	generated_at: Date;
	questions: Question[];
}

interface QuizWithTopic extends Quiz {
	topic_title: string;
}

interface QuizWithTopicAndSubmissionCount extends QuizWithTopic {
	topic_description: string;
	submissionCount: number;
}

interface MockQuestion {
	id: string;
	question: string;
	options: string[];
	answer: number;
}

interface MockQuiz {
	id: string;
	title: string;
	description: string;
	difficulty: "beginner" | "intermediate" | "advanced";
	instructions: string;
	objectives: string[];
	quizDuration: number;
	status: "pending" | "in-progress" | "completed";
	questions: MockQuestion[];
}

interface FormQuizOption {
	id: string;
	text: string;
	isCorrect: boolean;
}

interface FormQuiz {
	question: string;
	type: "multiple-choice" | "true-false" | "short-answer";
	points: number;
	options?: FormQuizOption[];
}

interface CreateQuizRequest {
	topicId: string;
	questions: FormQuiz[];
}

interface Step {
	id: string;
	title: string;
	description?: string;
}

interface ApproveQuizRequest {
	quizId: string;
	approved: boolean;
}

interface QuizAnswer {
	question_id: string;
	answer: string;
}

interface SubmitQuizRequest {
	quizId: string;
	answers: QuizAnswer[];
}

interface SubmitQuizResponse {
	id: string;
	quiz_id: string;
	message: string;
}

interface QuizSubmissionByIdRequest {
	quizId: string;
	submissionId: string;
}

interface QuizSubmission {
	id: string;
	quiz_id: string;
	student_id: string;
	answers_json: string;
	score: number;
	scored_by_ai: boolean;
	ai_score_details_json: string;
	approved_by_tutor: boolean;
	approved_score: number;
	submitted_at: string;
}

interface ApproveQuizSubmissionRequest extends QuizSubmissionByIdRequest {
	approved: boolean;
}

interface UpdateQuizScoreRequest extends ApproveQuizSubmissionRequest {
	approved_score: number;
}
