"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HiMiniUser } from "react-icons/hi2";
import { RiProfileLine, RiLogoutCircleRLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthUser } from "@/store/useAuthStore";
import { useLogout } from "@/services/auth/mutations";

interface MobileNavProps {
	toggleMenu: () => void;
	navLinks: Array<{ title: string; href: string; icon: React.ReactNode }>;
	onLogoutStart: () => void;
	onLogoutEnd: () => void;
}

const StudentMobileNavMenu = ({
	toggleMenu,
	navLinks,
	onLogoutStart,
	onLogoutEnd,
}: MobileNavProps) => {
	const pathname = usePathname();
	const isActive = (href: string) => pathname === href;

	const user = getAuthUser();

	// method to handle logout
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

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
			className="relative mt-3 text-foreground h-screen"
		>
			<div className="p-5 md:hidden border-y flex items-center gap-4">
				<Avatar className="w-12 h-12">
					<AvatarImage src={user?.picture} />
					<AvatarFallback>
						<HiMiniUser className="text-primary size-8" />
					</AvatarFallback>
				</Avatar>
				<div>
					<h2 className="text-lg font-bold">{user?.name}</h2>
					<p className="text-sm text-muted-foreground capitalize">
						{user?.role}
					</p>
				</div>
			</div>

			<ul>
				{navLinks.map((link) => (
					<li key={link.title}>
						<Link
							href={link.href}
							onClick={toggleMenu}
							className={cn(
								"p-4 flex justify-between items-center gap-5 text-xl font-medium transition-colors duration-300 ease-in-out",
								isActive(link.href)
									? "text-primary font-bold"
									: "hover:bg-muted dark:hover:bg-muted-foreground/10 text-muted-foreground"
							)}
						>
							<span>{link.title}</span>
							{link.icon}
						</Link>
					</li>
				))}

				<li className="md:hidden">
					<Link
						href="/student/profile"
						onClick={toggleMenu}
						className={cn(
							"p-4 flex justify-between items-center gap-5 text-xl font-medium transition-colors duration-300 ease-in-out",
							isActive("/student/profile")
								? "text-primary font-bold"
								: "hover:bg-muted dark:hover:bg-muted-foreground/10 text-muted-foreground"
						)}
					>
						<span>My Profile</span>
						<RiProfileLine className="size-6" />
					</Link>
				</li>
			</ul>

			<div className="absolute bottom-28 md:bottom-44 flex justify-center items-center gap-4 w-full">
				<Button
					type="button"
					variant="destructive"
					onClick={handleLogout}
					className="w-60 h-14 text-lg gap-6"
				>
					<span>Log Out</span>
					<RiLogoutCircleRLine className="size-5" />
				</Button>
			</div>
		</motion.div>
	);
};

export default StudentMobileNavMenu;
