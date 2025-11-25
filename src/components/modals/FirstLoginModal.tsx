"use client";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { setUserFirstLogin } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../ui/submit-button";
import { userPasswordUpdateSchema } from "@/form-validations/auth-validations";
import { useUpdatePasswordMutation } from "@/services/account/mutation";

interface FirstLoginModalProps {
	open: boolean;
	onOpen: (open: boolean) => void;
}

const FirstLoginModal: React.FC<FirstLoginModalProps> = ({ open, onOpen }) => {
	const [showCurrentPassword, setCurrentShowPassword] = useState(false);
	const [showNewPassword, setNewShowPassword] = useState(false);

	const form = useForm<UpdatePasswordRequest>({
		mode: "all",
		resolver: zodResolver(userPasswordUpdateSchema),
		defaultValues: {
			current_password: "",
			new_password: "",
		},
	});

	const { mutate: updatePassword, isPending } = useUpdatePasswordMutation();

	const onFormSubmit = (data: UpdatePasswordRequest) => {
		updatePassword(data, {
			onSuccess: () => {
				form.reset();
				onOpen(false);
				window.location.reload();

				setUserFirstLogin(false);
			},
		});
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Change your password</AlertDialogTitle>
					<AlertDialogDescription>
						Please change your default password to secure your account.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onFormSubmit)}
						className="space-y-6"
					>
						<FormField
							control={form.control}
							name="current_password"
							render={({ field }) => (
								<FormItem>
									<div className="space-y-2">
										<FormLabel htmlFor="current_password" className="">
											Default password
										</FormLabel>
										<div className="relative group">
											<Input
												type={showCurrentPassword ? "text" : "password"}
												id="current_password"
												placeholder="Enter the default password"
												autoComplete="current-password"
												{...field}
												aria-invalid={!!form.formState.errors.current_password}
												className={cn(
													form.formState.errors.current_password
														? "text-background! dark:text-foreground! dark:bg-destructive/20! lg:text-foreground!"
														: ""
												)}
											/>
											<Button
												type="button"
												size="icon"
												variant="ghost"
												className="hover:bg-transparent text-muted-foreground absolute right-2 top-1/2 -translate-y-1/2 group-hover:text-muted-foreground group-focus-within:text-muted-foreground transition-all duration-300 ease-in-out [&_svg:not([class*='size-'])]:size-5"
												onClick={() =>
													setCurrentShowPassword(!showCurrentPassword)
												}
											>
												{showCurrentPassword ? <EyeOff /> : <Eye />}
											</Button>
										</div>
									</div>
									<FormMessage className="pl-3" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="new_password"
							render={({ field }) => (
								<FormItem>
									<div className="space-y-2">
										<FormLabel htmlFor="new_password" className="">
											New password
										</FormLabel>
										<div className="relative group">
											<Input
												type={showNewPassword ? "text" : "password"}
												id="new_password"
												placeholder="Enter your new password"
												autoComplete="new-password"
												{...field}
												aria-invalid={!!form.formState.errors.new_password}
												className={cn(
													form.formState.errors.new_password
														? "text-background! dark:text-foreground! dark:bg-destructive/20! lg:text-foreground!"
														: ""
												)}
											/>
											<Button
												type="button"
												size="icon"
												variant="ghost"
												className="hover:bg-transparent text-muted-foreground absolute right-2 top-1/2 -translate-y-1/2 group-hover:text-muted-foreground group-focus-within:text-muted-foreground transition-all duration-300 ease-in-out [&_svg:not([class*='size-'])]:size-5"
												onClick={() => setNewShowPassword(!showNewPassword)}
											>
												{showNewPassword ? <EyeOff /> : <Eye />}
											</Button>
										</div>
										<FormMessage className="pl-3" />
									</div>
								</FormItem>
							)}
						/>
						<SubmitButton
							isLoading={isPending}
							loadingText="Updating Password..."
							disabled={isPending || form.formState.isSubmitting}
							className="rounded-full w-full h-12"
						>
							Update Password
						</SubmitButton>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
};
export default FirstLoginModal;
