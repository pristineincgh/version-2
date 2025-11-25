// components/ui/advanced-submit-button.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

type ButtonVariant =
	| "default"
	| "destructive"
	| "outline"
	| "secondary"
	| "ghost"
	| "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface AdvancedSubmitButtonProps
	extends Omit<ComponentProps<typeof Button>, "variant" | "size"> {
	isLoading?: boolean;
	isSuccess?: boolean;
	isError?: boolean;
	loadingText?: string;
	successText?: string;
	errorText?: string;
	icon?: ReactNode;
	children: ReactNode;
	showStatusIcons?: boolean;
	variant?: ButtonVariant;
	size?: ButtonSize;
}

export function AdvancedSubmitButton({
	isLoading = false,
	isSuccess = false,
	isError = false,
	loadingText = "Submitting...",
	successText = "Success!",
	errorText = "Error",
	icon,
	children,
	showStatusIcons = true,
	disabled,
	className,
	variant = "default",
	size = "default",
	...props
}: AdvancedSubmitButtonProps) {
	const getButtonState = () => {
		if (isLoading) return "loading";
		if (isSuccess) return "success";
		if (isError) return "error";
		return "idle";
	};

	const buttonState = getButtonState();

	const getStateStyles = () => {
		switch (buttonState) {
			case "success":
				return "bg-green-600 hover:bg-green-700 text-white";
			case "error":
				return "bg-red-600 hover:bg-red-700 text-white";
			default:
				return "";
		}
	};

	const getContent = () => {
		switch (buttonState) {
			case "loading":
				return (
					<>
						{showStatusIcons && <Spinner />}
						{loadingText}
					</>
				);
			case "success":
				return (
					<>
						{showStatusIcons && <CheckCircle />}
						{successText}
					</>
				);
			case "error":
				return (
					<>
						{showStatusIcons && <XCircle />}
						{errorText}
					</>
				);
			default:
				return (
					<>
						{icon && <span>{icon}</span>}
						{children}
					</>
				);
		}
	};

	return (
		<Button
			type="submit"
			variant={variant}
			size={size}
			disabled={disabled || isLoading}
			className={cn(
				"relative transition-all duration-200",
				getStateStyles(),
				className
			)}
			{...props}
		>
			{getContent()}
		</Button>
	);
}
