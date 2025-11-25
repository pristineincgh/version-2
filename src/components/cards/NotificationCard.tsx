"use client";

import { Card, CardContent } from "@/components/ui/card";
import { NotificationEnum } from "@/types/enums";
import { cn } from "@/lib/utils";
import { useMarkNotificationsAsRead } from "@/services/notifications/mutations";
import { Loader2 } from "lucide-react";
import {
	BsFileEarmarkArrowUpFill,
	BsChatTextFill,
	BsFileEarmarkTextFill,
	BsFileEarmarkBreakFill,
	BsQuestionLg,
} from "react-icons/bs";
import { TiUserAdd } from "react-icons/ti";

interface NotificationCardProps {
	notification: INotification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
	notification,
}) => {
	const { mutate, isPending } = useMarkNotificationsAsRead();

	const handleMarkAsRead = () => {
		mutate({ notification_id: notification.id });
	};

	const getIcon = () => {
		switch (notification.type) {
			case NotificationEnum.CHAT_MSG:
				return (
					<BsChatTextFill
						className={cn(
							"size-5",
							notification.is_read ? "text-muted-foreground" : "text-blue-500"
						)}
					/>
				);
			case NotificationEnum.LESSON_STARTED:
				return (
					<BsFileEarmarkArrowUpFill
						className={cn(
							"size-5",
							notification.is_read ? "text-muted-foreground" : "text-orange-500"
						)}
					/>
				);
			case NotificationEnum.TUTOR_ASSIGNED:
				return (
					<TiUserAdd
						className={cn(
							"size-5",
							notification.is_read ? "text-muted-foreground" : "text-violet-500"
						)}
					/>
				);
			case NotificationEnum.LESSON_SCHEDULED:
				return (
					<BsFileEarmarkTextFill
						className={cn(
							"size-5",
							notification.is_read ? "text-muted-foreground" : "text-primary"
						)}
					/>
				);
			case NotificationEnum.LESSON_COMPLETED:
				return (
					<BsFileEarmarkBreakFill
						className={cn(
							"size-5",
							notification.is_read ? "text-muted-foreground" : "text-green-500"
						)}
					/>
				);
			default:
				return (
					<BsQuestionLg
						className={cn(
							"size-5",
							notification.is_read ? "text-muted-foreground" : "text-primary"
						)}
					/>
				);
		}
	};

	return (
		<Card
			className={cn(
				"shadow-none border-none relative overflow-hidden transition-colors duration-200 ease-in-out",
				!notification.is_read ? "hover:bg-muted cursor-pointer" : ""
			)}
			onClick={!notification.is_read ? handleMarkAsRead : undefined}
		>
			{isPending && (
				<div className="absolute z-10 inset-0 bg-muted/50 grid place-content-center">
					<Loader2 className="animate-spin" />
				</div>
			)}

			<CardContent>
				{
					<div className="flex items-center gap-3">
						<div
							className={cn(
								"shrink-0 flex justify-center items-center rounded-full w-10 h-10",
								notification.type === NotificationEnum.CHAT_MSG &&
									!notification.is_read
									? "bg-blue-500/10"
									: "bg-muted",
								notification.type === NotificationEnum.LESSON_STARTED &&
									!notification.is_read
									? "bg-orange-500/10"
									: "bg-muted",
								notification.type === NotificationEnum.TUTOR_ASSIGNED &&
									!notification.is_read
									? "bg-violet-500/10"
									: "bg-muted",
								notification.type === NotificationEnum.LESSON_SCHEDULED &&
									!notification.is_read
									? "bg-primary/10"
									: "bg-muted",
								notification.type === NotificationEnum.LESSON_COMPLETED &&
									!notification.is_read
									? "bg-green-500/10"
									: "bg-muted"
							)}
						>
							{getIcon()}
						</div>
						<div className="text-sm">
							<h2
								className={cn(
									"font-semibold",
									notification.is_read
										? "text-muted-foreground"
										: "text-foreground"
								)}
							>
								{notification.type === NotificationEnum.TUTOR_ASSIGNED
									? "Tutor assigned"
									: notification.title}
							</h2>
							<p className="text-muted-foreground">{notification.body}</p>
						</div>
					</div>
				}
			</CardContent>
		</Card>
	);
};
export default NotificationCard;
