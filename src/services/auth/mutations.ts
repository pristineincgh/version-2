import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
	GET_AUTHENTICATED_USER,
	LOGIN_USER,
	LOGOUT_USER,
	PASSWORD_RESET_CONFIRM,
	PASSWORD_RESET_REQUEST,
	VERIFY_EMAIL,
} from "./endpoints";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { redirectBasedOnRole } from "@/lib/auth";
import { logout, setTokens, setUser } from "@/store/useAuthStore";
import { setAuthToken, setAuthUser } from "@/app/actions/auth";

export const useLogin = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: LOGIN_USER,
		mutationKey: ["login"],
		onSuccess: async (data) => {
			setTokens(data.idToken, data.refreshToken, data.first_login);
			setAuthToken({
				accessToken: data.idToken,
				refreshToken: data.refreshToken,
			});

			// prefetch the authenticated user
			try {
				const user = await GET_AUTHENTICATED_USER();
				setUser(user);
				setAuthUser(JSON.stringify(user));

				router.push(redirectBasedOnRole(user.role));

				queryClient.setQueryData(["me"], user);
				toast.success(data.message, {
					description: "You have successfully logged in.",
				});
			} catch (error) {
				console.error("Error fetching authenticated user:", error);

				logout();
				throw error;
			}
		},
		onError: (error) => {
			console.error("Login failed:", error);

			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data.detail, {
					description: "Please check your credentials and try again.",
					position: "top-center",
				});
			} else {
				const errorMessage =
					`An error occurred: ${error.message}` ||
					"An error occurred. Please try again.";
				toast.error(errorMessage, {
					description: "Please check your credentials and try again.",
					position: "top-center",
				});
			}
		},
	});
};

export const useLogout = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: LOGOUT_USER,
		mutationKey: ["logout"],
		onSuccess: (data) => {
			toast.success(data);

			logout();
			router.push("/login");
		},
		onError: (error) => {
			console.error("Logout failed:", error);
			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data.detail);
			} else {
				const errorMessage =
					`An error occurred: ${error.message}` ||
					"An error occurred. Please try again.";
				toast.error(errorMessage);
			}
		},
	});
};

export const usePasswordResetRequest = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: PASSWORD_RESET_REQUEST,
		mutationKey: ["password-reset-request"],
		onSuccess: (data) => {
			toast.success(data, {
				position: "top-center",
			});

			router.push("/check-email");
		},
		onError: (error) => {
			console.error("Password reset request failed:", error);
			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data.detail, {
					position: "top-center",
				});
			} else {
				const errorMessage =
					`An error occurred: ${error.message}` ||
					"An error occurred. Please try again.";
				toast.error(errorMessage, {
					position: "top-center",
				});
			}
		},
	});
};

export const usePasswordResetConfirmation = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: PASSWORD_RESET_CONFIRM,
		mutationKey: ["password-reset-confirm"],
		onSuccess: (data) => {
			toast.success(data, {
				position: "top-center",
			});

			router.push("/success");
		},
		onError: (error) => {
			console.error("Password reset confirmation failed:", error);
			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data.detail, {
					description:
						"Please request a new password reset link and try again.",
					position: "top-center",
				});
			} else {
				const errorMessage =
					`An error occurred: ${
						(error.message,
						{
							position: "top-center",
						})
					}` || "An error occurred. Please try again.";
				toast.error(errorMessage, {
					position: "top-center",
				});
			}
		},
	});
};

export const useVerifyEmail = () => {
	const router = useRouter();
	return useMutation({
		mutationFn: VERIFY_EMAIL,
		mutationKey: ["verify-email"],
		onSuccess: (data) => {
			toast.success(data, {
				position: "top-center",
			});
			router.push("/verified");
		},
		onError: (error) => {
			console.error("Email verification failed:", error);
			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data.detail, {
					position: "top-center",
				});
			} else {
				const errorMessage =
					`An error occurred: ${error.message}` ||
					"An error occurred. Please try again.";
				toast.error(errorMessage, {
					position: "top-center",
				});
			}
		},
	});
};
