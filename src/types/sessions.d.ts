// import { LucideIcon } from "lucide-react";

// interface MockSession {
// 	id: string;
// 	tutor: { name: string; avatar: string };
// 	subject: string;
// 	subjectIcon: LucideIcon;
// 	date: string; // YYYY-MM-DD
// 	startTime: string; // HH:MM (24-hour format)
// 	endTime: string; // HH:MM (24-hour format)
// 	status: "upcoming" | "live" | "completed" | "missed"; // Derived status
// 	tutorNotes?: string;
// 	parentFeedback?: string;
// }

interface SessionDetails {
	id: string;
	schedule_id: string;
	student_id: string;
	tutor_id: string;
	provider: string;
	channel_name: string;
	status: "active" | "completed";
	start_at: string;
	end_at: string;
	transcript_enabled: boolean;
	transcript_uri: string;
	created_at: string;
	topic_id: string;
}

interface CreateSessionFormData {
	schedule_id: string;
	tutor_id: string;
	student_id: string;
	transcript_enabled: boolean;
}

interface StartSessionFormData {
	session_id: string;
	role: "tutor" | "student";
}

interface StartSessionResponse {
	app_id: string;
	channel_name: string;
	token: string;
	expires_in: number;
}

interface MediaDevice {
	deviceId: string;
	label: string;
	kind: string;
}

interface SessionData {
	app_id: string;
	channel_name: string;
	token: string | null;
}

interface EndSessionRequestData {
	session_id: string;
	transcript_text: string;
	topic_hint: string;
}

type EndSessionResponse = SessionDetails;

interface EnterClassroomRequestData {
	role: "tutor" | "student";
	session_id: string;
	transcript_enabled: boolean;
}

interface EnterClassroomResponse {
	app_id: string;
	channel_name: string;
	token: string;
	expires_in: number;
}
