"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMyNotifications } from "@/services/notifications/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef } from "react";
import NotificationCard from "./cards/NotificationCard";
import EmptyStateCard from "./cards/EmptyStateCard";

const notificationSound = "/sounds/notification-bells.mp3";

const NotificationMenu = () => {
	const { data: notifications } = useGetMyNotifications();
	const previousNotifications = useRef(notifications?.notifications || []);

	const readNotifications = notifications?.notifications?.filter(
		(notification) => notification.is_read
	);

	const unreadNotifications = notifications?.notifications?.filter(
		(notification) => !notification.is_read
	);

	useEffect(() => {
		if (
			notifications?.notifications &&
			notifications.notifications.length > previousNotifications.current.length
		) {
			// Find the new notifications by comparing with previous
			const newNotifications = notifications.notifications.filter(
				(notification) =>
					!previousNotifications.current.some(
						(prev) => prev.id === notification.id
					)
			);

			// If there are new unread notifications, play the sound
			if (newNotifications.some((notification) => !notification.is_read)) {
				const audio = new Audio(notificationSound);
				audio.play().catch((e) => console.log("Audio play failed:", e));
			}
		}

		// Update the previous notifications
		if (notifications?.notifications) {
			previousNotifications.current = notifications.notifications;
		}
	}, [notifications?.notifications]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="icon"
					variant="outline"
					className="rounded-full hover:bg-muted dark:hover:bg-muted-foreground/10 relative"
				>
					{unreadNotifications && unreadNotifications?.length > 0 && (
						<span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full" />
					)}
					<Bell />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				sideOffset={10}
				collisionPadding={24}
				className="w-[20rem] sm:w-100 max-h-140 space-y-2"
			>
				<DropdownMenuLabel>Notifications</DropdownMenuLabel>
				<DropdownMenuGroup>
					{notifications && notifications.notifications.length > 0 ? (
						<Tabs defaultValue="all" className="w-full space-y-2">
							<TabsList className="w-full">
								<TabsTrigger value="all">
									All{" "}
									<span className="text-primary">
										({notifications?.notifications?.length})
									</span>
								</TabsTrigger>
								<TabsTrigger value="unread">
									Unread{" "}
									<span className="text-primary">
										({unreadNotifications?.length})
									</span>
								</TabsTrigger>
								<TabsTrigger value="read">
									Read{" "}
									<span className="text-primary">
										({readNotifications?.length})
									</span>
								</TabsTrigger>
							</TabsList>
							<TabsContent value="all" className="space-y-2">
								{notifications?.notifications?.map((notification) => (
									<NotificationCard
										key={notification.id}
										notification={notification}
									/>
								))}
							</TabsContent>
							<TabsContent value="unread" className="space-y-2">
								{unreadNotifications?.length === 0 ? (
									<EmptyStateCard
										title="No unread notifications"
										description="You have no unread notifications"
									/>
								) : (
									unreadNotifications?.map((notification) => (
										<NotificationCard
											key={notification.id}
											notification={notification}
										/>
									))
								)}
							</TabsContent>
							<TabsContent value="read" className="space-y-2">
								{readNotifications?.length === 0 ? (
									<EmptyStateCard
										title="No read notifications"
										description="You have no read notifications"
									/>
								) : (
									readNotifications?.map((notification) => (
										<NotificationCard
											key={notification.id}
											notification={notification}
										/>
									))
								)}
							</TabsContent>
						</Tabs>
					) : (
						<EmptyStateCard
							title="No notifications"
							description="You have no notifications at the moment."
						/>
					)}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
export default NotificationMenu;
