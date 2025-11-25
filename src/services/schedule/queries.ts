import { useQuery } from "@tanstack/react-query";
import {
	LIST_SCHEDULES_FOR_STUDENT,
	LIST_SCHEDULES_FOR_TUTOR,
	LIST_SCHEDULES_FOR_TUTOR_STUDENT,
	LIST_ALL_SCHEDULES,
	GET_UPCOMING_LESSON_BY_STUDENT_ID,
} from "./endpoints";

export const useListAllSchedulesQuery = () => {
	return useQuery({
		queryKey: ["schedules"],
		queryFn: () => LIST_ALL_SCHEDULES(),
	});
};

export const useListSchedulesForTutorStudentQuery = (
	student_id?: string,
	tutor_id?: string
) => {
	return useQuery({
		queryKey: ["schedules", "tutor-student", student_id, tutor_id],
		queryFn: () => LIST_SCHEDULES_FOR_TUTOR_STUDENT(student_id, tutor_id),
		enabled: !!student_id || !!tutor_id,
	});
};

export const useListSchedulesForStudentQuery = (student_id: string) => {
	return useQuery({
		queryKey: ["schedules", "student", student_id],
		queryFn: () => LIST_SCHEDULES_FOR_STUDENT(student_id),
		enabled: !!student_id,
	});
};

export const useListSchedulesForTutorQuery = (tutor_id: string) => {
	return useQuery({
		queryKey: ["schedules", "tutor", tutor_id],
		queryFn: () => LIST_SCHEDULES_FOR_TUTOR(tutor_id),
		enabled: !!tutor_id,
	});
};

export const useUpcomingLessonQuery = (studentId: string) =>
	useQuery({
		queryKey: ["upcoming-lesson", studentId],
		queryFn: GET_UPCOMING_LESSON_BY_STUDENT_ID,
		enabled: !!studentId,
	});
