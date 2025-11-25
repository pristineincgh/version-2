import apiClient from "@/lib/api-client";

export const LOGIN_USER = async (credentials: LoginRequestInput) => {
	const response = await apiClient.post("/users/login", credentials);
	const { idToken, refreshToken, customToken, first_login, message } =
		response.data;

	return {
		idToken,
		refreshToken,
		customToken,
		first_login,
		message,
	} as LoginResponse;
};

export const GET_AUTHENTICATED_USER = async () => {
	const response = await apiClient.get("/users/me");

	return response.data.user as AuthUser;
};

export const LOGOUT_USER = async (userID: string) => {
	const response = await apiClient.post("/users/logout", {
		target_user_id: userID,
	});
	const { message } = response.data;

	return message;
};

export const PASSWORD_RESET_REQUEST = async (email: string) => {
	const response = await apiClient.post("/users/password-reset-request", {
		email,
	});
	const { message } = response.data;

	return message;
};

export const GET_NEW_ACCESS_TOKEN = async (refresh_token: string) => {
	const response = await apiClient.post("/users/refresh", {
		refresh_token,
	});
	const { idToken, refreshToken } = response.data;

	return {
		accessToken: idToken,
		refreshToken,
	};
};

export const PASSWORD_RESET_CONFIRM = async ({
	oob_code,
	new_password,
}: {
	oob_code: string;
	new_password: string;
}) => {
	const response = await apiClient.post("/users/password-reset-confirm", {
		oob_code,
		new_password,
	});
	const { message } = response.data;

	return message;
};

export const VERIFY_EMAIL = async (oob_code: string) => {
	const response = await apiClient.post("/users/verify-email/confirm", {
		oob_code,
	});
	const { message } = response.data;

	return message;
};
