import { publicRoutes, rolePaths } from "@/constants/routes";

export function redirectBasedOnRole(role: string) {
	switch (role) {
		case "parent":
			return "/parent";
		case "tutor":
			return "/tutor";
		case "moderator":
			return "/moderator"; // TODO: change route to /moderator
		default:
			return "/student";
	}
}

export function isAuthorized(role: string, pathname: string) {
	return (
		rolePaths[role as keyof typeof rolePaths]?.some((path) =>
			pathname.startsWith(path)
		) || false
	);
}

export function isPublicRoute(pathname: string) {
	return publicRoutes.find((route) => pathname.startsWith(route));
}
