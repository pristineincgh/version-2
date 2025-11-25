"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserProfileImage from "@/components/UserProfileImage";
import { getInitials } from "@/lib/utils";
import { useLogout } from "@/services/auth/mutations";
import { getAuthUser } from "@/store/useAuthStore";
import Link from "next/link";
import { RiProfileLine, RiLogoutCircleRLine } from "react-icons/ri";

interface StudentAvatarDropDownProps {
	onLogoutStart: () => void;
	onLogoutEnd: () => void;
}

const StudentAvatarDropDown = ({
	onLogoutStart,
	onLogoutEnd,
}: StudentAvatarDropDownProps) => {
	const user = getAuthUser();

	const { mutate: logoutUser } = useLogout();

	// method to handle logout
	const handleLogout = () => {
		onLogoutStart();

		logoutUser(user?.uid as string, {
			onSettled: () => {
				onLogoutEnd();
			},
		});
	};

	if (user) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size={"icon"} className="rounded-full hidden md:flex">
						<UserProfileImage
							image={user.picture ?? ""}
							initials={getInitials(user.name)}
						/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					sideOffset={10}
					collisionPadding={24}
					className="w-56"
				>
					<DropdownMenuLabel>
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">{user.name}</p>
							<p className="text-xs text-muted-foreground capitalize">
								{user.role}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<Link href="/student/account" className="cursor-pointer">
								My Account
								<DropdownMenuShortcut>
									<RiProfileLine />
								</DropdownMenuShortcut>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Button
								type="button"
								variant="ghost"
								className="w-full h-8 cursor-pointer hover:outline-0 hover:ring-0 font-normal hover:font-normal focus-visible:outline-0 focus-visible:ring-0"
								onClick={handleLogout}
							>
								Log out
								<DropdownMenuShortcut>
									<RiLogoutCircleRLine />
								</DropdownMenuShortcut>
							</Button>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return null;
};
export default StudentAvatarDropDown;
