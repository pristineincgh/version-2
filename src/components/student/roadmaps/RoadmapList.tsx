"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import EmptyStateCard from "@/components/cards/EmptyStateCard";
import { RoadmapCard } from "../cards/RoadmapCard";
import Pagination from "@/components/Pagination";

const ROADMAPS_PER_PAGE = 6;

interface TabContentProps {
	tab: string;
	roadmaps: Roadmap[];
	searchQuery: string;
	currentPage: number;
	onPageChange: (page: number) => void;
}

const RoadmapList = ({ roadmaps }: { roadmaps: Roadmap[] }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [tab, setTab] = useState("all");
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const roadmapsRef = useRef<HTMLDivElement>(null);

	// Handle scroll behavior when page changes
	useEffect(() => {
		if (!isInitialLoad && roadmapsRef.current) {
			roadmapsRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [currentPage, isInitialLoad]);

	// Set initial load to false after first render
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsInitialLoad(false);
		}, 0);
		return () => clearTimeout(timer);
	}, []);

	// Handle search query changes
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1); // Reset page when search changes
	};

	const getFilteredRoadmaps = () => {
		if (!searchQuery) return roadmaps;

		const query = searchQuery.toLowerCase();
		return roadmaps.filter(
			(roadmap) =>
				roadmap.title.toLowerCase().includes(query) ||
				roadmap.description.toLowerCase().includes(query)
		);
	};

	const getCurrentRoadmaps = () => {
		const startIndex = (currentPage - 1) * ROADMAPS_PER_PAGE;
		return getFilteredRoadmaps().slice(
			startIndex,
			startIndex + ROADMAPS_PER_PAGE
		);
	};

	const filteredRoadmaps = getFilteredRoadmaps();
	const currentRoadmaps = getCurrentRoadmaps();
	const inProgress = filteredRoadmaps.filter(
		(roadmap) => roadmap.status === "in_progress"
	);
	const completed = filteredRoadmaps.filter(
		(roadmap) => roadmap.status === "completed"
	);

	return (
		<div ref={roadmapsRef}>
			{/* Your component JSX will go here */}
			<Tabs
				defaultValue="all"
				className="container px-0!"
				value={tab}
				onValueChange={setTab}
			>
				<div
					ref={roadmapsRef}
					className="grid sm:flex items-center sm:justify-between gap-5 mb-4"
				>
					<TabsList className="order-2 sm:order-1 grid w-full sm:w-sm lg:w-md grid-cols-3">
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="pending">In Progress</TabsTrigger>
						<TabsTrigger value="completed">Completed</TabsTrigger>
					</TabsList>

					<div className="order-1 sm:order-2">
						<SearchBar
							searchQuery={searchQuery}
							setSearchQuery={handleSearch}
						/>
					</div>
				</div>

				{roadmaps.length > 0 ? (
					<>
						<TabContent
							tab="all"
							roadmaps={currentRoadmaps}
							searchQuery={searchQuery}
							currentPage={currentPage}
							onPageChange={setCurrentPage}
						/>
						<TabsContent value="pending">
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{inProgress.length > 0 ? (
									inProgress.map((roadmap) => (
										<RoadmapCard key={roadmap.id} roadmap={roadmap} />
									))
								) : (
									<EmptyState
										description={
											searchQuery
												? `No pending roadmaps found for "${searchQuery}"`
												: "You don't have any pending roadmaps yet"
										}
									/>
								)}
							</div>
						</TabsContent>
						<TabsContent value="completed">
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{completed.length > 0 ? (
									completed.map((roadmap) => (
										<RoadmapCard key={roadmap.id} roadmap={roadmap} />
									))
								) : (
									<EmptyState
										description={
											searchQuery
												? `No completed roadmaps found for "${searchQuery}"`
												: "You don't have any completed roadmaps yet"
										}
									/>
								)}
							</div>
						</TabsContent>
					</>
				) : (
					<EmptyState description="You don't have any roadmaps yet" />
				)}
			</Tabs>
		</div>
	);
};

export default RoadmapList;

const EmptyState = ({ description }: { description: string }) => (
	<div className="sm:col-span-2 lg:col-span-3">
		<EmptyStateCard
			title="No Roadmaps Found"
			description={description}
			className="max-w-full"
		/>
	</div>
);

const TabContent = ({
	tab,
	roadmaps,
	searchQuery,
	currentPage,
	onPageChange,
}: TabContentProps) => {
	if (roadmaps.length === 0) {
		const message = searchQuery
			? `No roadmaps found for "${searchQuery}"`
			: tab === "all"
			? "You don't have any roadmaps yet"
			: `You don't have any ${tab} roadmaps yet`;

		return (
			<TabsContent value={tab}>
				<EmptyState description={message} />
			</TabsContent>
		);
	}

	return (
		<TabsContent value={tab}>
			<div className="space-y-8">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{roadmaps.map((roadmap) => (
						<RoadmapCard key={roadmap.id} roadmap={roadmap} />
					))}
				</div>
				{roadmaps.length > ROADMAPS_PER_PAGE && (
					<Pagination
						currentPage={currentPage}
						totalPages={Math.ceil(roadmaps.length / ROADMAPS_PER_PAGE)}
						paginate={onPageChange}
						nextPage={() =>
							onPageChange(
								Math.min(
									currentPage + 1,
									Math.ceil(roadmaps.length / ROADMAPS_PER_PAGE)
								)
							)
						}
						prevPage={() => onPageChange(Math.max(1, currentPage - 1))}
					/>
				)}
			</div>
		</TabsContent>
	);
};
