"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";

const UpcomingQuizCard = ({
	quiz,
}: {
	quiz: QuizWithTopicAndSubmissionCount;
}) => {
	return (
		<Card className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 bg-linear-to-br from-cyan-700 to-cyan-400 text-white">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Lightbulb />
					Upcoming Quiz
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<h4 className="text-xl font-semibold">{quiz.topic_title}</h4>
				<p className="text-sm">
					{quiz.topic_description.length ?? 0 > 80
						? quiz.topic_description.slice(0, 80) + "..."
						: quiz.topic_description}
				</p>
				<p className="text-xs opacity-80">
					Due:{" "}
					{format(
						parseISO(new Date(quiz.due_at).toISOString()),
						"MMM dd, yyyy"
					)}
				</p>
			</CardContent>
			<CardFooter>
				<Button variant="outline" className="text-foreground" asChild>
					<Link href={`/student/quizzes/${quiz?.id}/start`}>
						<span>
							{(quiz.submissionCount ?? 0) > 0 ? "Retake Quiz" : "Take Quiz"}
						</span>{" "}
						<ArrowRight className="ml-2 h-4 w-4" />
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default UpcomingQuizCard;

// Skeleton Loader Component
// function SkeletonCardLoader() {
// 	return (
// 		<Card className="border-none shadow-md bg-linear-to-br from-slate-200 to-slate-100">
// 			<CardHeader>
// 				<CardTitle className="flex items-center gap-2">
// 					<Skeleton className="h-6 w-6 rounded-full" />
// 					<Skeleton className="h-6 w-32" />
// 				</CardTitle>
// 			</CardHeader>
// 			<CardContent className="space-y-2">
// 				<Skeleton className="h-7 w-3/4" />
// 				<Skeleton className="h-4 w-full" />
// 				<Skeleton className="h-4 w-2/3" />
// 				<Skeleton className="h-3 w-1/2" />
// 			</CardContent>
// 			<CardFooter>
// 				<Skeleton className="h-10 w-32" />
// 			</CardFooter>
// 		</Card>
// 	);
// }
