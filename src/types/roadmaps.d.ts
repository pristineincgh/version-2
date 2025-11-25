interface Roadmap {
	id: string;
	title: string;
	description: string;
	is_template: boolean;
	banner_image_url: string;
	tags: string[];
	created_by: string;
	created_at: Date;
	updated_at: Date;
	status: string | null;
}

interface RoadmapListResponse {
	total: number;
	items: Roadmap[];
}

interface Topic {
	id: string;
	course_id: string;
	title: string;
	description: string;
	duration_hours: number;
	order_index: number;
	status: RoadmapStatus;
	created_at: Date;
	updated_at: Date;
}

interface Course {
	id: string;
	learning_path_id: string;
	title: string;
	description: string;
	delivery_mode: string;
	duration_weeks: number;
	status: RoadmapStatus;
	order_index: number;
	created_at: Date;
	updated_at: Date;
}

interface CourseDetails extends Course {
	max_session_duration_mins: number;
	topics: Topic[];
}

interface LearningPath {
	id: string;
	roadmap_id: string;
	title: string;
	description: string;
	duration_months: number;
	status: RoadmapStatus;
	order_index: number;
	courses: CourseDetails[];
	created_at: Date;
	updated_at: Date;
}

interface Assignment {
	id: string;
	learning_path_id: string;
	title: string;
	description: string;
	due_date: Date;
	order_index: number;
	created_at: Date;
	updated_at: Date;
}

interface RoadmapDetail {
	id: string;
	title: string;
	description: string;
	is_template: boolean;
	public_visibility: boolean;
	banner_image_url: string;
	tags: string[];
	created_by: string;
	original_template_id: string | null;
	student_id: string | null;
	learning_paths: LearningPath[];
	assignments: Assignment[];
	created_at: Date;
	updated_at: Date;
	status: RoadmapStatus;
}

interface NewRoadmapFormData {
	title: string;
	description: string;
	public_visibility: boolean;
	original_template_id?: string | undefined | null;
	tags?: string | undefined | null;
	banner_image?: File | undefined | null;
}

interface OnboardStudentToRoadmapFormData {
	original_template_id: string;
	student_id: string;
}

interface NewRoadmap {
	title: string;
	description: string;
	public_visibility: boolean;
	original_template_id?: string | undefined | null;
	tags?: string[] | undefined | null;
}

interface UpdateRoadmapFormData {
	title?: string;
	description?: string;
	is_template?: boolean;
	original_template_id?: string | undefined | null;
	tags?: string[] | undefined | null;
}

interface NewLearningPathFormData {
	roadmap_id: string;
	title: string;
	description: string;
	duration_months: number;
	order_index: number;
}

interface NewCourseFormData {
	learning_path_id: string;
	title: string;
	description: string;
	delivery_mode: string;
	duration_weeks: number;
	max_session_duration_mins: number;
	order_index: number;
}

interface NewTopicFormData {
	course_id: string;
	title: string;
	description: string;
	duration_hours: number;
	order_index: number;
}

interface AssignRoadmapToStudentFormData {
	roadmap_id: string;
	student_id: string;
}

interface AssignRoadmapToStudentResponse {
	roadmap_id: string;
	student_id: string;
	status: string;
	assignment_id: string;
	created_by: string;
	created_at: Date;
	updated_at: Date;
}

interface StudentTopicProgressReport {
	topic_id: string;
	student_id: string;
	status: RoadmapStatus;
	progress_percentage: number;
	completed_at: Date;
}

interface StudentCourseProgressReport {
	course_id: string;
	student_id: string;
	status: RoadmapStatus;
	progress_percentage: number;
	completed_at: Date;
	topics: StudentTopicProgressReport[];
}

interface StudentLearningPathProgressReport {
	learning_path_id: string;
	student_id: string;
	status: RoadmapStatus;
	progress_percentage: number;
	completed_at: Date;
	courses: StudentCourseProgressReport[];
}

interface StudentRoadmapProgressReport {
	roadmap_id: string;
	student_id: string;
	status: RoadmapStatus;
	progress_percentage: number;
	completed_at: Date;
	learning_paths: StudentLearningPathProgressReport[];
}

interface AttachRoadmapDocumentFormData {
	roadmap_id: string;
	name: string; // Document name
	doc_type: UploadDocumentType; // Document type
	file: File;
}

interface AttachRoadmapDocumentResponse {
	id: string;
	roadmap_id: string;
	name: string;
	file_url: string;
	doc_type: DocumentType;
	uploaded_by: string;
	uploaded_at: Date;
}
