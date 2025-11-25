import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { LIST_SESSIONS_FOR_STUDENT } from "../sessions/endpoints";
import { getUpcomingSchedule } from "@/lib/schedules/getUpcomingSchedule";
import { GET_USER } from "../users/endpoints";
import { GET_TOPIC } from "../topics/endpoints";

export const CREATE_SCHEDULE = async (data: CreateScheduleFormData) => {
	const response = await apiClient.post<Schedule>("/lessons/schedules", data);

	return response.data;
};

export const LIST_ALL_SCHEDULES = async () => {
	const response = await apiClient.get<{
		total: number;
		items: Schedule[];
	}>("/lessons/schedules");
	return response.data;
};

export const LIST_SCHEDULES_FOR_TUTOR_STUDENT = async (
	student_id?: string,
	tutor_id?: string
) => {
	if (!student_id && !tutor_id) {
		throw new Error("Student ID or Tutor ID is required");
	}

	const params: Record<string, string> = {};

	if (student_id) params.student_id = student_id;
	if (tutor_id) params.tutor_id = tutor_id;

	const response = await apiClient.get<{
		total: number;
		items: Schedule[];
	}>("/lessons/schedules", {
		params,
	});

	return response.data;
};

export const LIST_SCHEDULES_FOR_STUDENT = async (student_id: string) => {
	if (!student_id) {
		toast.error("Student ID is required");
		return;
	}

	const response = await apiClient.get<{
		total: number;
		items: Schedule[];
	}>("/lessons/schedules", {
		params: {
			student_id,
		},
	});

	return response.data;
};

export const LIST_SCHEDULES_FOR_TUTOR = async (tutor_id: string) => {
	if (!tutor_id) {
		toast.error("Tutor ID is required");
		return;
	}

	const params: Record<string, string> = {};

	params.tutor_id = tutor_id;

	const response = await apiClient.get<{
		total: number;
		items: Schedule[];
	}>("/lessons/schedules", {
		params,
	});

	return response.data;
};

export const UPDATE_SCHEDULE = async (data: {
	id: string;
	schedule: UpdateScheduleFormData;
}) => {
	const response = await apiClient.put<Schedule>(
		`/lessons/schedules/${data.id}`,
		data.schedule
	);
	return response.data;
};

export const DELETE_SCHEDULE = async (id: string) => {
	const response = await apiClient.delete(`/lessons/schedules/${id}`);
	return response.data;
};

export const ENABLE_SCHEDULE = async (id: string) => {
	const response = await apiClient.patch<Schedule>(
		`/lessons/schedules/${id}/enable`
	);
	return response.data;
};

export const DISABLE_SCHEDULE = async (id: string) => {
	const response = await apiClient.patch<Schedule>(
		`/lessons/schedules/${id}/disable`
	);
	return response.data;
};

export const GET_UPCOMING_LESSON_BY_STUDENT_ID = async ({
	queryKey,
}: {
	queryKey: [string, string];
}) => {
	const [_key, studentId] = queryKey;

	// 1. Get schedules and sessions in parallel
	const [schedulesResponse, sessionsResponse] = await Promise.all([
		LIST_SCHEDULES_FOR_STUDENT(studentId),
		LIST_SESSIONS_FOR_STUDENT(studentId),
	]);

	const schedules = schedulesResponse?.items || [];
	const sessions = sessionsResponse || [];

	// 2. Determine upcoming schedule
	const upcomingSchedule = getUpcomingSchedule(schedules, sessions);

	// get active session
	const activeSession = sessions.find((session) => session.status === "active");

	// Determine topic and tutor
	const tutorId = upcomingSchedule?.tutor_id;
	const topicId = activeSession?.topic_id ?? upcomingSchedule?.topic_id;

	// 3. Fetch tutor and topic in parallel (only if needed)
	const [tutor, topic] = await Promise.all([
		tutorId ? GET_USER(tutorId) : Promise.resolve(null),
		topicId ? GET_TOPIC(topicId) : Promise.resolve(null),
	]);

	return {
		schedules: schedulesResponse,
		sessions: sessionsResponse,
		activeSession,
		upcomingSchedule,
		tutor,
		topic,
	};
};
