import apiClient from "@/lib/api-client";

export const LIST_ALL_SESSIONS = async () => {
	const response = await apiClient.get<SessionDetails[]>("/lessons/sessions");
	return response.data;
};

export const LIST_SESSIONS_FOR_STUDENT = async (studentId: string) => {
	const response = await apiClient.get<SessionDetails[]>("/lessons/sessions", {
		params: {
			student_id: studentId,
		},
	});
	return response.data;
};

export const LIST_SESSIONS_FOR_TUTOR = async (tutorId: string) => {
	const response = await apiClient.get<SessionDetails[]>("/lessons/sessions", {
		params: {
			tutor_id: tutorId,
		},
	});
	return response.data;
};

export const GET_SESSION = async (sessionId: string) => {
	const response = await apiClient.get<SessionDetails>(
		`/lessons/sessions/${sessionId}`
	);
	return response.data;
};

export const END_SESSION = async (data: EndSessionRequestData) => {
	const response = await apiClient.post<EndSessionResponse>(
		`/lessons/sessions/${data.session_id}/end`,
		data
	);
	return response.data;
};

export const ENTER_CLASSROOM = async (data: EnterClassroomRequestData) => {
	const response = await apiClient.post<EnterClassroomResponse>(
		"/lessons/classroom/enter",
		{
			role: data.role,
			session_id: data.session_id,
			transcript_enabled: data.transcript_enabled,
		}
	);
	return response.data;
};
