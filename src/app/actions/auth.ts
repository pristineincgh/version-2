"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setAuthToken = async ({
	accessToken,
	refreshToken,
}: {
	accessToken: string;
	refreshToken: string;
}) => {
	const cookieStore = await cookies();

	cookieStore.set("accessToken", accessToken, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/", // available everywhere
		maxAge: 60 * 60, // 1 hour
	});

	cookieStore.set("refreshToken", refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/",
		maxAge: 60 * 60 * 24 * 30, // 30 days
	});
};

export const getAccessToken = async () => {
	const token = (await cookies()).get("accessToken")?.value;
	return token;
};

export const setAuthUser = async (user: string) => {
	const cookieStore = await cookies();

	cookieStore.set("user", user, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/", // available everywhere
		maxAge: 60 * 60 * 24 * 1, // 1 day
	});
};

export const getServerUser = async () => {
	const user = (await cookies()).get("user")?.value;
	return user;
};

export async function login(credentials: LoginRequestInput) {
	const { email, password } = credentials;

	try {
		// Call external backend login
		const response = await fetch(`${process.env.API_BASE_URL}/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			throw new Error("Login failed");
		}

		const { idToken, refreshToken } = await response.json();

		// Set cookies
		const cookieStore = await cookies();
		cookieStore.set("accessToken", idToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 60,
		});

		cookieStore.set("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 30 * 24 * 3600, // 30 days
		});

		return { success: true };
	} catch (error) {
		return {
			success: false,
			error: "Login failed. Please check your credentials.",
		};
	}
}

export async function logout(userId: string) {
	const cookieStore = await cookies();

	// Optional: Call external backend logout
	try {
		const { getValidToken } = await import("@/lib/newAuth");
		const token = await getValidToken();

		await fetch(`${process.env.API_BASE_URL}/users/logout`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ target_user_id: userId }),
		});
	} catch (error) {
		// Ignore errors during logout
	}

	// Clear cookies
	cookieStore.delete("accessToken");
	cookieStore.delete("refreshToken");

	redirect("/login");
}
