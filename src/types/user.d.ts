interface LoginRequestInput {
	email: string;
	password: string;
}

interface LoginResponse {
	idToken: string; // access token
	refreshToken: string;
	customToken: string;
	first_login: boolean;
	message: string;
}

interface PasswordResetConfirmInput {
	new_password: string;
	confirmPassword: string;
}

interface UploadUserAvatarResponse {
	message: string;
	photo_url: string;
}

interface FirebaseUserIdentities {
	email: string[];
}

interface FirebaseUser {
	identities: FirebaseUserIdentities;
	sign_in_provider: string;
}

interface Availability {
	day: Day;
	time: string;
}

interface CustomClaims {
	role: UserRole;
	phone: string;
	address: string;
	created_at: string;
	updated_at: string;
	created_by: string;
	updated_by: string;
	specialty?: string[];
	availability?: Availability[];
	experience_years?: number;
	bio?: string;
	timezone?: string;
	delivery_mode?: string;
}

interface AuthUser {
	name: string;
	picture: string;
	role: UserRole;
	phone_number: string;
	created_at: string;
	updated_at: string;
	created_by: string;
	updated_by: string;
	phone: string;
	address: string;
	user_id: string;
	email: string;
	email_verified: boolean;
	uid: string;
}

interface User {
	uid: string;
	email: string;
	email_verified: boolean;
	photo_url: string;
	disabled: boolean;
	displayName: string;
	customClaims: CustomClaims | null;
	phone: string;
}

interface UserWithFreeSlots extends User {
	free_slots: Availability[];
}

interface UserListResponse {
	users: User[];
}

interface OtherDetails {
	phone?: string;
	address?: string;
	availability?: Availability[];
	specialty?: string[];
	experience_years?: number;
	bio?: string;
	timezone?: string;
	delivery_mode?: string;
}

interface NewUserRequestData {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	role: UserRole;
	other_details?: {
		phone?: string;
		address?: string;
		availability?: {
			day: Day;
			start_time: string;
			end_time: string;
		}[];
		specialty?: string[];
		experience_years?: number;
		bio?: string;
		timezone?: string;
		delivery_mode?: string;
	};
}

interface CreateNewUserRequest {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	role: UserRole;
	other_details?: OtherDetails;
}

interface UpdateProfileRequest {
	target_user_id: string;
	first_name?: string;
	last_name?: string;
	email?: string;
	role?: UserRole;
	other_details?: OtherDetails;
}

interface UpdateUserStatusRequest {
	target_user_id: string;
	action: "enable" | "disable";
}

interface UpdateContactRequest {
	phone: string;
}

interface UpdateNameRequest {
	first_name: string;
	last_name: string;
}

interface UpdatePasswordRequest {
	current_password: string;
	new_password: string;
}
