import { useQuery } from "@tanstack/react-query";
import {
	GET_TOPIC,
	GET_TOPIC_WITH_STATUS,
	LIST_STUDENT_TOPICS_WITH_STATUS,
	LIST_TOPICS,
} from "./endpoints";

export const useGetTopicsQuery = () => {
	return useQuery({
		queryKey: ["topics"],
		queryFn: () => LIST_TOPICS(),
	});
};

export const useGetStudentTopicsWithStatusQuery = (studentId: string) => {
	return useQuery({
		queryKey: ["topics", "student", "status", studentId],
		queryFn: () => LIST_STUDENT_TOPICS_WITH_STATUS(studentId),
	});
};

export const useGetTopicQuery = (topicId: string) => {
	return useQuery({
		queryKey: ["topic", topicId],
		queryFn: () => GET_TOPIC(topicId),
		enabled: !!topicId,
	});
};

export const useGetTopicWithStatusQuery = (
	studentId: string,
	topicId: string
) => {
	return useQuery({
		queryKey: ["topic", "student", "status", studentId, topicId],
		queryFn: () => GET_TOPIC_WITH_STATUS(studentId, topicId),
	});
};
