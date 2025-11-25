export enum RoadmapStatus {
	NOT_STARTED = "not_started",
	IN_PROGRESS = "in_progress",
	COMPLETED = "completed",
}

export enum UploadDocumentType {
	CURRICULUM = "curriculum",
	LEARNING_MATERIAL = "learning_material",
	OTHER = "other",
}

export enum HomeworkStatus {
	DRAFT = "draft",
	PUBLISHED = "published",
	SUBMITTED = "submitted",
	COMPLETED = "completed",
}

export enum UserRole {
	STUDENT = "student",
	TUTOR = "tutor",
	MODERATOR = "moderator",
	PARENT = "parent",
}

export enum PeriodType {
	MONTH = "month",
	WEEK = "week",
	DAY = "day",
}

export enum ReportStatus {
	PENDING = "pending",
	APPROVED = "approved",
	REJECTED = "rejected",
}

export enum ListStudentReportsScope {
	OVERALL = "overall",
	MONTH = "month",
	LAST_6_MONTHS = "last_6_months",
	LAST_12_MONTHS = "last_12_months",
	CALENDAR_YEAR = "calendar_year",
	CALENDAR_YEAR_MONTH = "calendar_year_month",
}

export enum Day {
	MONDAY = "Monday",
	TUESDAY = "Tuesday",
	WEDNESDAY = "Wednesday",
	THURSDAY = "Thursday",
	FRIDAY = "Friday",
	SATURDAY = "Saturday",
	SUNDAY = "Sunday",
}

export enum NotificationEnum {
	LESSON_STARTED = "lesson_started",
	TUTOR_ASSIGNED = "tutor_assigned",
	LESSON_SCHEDULED = "lesson_scheduled",
	CHAT_MSG = "chat_message",
	LESSON_COMPLETED = "lesson_completed",
}

export enum QuizStatus {
	PUBLISHED = "published",
	AWAITING_APPROVAL = "awaiting_approval",
}
