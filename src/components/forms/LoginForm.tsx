"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SavedEmailCard from "../cards/SavedEmailCard";
import { useLogin } from "@/services/auth/mutations";
import { loginRequestSchema } from "@/form-validations/auth-validations";
import { useAuthStore } from "@/store/useAuthStore";
import { SubmitButton } from "../ui/submit-button";
import { login } from "@/app/actions/auth";

const LoginForm = () => {
	const { storedEmail, setStoredEmail } = useAuthStore();

	const [showPassword, setShowPassword] = useState(false);
	const [showForm, setShowForm] = useState(() => !storedEmail);

	const form = useForm<LoginRequestInput>({
		mode: "all",
		resolver: zodResolver(loginRequestSchema),
		defaultValues: {
			email: storedEmail || "",
			password: "",
		},
	});

	// Update form email when storedEmail changes
	useEffect(() => {
		if (storedEmail) {
			form.setValue("email", storedEmail);
		}
	}, [storedEmail, form]);

	const { mutate: loginUser, isPending } = useLogin();

	const onFormSubmit = async (credentials: LoginRequestInput) => {
		// Call the login mutation
		loginUser(credentials);

		// await login(credentials);

		// setStoredEmail(credentials.email);
		localStorage.setItem("email", credentials.email);
	};

	return (
		<div>
			{storedEmail && !showForm ? (
				<div className="space-y-4">
					<SavedEmailCard email={storedEmail} />

					<div>
						<Button
							type="button"
							size="lg"
							className="w-full rounded-full h-12"
							onClick={() => setShowForm(!showForm)}
						>
							Continue
						</Button>
					</div>

					<div className="flex items-center justify-between">
						<div className="h-px w-full bg-muted/40" />
						<span className="px-4 text-muted dark:text-muted-foreground">
							or
						</span>
						<div className="h-px w-full bg-muted/40" />
					</div>
					<div className="flex justify-center">
						<Button
							type="button"
							variant="link"
							onClick={() => {
								setShowForm(true);
								setStoredEmail("");
								form.setValue("email", "");
								localStorage.removeItem("email");
							}}
							className="text-muted dark:text-muted-foreground"
						>
							Sign in with a different email
						</Button>
					</div>
				</div>
			) : (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onFormSubmit)}
						className="space-y-6"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div>
											<FormLabel
												htmlFor="email"
												className="mb-2 dark:text-muted-foreground"
											>
												Email
											</FormLabel>
											<Input
												type="email"
												id="email"
												placeholder="Enter your email"
												{...field}
												aria-invalid={!!form.formState.errors.email}
												autoComplete="username"
												className={cn(
													"rounded-full",
													form.formState.errors.email
														? "text-destructive placeholder:text-destructive"
														: "bg-muted text-foreground"
												)}
											/>
										</div>
									</FormControl>
									<FormMessage className="pl-3" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div>
											<div className="mb-2 flex items-center justify-between">
												<FormLabel
													htmlFor="password"
													className="dark:text-muted-foreground"
												>
													Password
												</FormLabel>

												<Link
													href="/auth/reset-request"
													className="text-muted dark:text-muted-foreground text-sm hover:underline"
												>
													Forgot Password?
												</Link>
											</div>
											<div className="relative group">
												<Input
													type={showPassword ? "text" : "password"}
													id="password"
													placeholder="Enter your password"
													{...field}
													aria-invalid={!!form.formState.errors.password}
													autoFocus={!!storedEmail}
													autoComplete="current-password"
													className={cn(
														"rounded-full pr-16",
														form.formState.errors.password
															? "text-destructive placeholder:text-destructive"
															: "bg-muted text-foreground"
													)}
												/>
												<Button
													type="button"
													size="icon"
													variant="ghost"
													className="hover:bg-transparent text-muted-foreground absolute right-5 top-1/2 -translate-y-1/2 group-hover:text-muted-foreground group-focus-within:text-muted-foreground transition-all duration-300 ease-in-out [&_svg:not([class*='size-'])]:size-5"
													onClick={() => setShowPassword(!showPassword)}
												>
													{showPassword ? <EyeOff /> : <Eye />}
												</Button>
											</div>
										</div>
									</FormControl>
									<FormMessage className="pl-3" />
								</FormItem>
							)}
						/>

						<div>
							<SubmitButton
								isLoading={isPending}
								loadingText="Signing you in..."
								icon={<MoveRight />}
								disabled={isPending || form.formState.isSubmitting}
								className="rounded-full w-full h-12"
							>
								Continue
							</SubmitButton>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
};
export default LoginForm;
