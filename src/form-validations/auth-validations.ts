/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";
import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

// Schema for validating login request data
export const loginRequestSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

// Schema for validating forgot password request data
export const forgotPasswordRequestSchema = z.object({
	email: z.email("Invalid email address"),
});

// Schema for validating password reset confirmation data
export const passwordResetConfirmSchema = z
	.object({
		new_password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" })
			.max(32, { message: "Password must be at most 32 characters long" })
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter",
			})
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter",
			})
			.regex(/[0-9]/, { message: "Password must contain at least one number" })
			.regex(/[^A-Za-z0-9]/, {
				message: "Password must contain at least one special character",
			}),
		confirmPassword: z.string().nonempty("Please confirm your password"),
	})
	.refine((data) => data.new_password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export const userProfileUpdateSchema = z.object({
	target_user_id: z.string().nonempty("User ID is required"),
	first_name: z
		.string()
		.nonempty("First name is required")
		.max(50, "First name is too long")
		.optional(),
	last_name: z
		.string()
		.nonempty("Last name is required")
		.max(50, "Last name is too long")
		.optional(),
	email: z
		.email("Invalid email address")
		.nonempty("Email is required")
		.optional(),
	role: z
		.enum(["student", "tutor", "moderator", "parent"], {
			error: "Role is required",
		})
		.optional(),
	other_details: z
		.object({
			phone: z
				.string()
				.refine(
					(phone) => {
						try {
							return phoneUtil.isValidNumber(phoneUtil.parse(phone, "US"));
						} catch (error) {
							return false;
						}
					},
					{
						message: "Invalid phone number",
					}
				)
				.optional(),
			address: z.string().optional(),
		})
		.optional(),
});

export const userContactUpdateSchema = z.object({
	phone: z
		.string()
		.refine((phone) => phoneUtil.isValidNumber(phoneUtil.parse(phone)), {
			message: "Invalid phone number",
		}),
});

export const userPasswordUpdateSchema = z.object({
	current_password: z.string().nonempty("Current password is required"),
	new_password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long" })
		.max(32, { message: "Password must be at most 32 characters long" })
		.regex(/[A-Z]/, {
			message: "Password must contain at least one uppercase letter",
		})
		.regex(/[a-z]/, {
			message: "Password must contain at least one lowercase letter",
		})
		.regex(/[0-9]/, {
			message: "Password must contain at least one number",
		})
		.regex(/[!@#$%^&*(),.?":{}|<>]/, {
			message: "Password must contain at least one special character",
		}),
});
