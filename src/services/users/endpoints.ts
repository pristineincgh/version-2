import apiClient from "@/lib/api-client";

/******************
 *  GET REQUESTS
 * ****************/
export const GET_USERS = async () => {
	const response = await apiClient.get<UserListResponse>("/users");

	return response.data.users;
};

export const GET_USER = async (userId?: string) => {
	const response = await apiClient.get<User>(`/users/${userId}`);

	return response.data;
};

export const GET_USER_WITH_FREE_SLOTS = async (userId: string) => {
	const response = await apiClient.get<UserWithFreeSlots>(
		`/users/${userId}/profile`
	);

	return response.data;
};

/******************
 *  POST REQUESTS
 * ****************/
export const CREATE_USER = async (data: CreateNewUserRequest) => {
	const response = await apiClient.post("/users/register", data);

	return response.data;
};

export const RESEND_VERIFICATION_EMAIL = async (email: string) => {
	const response = await apiClient.post("/users/verify-email/resend", {
		email,
	});
	const { message } = response.data;

	return message;
};

export const UPDATE_USER_STATUS = async (data: UpdateUserStatusRequest) => {
	const response = await apiClient.post("/users/status", data);
	const { message } = response.data;

	return message;
};

export const DELETE_USER_ACCOUNT = async (userId: string) => {
	const response = await apiClient.delete(`/users/${userId}`);
	const { message } = response.data;

	return message;
};
