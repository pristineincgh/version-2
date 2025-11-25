"use client";

import { Trophy, BookOpen } from "lucide-react";
import { PiPathBold } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";
import OverviewStatsCard from "../cards/OverviewStatsCard";

const RoadmapStats = ({ roadmaps }: { roadmaps: Roadmap[] }) => {
	return (
		<div className="container grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			<OverviewStatsCard
				label="Total Roadmaps"
				value={roadmaps.length}
				icon={TbTargetArrow}
				theme={{
					bg: "bg-purple-50 dark:bg-purple-900/20",
					border: "border-purple-200 dark:border-purple-800",
					text: "text-purple-600",
					value: "text-purple-700",
					icon: "text-purple-500",
				}}
				// loading={isLoading}
			/>

			<OverviewStatsCard
				label="Roadmaps In Progress"
				value={
					roadmaps.filter((roadmap) => roadmap.status === "in_progress").length
				}
				icon={PiPathBold}
				// loading={isLoading}
			/>

			<OverviewStatsCard
				label="Roadmaps Completed"
				value={
					roadmaps.filter((roadmap) => roadmap.status === "completed").length
				}
				icon={Trophy}
				theme={{
					bg: "bg-green-50 dark:bg-green-900/20",
					border: "border-green-200 dark:border-green-800",
					text: "text-green-600",
					value: "text-green-700",
					icon: "text-green-500",
				}}
				// loading={isLoading}
			/>

			{/* <ModOverviewStatsCard
				label="Lessons Done"
				value="47/123"
				icon={BookOpen}
				theme={{
					bg: "bg-yellow-50 dark:bg-yellow-900/20",
					border: "border-yellow-200 dark:border-yellow-800",
					text: "text-yellow-600",
					value: "text-yellow-700",
					icon: "text-yellow-500",
				}}
				loading={isLoading}
			/> */}
		</div>
	);
};
export default RoadmapStats;
