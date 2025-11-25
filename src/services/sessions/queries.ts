import { useQuery } from "@tanstack/react-query";
import {
	GET_SESSION,
	LIST_ALL_SESSIONS,
	LIST_SESSIONS_FOR_STUDENT,
	LIST_SESSIONS_FOR_TUTOR,
} from "./endpoints";

export const useGetAllSessionsQuery = () => {
	return useQuery({
		queryKey: ["all-sessions"],
		queryFn: () => LIST_ALL_SESSIONS(),
	});
};

export const useGetSessionQuery = (sessionId: string) => {
	return useQuery({
		queryKey: ["session", sessionId],
		queryFn: () => GET_SESSION(sessionId),
	});
};

export const useGetSessionsForStudentQuery = (studentId: string) => {
	return useQuery({
		queryKey: ["student-sessions", studentId],
		queryFn: () => LIST_SESSIONS_FOR_STUDENT(studentId),
	});
};

export const useGetSessionsForTutorQuery = (tutorId: string) => {
	return useQuery({
		queryKey: ["tutor-sessions", tutorId],
		queryFn: () => LIST_SESSIONS_FOR_TUTOR(tutorId),
	});
};
