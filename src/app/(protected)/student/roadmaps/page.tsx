import { getServerUser } from "@/app/actions/auth";
import HeroSection from "@/components/student/HeroSection";
import RoadmapList from "@/components/student/roadmaps/RoadmapList";
import RoadmapStats from "@/components/student/roadmaps/RoadmapStats";
import { apiClient } from "@/lib/apiClient";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Learning Roadmaps",
};

const StudentRoadmapsPage = async () => {
	// --- Safe user parsing ---
	// const rawUser = await getServerUser();
	// const user = rawUser ? JSON.parse(rawUser) : null;

	// if (!user?.uid) {
	// 	return (
	// 		<div className="p-10 text-center">
	// 			<p>User not found.</p>
	// 		</div>
	// 	);
	// }

	// const roadmaps = await apiClient.get<{ total: number; items: Roadmap[] }>(
	// 	`/roadmaps?student_id=${user.uid}`
	// );

	// const roadmapIds = roadmaps.items.map((r) => r.id);

	// const roadmapsWithStatus = await Promise.all(
	// 	roadmapIds.map((id) =>
	// 		apiClient.get<Roadmap>(`/roadmaps/${id}?student_id=${user.uid}`)
	// 	)
	// );

	// console.log("roadmaps: ", roadmaps);

	return (
		<div className="space-y-6 pb-10">
			<HeroSection
				title="Learning Roadmaps"
				description="Explore your personalized learning paths, track your progress, and discover new skills to master."
				iconPath="/images/icons/roadmap.png"
				iconAlt="Assignment Icon"
				emoji="🚀"
			/>

			{/* Roadmap Statistics Section */}
			{/* <RoadmapStats roadmaps={roadmapsWithStatus} />

			<RoadmapList roadmaps={roadmapsWithStatus} /> */}
		</div>
	);
};
export default StudentRoadmapsPage;
