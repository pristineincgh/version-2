"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import roadmapPlaceholder from "@/assets/images/roadmap-placeholder.png";

interface RoadmapCardProps {
	roadmap: Roadmap;
	className?: string;
}

export function RoadmapCard({ roadmap, className }: RoadmapCardProps) {
	const maxVisibleTags = 2;
	const visibleTags = roadmap.tags.slice(0, maxVisibleTags);
	const remainingTagsCount = roadmap.tags.length - maxVisibleTags;

	return (
		<Card
			className={cn("flex flex-col h-full overflow-hidden pt-0", className)}
		>
			<div className="relative h-48 shrink-0">
				<div className="absolute z-10 inset-0 bg-black/70" />
				<Image
					src={roadmap.banner_image_url || roadmapPlaceholder}
					alt="Roadmap Banner"
					placeholder="blur"
					blurDataURL={
						roadmap.banner_image_url
							? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWP2vHgAEhgIqoz0RBQAAAABJRU5ErkJggg=="
							: ""
					}
					fill
					priority
					sizes="(max-width: 768px) 100vw, 50vw"
					className="object-cover"
				/>
				<div className="absolute z-20 inset-0 grid place-items-center">
					<h1 className="text-3xl font-bold text-white text-center px-2">
						{roadmap.title}
					</h1>
				</div>
			</div>
			<CardContent className="flex-1 flex flex-col">
				<div className="flex flex-wrap items-center gap-2 mb-3">
					{visibleTags.map((tag) => (
						<Badge
							key={tag}
							variant="outline"
							className="rounded-full bg-muted text-xs"
						>
							{tag}
						</Badge>
					))}
					{remainingTagsCount > 0 && (
						<Badge variant="outline" className="rounded-full bg-muted text-xs">
							+{remainingTagsCount} more
						</Badge>
					)}
				</div>
				<CardDescription className="line-clamp-3 flex-1">
					{roadmap.description.length > 100
						? roadmap.description.slice(0, 100) + "..."
						: roadmap.description}
				</CardDescription>
			</CardContent>
			<CardFooter className="mt-auto p-4 pt-0">
				<Button asChild className="flex-1">
					<Link href={`/student/roadmaps/${roadmap.id}`}>View Details</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
