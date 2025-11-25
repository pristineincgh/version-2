import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
	try {
		const cookieStore = await cookies();
		const refresh_token = cookieStore.get("refreshToken")?.value;

		if (!refresh_token) {
			return NextResponse.json(
				{ error: "No refresh token available" },
				{ status: 401 }
			);
		}

		// Call your external backend to refresh tokens
		const response = await fetch(`${process.env.API_BASE_URL}/users/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refresh_token: refresh_token }),
		});

		if (!response.ok) {
			throw new Error("Refresh failed");
		}

		const { idToken, refreshToken } = await response.json();

		// Update cookies
		const nextResponse = NextResponse.json({
			success: true,
			access_token: idToken,
			refresh_token: refreshToken,
		});

		nextResponse.cookies.set("accessToken", idToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 60,
		});

		if (refresh_token) {
			nextResponse.cookies.set("refreshToken", refresh_token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				maxAge: 30 * 24 * 3600, // 30 days
			});
		}

		return nextResponse;
	} catch (error) {
		// Clear tokens on failure
		const nextResponse = NextResponse.json(
			{ error: "Token refresh failed" },
			{ status: 401 }
		);

		nextResponse.cookies.delete("accessToken");
		nextResponse.cookies.delete("refreshToken");

		return nextResponse;
	}
}
