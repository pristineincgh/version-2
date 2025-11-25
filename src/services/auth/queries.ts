import { useQuery } from "@tanstack/react-query";
import { GET_AUTHENTICATED_USER } from "./endpoints";

export const useGetAuthenticatedUserQuery = () => {
	return useQuery({
		queryKey: ["authenticatedUser"],
		queryFn: GET_AUTHENTICATED_USER,
	});
};
