class ApiClient {
	private baseURL: string;

	constructor() {
		this.baseURL = process.env.API_BASE_URL!;
	}

	private async fetchWithAuth(
		url: string,
		options: RequestInit = {}
	): Promise<Response> {
		const { getValidToken, refreshTokens } = await import("./newAuth");

		let token = await getValidToken();

		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			...options.headers,
		};

		let response = await fetch(`${this.baseURL}${url}`, {
			...options,
			headers,
		});

		// If token is expired, refresh and retry once
		if (response.status === 401) {
			token = await refreshTokens();
			headers.Authorization = `Bearer ${token}`;
			response = await fetch(`${this.baseURL}${url}`, {
				...options,
				headers,
			});
		}

		return response;
	}

	async get<T>(url: string): Promise<T> {
		const response = await this.fetchWithAuth(url);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	}

	async post<T>(url: string, data: any): Promise<T> {
		const response = await this.fetchWithAuth(url, {
			method: "POST",
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	}

	async put<T>(url: string, data: any): Promise<T> {
		const response = await this.fetchWithAuth(url, {
			method: "PUT",
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	}

	async delete<T>(url: string): Promise<T> {
		const response = await this.fetchWithAuth(url, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	}
}

export const apiClient = new ApiClient();
