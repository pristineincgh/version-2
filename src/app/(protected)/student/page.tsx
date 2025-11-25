import { getServerUser } from "@/app/actions/auth";
import UpcomingLessonCard from "@/components/student/cards/UpcomingLessonCard";
import UpcomingQuizCard from "@/components/student/cards/UpcomingQuizCard";
import OverviewHero from "@/components/student/OverviewHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/lib/apiClient";
import { isAfter } from "date-fns";
import { Lightbulb } from "lucide-react";

const StudentHomePage = async () => {
	// --- Safe user parsing ---
	const rawUser = await getServerUser();
	const user = rawUser ? JSON.parse(rawUser) : null;

	if (!user?.uid) {
		return (
			<div className="p-10 text-center">
				<p>User not found.</p>
			</div>
		);
	}

	// --- Fetch quizzes once ---
	const quizzes = await apiClient.get<Quiz[]>(
		`/lessons/quizzes?student_id=${user.uid}`
	);

	// --- Find the closest upcoming quiz ---
	const now = new Date();

	const upcomingQuiz = quizzes
		.filter((q) => {
			if (!q.approved_by_tutor) return false;
			const due = q.due_at;
			return isAfter(due, now);
		})
		.sort((a, b) => a.due_at.getTime() - b.due_at.getTime())[0];

	let quizWithRelations: QuizWithTopicAndSubmissionCount | null = null;

	if (upcomingQuiz) {
		const [topic, submissions] = await Promise.all([
			apiClient.get<Topic>(`/topics/${upcomingQuiz.topic_id}`),
			apiClient.get<QuizSubmission[]>(
				`/lessons/quizzes/${upcomingQuiz.id}/submissions`
			),
		]);

		quizWithRelations = {
			...upcomingQuiz,
			topic_title: topic?.title,
			topic_description: topic?.description,
			submissionCount: submissions?.length ?? 0,
		};
	}

	return (
		<div>
			<OverviewHero />

			<section className="container mx-auto grid gap-6 md:grid-cols-2 py-10">
				<UpcomingLessonCard />

				{quizWithRelations ? (
					<UpcomingQuizCard quiz={quizWithRelations} />
				) : (
					<Card className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 bg-linear-to-br from-gray-700 to-gray-500 text-white">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Lightbulb />
								Upcoming Quiz
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm">No upcoming quizzes available.</p>
						</CardContent>
					</Card>
				)}
			</section>
		</div>
	);
};

export default StudentHomePage;
