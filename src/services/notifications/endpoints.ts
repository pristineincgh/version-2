import apiClient from "@/lib/api-client";

/******************
 *  GET REQUESTS
 * ****************/
export const GET_MY_NOTIFICATIONS = async () => {
	const response = await apiClient.get<INotificationList>("/notifications");

	return response.data;
};

/******************
 *  POST REQUESTS
 * ****************/
export const MARK_NOTIFICATIONS_AS_READ = async (
	data: IMarkNotificationAsReadRequest
) => {
	const response = await apiClient.post<{ message: string }>(
		"/notifications/read",
		data
	);

	return response.data;
};

/******************
 *  DELETE REQUESTS
 * ****************/
export const DELETE_NOTIFICATION = async (notificationId: string) => {
	const response = await apiClient.delete<{ message: string }>(
		`/notifications/${notificationId}`
	);

	return response.data;
};
