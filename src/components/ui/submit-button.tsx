"use client";

import { Button } from "@/components/ui/button";
import { ComponentProps, ReactNode } from "react";
import { Spinner } from "./spinner";

interface SubmitButtonProps extends ComponentProps<typeof Button> {
	isLoading?: boolean;
	loadingText?: string;
	icon?: ReactNode;
	children: ReactNode;
}

export function SubmitButton({
	isLoading = false,
	loadingText = "Submitting...",
	icon,
	children,
	disabled,
	className,
	variant = "default",
	size = "default",
	...props
}: SubmitButtonProps) {
	return (
		<Button
			type="submit"
			variant={variant}
			size={size}
			disabled={disabled}
			className={`relative transition-all duration-200 ${className || ""}`}
			{...props}
		>
			{isLoading ? (
				<>
					<Spinner />
					{loadingText}
				</>
			) : (
				<>
					{icon && <span>{icon}</span>}
					{children}
				</>
			)}
		</Button>
	);
}
