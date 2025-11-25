"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	paginate: (page: number) => void;
	nextPage: () => void;
	prevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	paginate,
	nextPage,
	prevPage,
}) => {
	if (totalPages <= 1) return null; // Don't show pagination if there's only one page

	return (
		<div className="relative z-20 flex justify-center mt-10">
			<nav className="flex items-center space-x-1">
				<Button
					type="button"
					size="icon"
					variant="ghost"
					onClick={prevPage}
					disabled={currentPage === 1}
					className={`p-2 rounded-md ${
						currentPage === 1
							? "text-gray-300 cursor-not-allowed"
							: "text-gray-700 hover:bg-gray-100"
					}`}
					aria-label="Previous page"
				>
					<ChevronLeft className="h-5 w-5" />
				</Button>

				{Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
					let pageNum;
					if (totalPages <= 5) {
						pageNum = index + 1;
					} else {
						const start = Math.max(
							1,
							Math.min(currentPage - 2, totalPages - 4)
						);
						pageNum = start + index;
					}

					return (
						<Button
							type="button"
							size="icon"
							variant="ghost"
							key={pageNum}
							onClick={() => paginate(pageNum)}
							className={`w-10 h-10 flex items-center justify-center rounded-md ${
								currentPage === pageNum
									? "bg-gray-200 text-gray-800 font-medium"
									: "text-gray-600 hover:bg-gray-100"
							}`}
							aria-label={`Page ${pageNum}`}
							aria-current={currentPage === pageNum ? "page" : undefined}
						>
							{pageNum}
						</Button>
					);
				})}

				<Button
					type="button"
					size="icon"
					variant="ghost"
					onClick={nextPage}
					disabled={currentPage === totalPages}
					className={`p-2 rounded-md ${
						currentPage === totalPages
							? "text-gray-300 cursor-not-allowed"
							: "text-gray-700 hover:bg-gray-100"
					}`}
					aria-label="Next page"
				>
					<ChevronRight className="h-5 w-5" />
				</Button>
			</nav>
		</div>
	);
};
export default Pagination;
