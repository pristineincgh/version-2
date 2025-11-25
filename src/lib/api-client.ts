import axios, {
	AxiosInstance,
	AxiosError,
	InternalAxiosRequestConfig,
} from "axios";
import { getAuthState, logout, setTokens } from "@/store/useAuthStore";
import { GET_NEW_ACCESS_TOKEN } from "@/services/auth/endpoints";
import { setAuthToken } from "@/app/actions/auth";

// Define types for better type safety
interface AuthTokens {
	accessToken: string;
	refreshToken: string;
}

interface QueuedRequest {
	resolve: (value: string | PromiseLike<string>) => void;
	reject: (reason?: unknown) => void;
}

// --- Constants ---
const API_BASE_URL: string =
	process.env.NEXT_PUBLIC_API_BASE_URL ||
	"https://c-cove-dev-api-services-008-online.curiositycoveacademy.com/api/v1";
const HTTP_STATUS_UNAUTHORIZED = 401;
const RETRY_FLAG = "_retry"; // Using a constant for the retry flag

// --- Axios Instance ---
const apiClient: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// --- Token Refresh Queue ---
let isRefreshing: boolean = false;
let failedQueue: QueuedRequest[] = [];

const processQueue = (
	error: AxiosError | null,
	token: string | null = null
): void => {
	failedQueue.forEach((prom: QueuedRequest) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token as string); // Cast to string as we expect a token on success
		}
	});

	failedQueue = [];
};

// --- Request Interceptor ---
apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const { accessToken } = getAuthState();
		if (accessToken && config.headers) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error: AxiosError) => Promise.reject(error)
);

// --- Response Interceptor ---
apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			[RETRY_FLAG]?: boolean;
		};
		const { refreshToken } = getAuthState();

		// Check if it's a 401 error, not already retried, and a refresh token exists
		if (
			error.response?.status === HTTP_STATUS_UNAUTHORIZED &&
			originalRequest && // Ensure originalRequest is defined
			!originalRequest[RETRY_FLAG] &&
			refreshToken
		) {
			originalRequest[RETRY_FLAG] = true; // Mark as retried

			if (isRefreshing) {
				// If a refresh is already in progress, queue the request
				return new Promise<string>((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token: string) => {
						if (originalRequest.headers) {
							originalRequest.headers.Authorization = `Bearer ${token}`;
						}
						return apiClient(originalRequest);
					})
					.catch((err) => Promise.reject(err));
			}

			isRefreshing = true; // Set refreshing flag

			try {
				// Call the service to get a new access token
				const res: AuthTokens = await GET_NEW_ACCESS_TOKEN(refreshToken);

				const newAccessToken = res.accessToken;
				const newRefreshToken = res.refreshToken;

				// Update tokens in the store
				// Ensure customToken is handled correctly;
				setTokens(newAccessToken, newRefreshToken);
				setAuthToken({
					accessToken: newAccessToken,
					refreshToken: newRefreshToken,
				});

				// Process all queued requests with the new token
				processQueue(null, newAccessToken);

				// Retry the original failed request with the new access token
				if (originalRequest.headers) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				}
				return apiClient(originalRequest);
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					processQueue(err, null); // Process queue with error
				} else {
					console.error("Unexpected error during token refresh:", err);
					processQueue(
						new AxiosError(
							"An unexpected error occurred.",
							"ERR_UNKNOWN",
							originalRequest
						),
						null
					);
				}
				// Logout user on refresh token failure
				logout();
				window.location.href = "/auth";
			} finally {
				isRefreshing = false; // Reset refreshing flag
			}
		}

		// For any other error or if conditions are not met, reject the promise
		return Promise.reject(error);
	}
);

export default apiClient;
