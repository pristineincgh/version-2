"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthorized, isPublicRoute, redirectBasedOnRole } from "@/lib/auth";
import { GET_AUTHENTICATED_USER } from "@/services/auth/endpoints";
import { getAuthState, getAuthUser, setUser } from "@/store/useAuthStore";
import FirstLoginModal from "@/components/modals/FirstLoginModal";
import MainLoader from "@/components/loaders/MainLoader";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isFirstLogin, setIsFirstLogin] = useState(false);

	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		let isMounted = true;

		const checkAuth = async () => {
			try {
				// Wait briefly to ensure storage is hydrated
				await new Promise((resolve) => setTimeout(resolve, 100));

				const { accessToken, firstLogin } = getAuthState();

				if (firstLogin) {
					setIsFirstLogin(firstLogin);
					// return;
				}

				const user = getAuthUser();

				if (!accessToken && !isPublicRoute(pathname)) {
					router.push("/login");
					return;
				}

				if (user && accessToken) {
					if (!isAuthorized(user.role, pathname)) {
						router.push(redirectBasedOnRole(user.role));
						return;
					}
				}

				if (!user && accessToken) {
					// Attempt to fetch user if token exists but user data is missing
					try {
						const userData = await GET_AUTHENTICATED_USER();
						setUser(userData);
					} catch (error) {
						console.error("Failed to fetch user:", error);
						router.push("/auth");
						return;
					}
				}

				if (isMounted) setIsLoading(false);
			} catch (error) {
				console.error("Authentication check failed:", error);
				router.push("/auth");
			}
		};

		checkAuth();

		return () => {
			isMounted = false;
		};
	}, [pathname, router]);

	if (isLoading) {
		return (
			<section className="fixed z-50 inset-0 flex items-center justify-center bg-background">
				<div className="flex flex-col items-center gap-2">
					<MainLoader />
				</div>
			</section>
		);
	}

	return (
		<>
			{children}

			{isFirstLogin && <FirstLoginModal open={true} onOpen={setIsFirstLogin} />}
		</>
	);
};
