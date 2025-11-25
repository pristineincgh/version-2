"use server";

import { cookies } from "next/headers";

let refreshPromise: Promise<string> | null = null;

export async function refreshTokens(): Promise<string> {
	// Prevent multiple simultaneous refresh calls
	if (refreshPromise) {
		return refreshPromise;
	}

	refreshPromise = (async () => {
		try {
			const response = await fetch(
				`${process.env.NEXTAUTH_URL}/api/auth/refresh`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error("Refresh failed");
			}

			const { access_token } = await response.json();
			return access_token;
		} finally {
			refreshPromise = null;
		}
	})();

	return refreshPromise;
}

export async function getValidToken(): Promise<string> {
	const cookieStore = await cookies();
	let accessToken = cookieStore.get("accessToken")?.value;

	if (!accessToken || (await isTokenExpired(accessToken))) {
		accessToken = await refreshTokens();
	}

	return accessToken;
}

async function isTokenExpired(token: string): Promise<boolean> {
	try {
		const payload = JSON.parse(
			Buffer.from(token.split(".")[1], "base64").toString()
		);
		// Add 30-second buffer to refresh before actual expiration
		return payload.exp * 1000 < Date.now() + 30000;
	} catch {
		return true;
	}
}

export async function clearAuthTokens() {
	const cookieStore = await cookies();
	cookieStore.delete("accessToken");
	cookieStore.delete("refreshToken");
}
