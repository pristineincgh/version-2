"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { ChangeEvent } from "react";

interface SearchBarProps {
	searchQuery: string;
	setSearchQuery: (e: ChangeEvent<HTMLInputElement>) => void;
	isLoading?: boolean;
	classNames?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
	searchQuery,
	setSearchQuery,
	isLoading,
	classNames,
}) => {
	return (
		<div className="relative w-full lg:w-96">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
			<Input
				type="search"
				placeholder="Search for roadmaps..."
				className={cn("pl-10 w-full rounded-full h-9 bg-muted", classNames)}
				value={searchQuery}
				onChange={(e) => setSearchQuery(e)}
				disabled={isLoading}
				// disabled={isLoading || roadmaps.length === 0}
			/>
		</div>
	);
};
export default SearchBar;
