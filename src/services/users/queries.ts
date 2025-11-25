import { useQuery } from "@tanstack/react-query";
import { GET_USER, GET_USER_WITH_FREE_SLOTS, GET_USERS } from "./endpoints";
import { usePathname } from "next/navigation";

export const useGetUsersQuery = () => {
	const pathname = usePathname();
	const isClient = pathname.includes("/client");

	return useQuery({
		queryKey: ["users"],
		queryFn: GET_USERS,
		enabled: !isClient,
	});
};

export const useGetUserByIdQuery = (userId?: string) => {
	const pathname = usePathname();
	const isClient = pathname.includes("/client");

	return useQuery({
		queryKey: ["user", userId],
		queryFn: () => GET_USER(userId),
		enabled: !!userId && !isClient,
	});
};

export const useGetUserWithFreeSlotsQuery = (userId: string) => {
	const pathname = usePathname();
	const isClient = pathname.includes("/client");

	return useQuery({
		queryKey: ["user", userId, "free-slots"],
		queryFn: () => GET_USER_WITH_FREE_SLOTS(userId),
		enabled: !!userId && !isClient,
	});
};
