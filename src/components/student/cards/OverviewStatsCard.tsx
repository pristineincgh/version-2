import React, { ForwardRefExoticComponent, memo, RefAttributes } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { IconType } from "react-icons/lib";
import { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardProps {
	label: string;
	value: string | number;
	icon:
		| IconType
		| ForwardRefExoticComponent<
				Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
		  >;
	theme?: {
		bg?: string;
		border?: string;
		text?: string;
		value?: string;
		icon?: string;
	};
	className?: string;
	loading?: boolean;
}

const OverviewStatsCard: React.FC<StatsCardProps> = ({
	label,
	value,
	icon: Icon,
	theme = {
		bg: "bg-blue-50 dark:bg-blue-900/20",
		border: "border-blue-200 dark:border-blue-800",
		text: "text-blue-600",
		value: "text-blue-700",
		icon: "text-blue-500",
	},
	className = "",
	loading = false,
}) => {
	// Merge default theme with any provided theme props
	const mergedTheme = {
		bg: theme?.bg || "bg-blue-50 dark:bg-blue-900/20",
		border: theme?.border || "border-blue-200 dark:border-blue-800",
		text: theme?.text || "text-blue-600",
		value: theme?.value || "text-blue-700",
		icon: theme?.icon || "text-blue-500",
	};

	if (loading) {
		return <LoadingOverviewStatsCard mergedTheme={mergedTheme} />;
	}

	return (
		<Card
			className={`py-0 ${mergedTheme.bg} ${mergedTheme.border} ${className}`}
		>
			<CardContent className="p-4 space-y-2">
				<div className="flex items-center justify-between">
					<div className="space-y-2">
						<p className={`text-sm font-medium ${mergedTheme.text}`}>{label}</p>
						<p className={`text-2xl font-bold ${mergedTheme.value}`}>{value}</p>
					</div>
					<Icon className={cn("h-8 w-8", mergedTheme.icon)} />
				</div>
			</CardContent>
		</Card>
	);
};

export default OverviewStatsCard;

const LoadingOverviewStatsCard = memo(function LoadingOverviewStatsCard({
	mergedTheme,
}: {
	mergedTheme: {
		bg: string;
		border: string;
		text: string;
		value: string;
		icon: string;
	};
}) {
	return (
		<Card className={`py-0 ${mergedTheme.bg} ${mergedTheme.border}`}>
			<CardContent className="p-4 space-y-2">
				<div className="flex items-center justify-between">
					<div className="space-y-2">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-6 w-10" />
					</div>
					<Skeleton className="h-8 w-8" />
				</div>
			</CardContent>
		</Card>
	);
});
