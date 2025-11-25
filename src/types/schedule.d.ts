interface CreateScheduleFormData {
	student_id: string;
	tutor_id: string;
	title: string;
	description: string;
	schedule_type: "once" | "recurring";
	start_at: Date;
	end_at: Date;
	timezone: string;
	transcript_enabled: boolean;
}

interface Schedule extends CreateScheduleFormData {
	id: string;
	topic_id: string;
	room_id: string;
	rrule: string;
	created_by: string;
	enabled: boolean;
	created_at: Date;
	updated_at: Date;
	slot: TutorSlot;
}

interface ScheduleWithNextOccurrence extends Schedule {
	nextOccurrence: number;
}

interface ScheduleWithTutorName extends Omit<Schedule, "tutor_name"> {
	tutor_name?: string;
}

interface UpdateScheduleFormData {
	student_id?: string;
	tutor_id?: string;
	title?: string;
	description?: string;
	schedule_type?: "once" | "recurring";
	start_at?: Date;
	end_at?: Date;
	timezone?: string;
}
