"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpcomingLessonQuery } from "@/services/schedule/queries";
import { getAuthUser } from "@/store/useAuthStore";
import { ArrowRight, Calendar, Clock, Target } from "lucide-react";
import { PiPath } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { format, isToday, isTomorrow } from "date-fns";
import { useState } from "react";
import DevicesModal from "@/components/agora/DevicesModal";

const formatDate = (dateString?: Date) => {
	if (!dateString) return "N/A";
	const date = new Date(dateString);
	if (isToday(date)) return "Today";
	if (isTomorrow(date)) return "Tomorrow";
	return format(date, "eeee, MMMM do");
};

const formatTime = (dateString?: Date) =>
	dateString ? format(dateString, "h:mm a") : "N/A";

const UpcomingLessonCard = () => {
	const [devicesModalOpen, setDevicesModalOpen] = useState(false);
	const user = getAuthUser();
	const router = useRouter();

	const { data, isLoading } = useUpcomingLessonQuery(user?.uid as string);

	const activeSession = data?.activeSession;
	const upcomingSchedule = data?.upcomingSchedule;
	const tutor = data?.tutor;
	const topic = data?.topic;

	const lessonTitle =
		upcomingSchedule?.title ??
		(activeSession ? "Current Session" : "Upcoming Lesson");

	if (isLoading) return <SkeletonLoader />;

	if (!upcomingSchedule && !activeSession)
		return (
			<NoUpcomingSchedule
				onViewSchedules={() => router.push("/student/schedule")}
			/>
		);

	return (
		<>
			<Card className="self-start shadow-md hover:shadow-xl transition-shadow duration-300">
				<CardHeader>
					<CardTitle className="flex justify-between items-center gap-2">
						<div className="flex items-center gap-2">
							<Target className="text-green-500" />
							<span>Your Next Lesson</span>
						</div>
						<Badge
							variant="outline"
							className="rounded-full bg-primary/10 text-primary"
						>
							60 mins
						</Badge>
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-3">
					<div>
						<h4 className="text-xl font-semibold tracking-[0.1rem] capitalize">
							{topic?.title}
						</h4>
						<p className="flex items-center gap-2">
							<PiPath size={20} />
							<span>{lessonTitle}</span>
						</p>
					</div>

					<div className="flex flex-wrap gap-4">
						{tutor?.displayName && (
							<LessonInfo
								icon={<FaChalkboardTeacher size={20} />}
								label={tutor.displayName}
							/>
						)}
						<LessonInfo
							icon={<Calendar size={20} />}
							label={formatDate(upcomingSchedule?.start_at)}
						/>
						<LessonInfo
							icon={<Clock size={20} />}
							label={formatTime(upcomingSchedule?.start_at)}
						/>
					</div>
				</CardContent>

				{activeSession && (
					<CardFooter>
						<Button onClick={() => setDevicesModalOpen(true)}>
							Join Session <ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</CardFooter>
				)}
			</Card>

			{devicesModalOpen && activeSession && (
				<DevicesModal
					open={devicesModalOpen}
					onClose={() => setDevicesModalOpen(false)}
					session={activeSession}
				/>
			)}
		</>
	);
};

export default UpcomingLessonCard;

const LessonInfo = ({
	icon,
	label,
}: {
	icon: React.ReactNode;
	label: string;
}) => (
	<div className="flex items-center gap-2 text-sm">
		<span className="text-muted-foreground shrink-0">{icon}</span>
		<span>{label}</span>
	</div>
);

const NoUpcomingSchedule = ({
	onViewSchedules,
}: {
	onViewSchedules: () => void;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex justify-between items-center gap-2">
				<div className="flex items-center gap-2">
					<Target className="text-green-500" />
					<span>Your Next Lesson</span>
				</div>
				<Badge
					variant="outline"
					className="rounded-full bg-primary/10 text-primary"
				>
					60 mins
				</Badge>
			</CardTitle>
		</CardHeader>
		<CardContent>
			<h4 className="text-xl font-semibold">No Upcoming Schedule</h4>
			<p>You don&apos;t have any upcoming schedules.</p>
		</CardContent>
		<CardFooter>
			<Button onClick={onViewSchedules}>
				View Schedules <ArrowRight className="ml-2 h-4 w-4" />
			</Button>
		</CardFooter>
	</Card>
);

const SkeletonLoader = () => (
	<Card>
		<CardHeader>
			<CardTitle className="flex justify-between items-center gap-2">
				<div className="flex items-center gap-2">
					<Skeleton className="h-8 w-8 rounded-full" />
					<Skeleton className="h-4 w-32" />
				</div>
				<Skeleton className="h-6 w-20" />
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2">
			<Skeleton className="h-4 w-48" />
			<div className="flex flex-wrap gap-4">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-4 w-24" />
			</div>
			<Skeleton className="h-4 w-24" />
		</CardContent>
		<CardFooter>
			<Skeleton className="h-10 w-48" />
		</CardFooter>
	</Card>
);
