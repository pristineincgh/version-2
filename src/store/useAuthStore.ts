import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	firstLogin: boolean;
	user: AuthUser | null;
	storedEmail: string | null;
	setUser: (user: AuthUser) => Promise<void>;
	setAuth: (
		accessToken: string,
		refreshToken: string,
		firstLogin?: boolean
	) => Promise<void>;
	upDateFirstLogin: (firstLogin: boolean) => void;
	clearAuth: () => Promise<void>;
	loggingOut: boolean;
	setLoggingOut: (loggingOut: boolean) => void;
	setStoredEmail: (email: string) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			accessToken: null,
			refreshToken: null,
			firstLogin: false,
			user: null,
			loggingOut: false,
			storedEmail: null,
			setUser: async (user: AuthUser) => {
				set({ user });
			},
			setAuth: async (
				accessToken: string,
				refreshToken: string,
				firstLogin?: boolean
			) => {
				set({
					accessToken,
					refreshToken,
					firstLogin,
				});
			},
			upDateFirstLogin: (firstLogin: boolean) => {
				set({ firstLogin });
			},
			clearAuth: async () => {
				set({
					accessToken: null,
					refreshToken: null,
					firstLogin: false,
					user: null,
				});
				sessionStorage.removeItem("auth-storage");
			},
			setLoggingOut: (loggingOut: boolean) => {
				set({ loggingOut });
			},
			setStoredEmail: (email: string) => {
				set({ storedEmail: email });
			},
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

export const getAuthState = () => useAuthStore.getState();

export const setTokens = (
	accessToken: string,
	refreshToken: string,
	firstLogin?: boolean
) => useAuthStore.getState().setAuth(accessToken, refreshToken, firstLogin);

export const logout = () => useAuthStore.getState().clearAuth();

export const getAuthUser = () => useAuthStore.getState().user;

export const setUser = (user: AuthUser) =>
	useAuthStore.getState().setUser(user);

export const setUserFirstLogin = (firstLogin: boolean) =>
	useAuthStore.getState().upDateFirstLogin(firstLogin);
