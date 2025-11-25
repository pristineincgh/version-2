interface INotification {
	id: string;
	type: string;
	title: string;
	body: string;
	is_read: boolean;
	created_at: Date;
	email_sent: boolean;
}

interface INotificationList {
	total: number;
	notifications: INotification[];
}

interface IMarkNotificationAsReadRequest {
	notification_id: string;
}
