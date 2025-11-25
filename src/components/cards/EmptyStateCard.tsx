"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface EmptyStateProps {
	// Required props
	title: string;
	description: string;

	// Optional props
	action?: {
		label: string;
		onClick: () => void;
	};
	secondaryAction?: {
		label: string;
		onClick: () => void;
	};
	size?: "sm" | "md" | "lg";
	className?: string;
}

const EmptyStateCard: React.FC<EmptyStateProps> = ({
	title,
	description,
	action,
	secondaryAction,
	size = "md",
	className = "",
}) => {
	const sizeClasses = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
	};

	return (
		<Card className={`mx-auto ${sizeClasses[size]} ${className}`}>
			<CardContent className="flex flex-col items-center justify-center p-8 text-center">
				{/* Image or Icon */}
				<div>
					<Image
						src="/images/icons/no-data.svg"
						width={150}
						height={150}
						alt="No Data"
						priority
						className="object-contain mx-auto"
					/>
				</div>

				{/* Title and Description */}
				<h3 className="mb-2 text-lg font-semibold">{title}</h3>
				<p className="mb-6 text-sm text-muted-foreground">{description}</p>

				{/* Actions */}
				{(action || secondaryAction) && (
					<div className="flex flex-wrap gap-3">
						{action && <Button onClick={action.onClick}>{action.label}</Button>}
						{secondaryAction && (
							<Button variant="outline" onClick={secondaryAction.onClick}>
								{secondaryAction.label}
							</Button>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default EmptyStateCard;
