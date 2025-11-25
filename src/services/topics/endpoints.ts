import apiClient from "@/lib/api-client";
import { AxiosError } from "axios";

export const LIST_TOPICS = async (): Promise<Topic[]> => {
	const response = await apiClient.get<Topic[]>("/topics");

	return response.data;
};

export const LIST_COURSE_TOPICS = async (courseId: string) => {
	const response = await apiClient.get<Topic[]>("/topics", {
		params: {
			course_id: courseId,
		},
	});

	return response.data;
};

export const LIST_STUDENT_TOPICS_WITH_STATUS = async (studentId: string) => {
	const response = await apiClient.get<Topic[]>("/topics", {
		params: {
			student_id: studentId,
		},
	});

	return response.data;
};

export const GET_TOPIC = async (topicId: string): Promise<Topic | null> => {
	try {
		const { data } = await apiClient.get<Topic>(`/topics/${topicId}`);
		return data;
	} catch (error) {
		if (error instanceof AxiosError && error.response?.status === 404) {
			// Return null for 404s to trigger notFound()
			return null;
		}
		// Re-throw other errors to be caught by Error Boundary
		throw error;
	}
};

export const GET_TOPIC_WITH_STATUS = async (
	studentId: string,
	topicId: string
) => {
	const response = await apiClient.get<Topic>(`/topics/${topicId}`, {
		params: {
			student_id: studentId,
		},
	});

	return response.data;
};

export const CREATE_TOPIC = async (data: NewTopicFormData) => {
	const response = await apiClient.post<Topic>(`/topics`, data);
	return response.data;
};

export const UPDATE_TOPIC = async (data: {
	topicId: string;
	topic: NewTopicFormData;
}) => {
	const response = await apiClient.put<Topic>(
		`/topics/${data.topicId}`,
		data.topic
	);
	return response.data;
};

export const DELETE_TOPIC = async (topicId: string) => {
	const response = await apiClient.delete<Topic>(`/topics/${topicId}`);
	return response.data;
};

export const SET_TOPIC_PROGRESS = async (data: {
	topicId: string;
	progress: string;
	studentId: string;
}) => {
	const response = await apiClient.put<Topic>(
		`/topics/${data.topicId}/progress`,
		{
			status: data.progress,
			student_id: data.studentId,
		}
	);
	return response.data;
};
