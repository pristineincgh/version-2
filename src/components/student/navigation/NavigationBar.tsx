"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { studentNavLinks } from "@/constants/nav-list-items";
import StudentAvatarDropDown from "./StudentAvatarDropDown";
import StudentMobileMenuBtn from "./StudentMobileMenuBtn";
import StudentMobileNavMenu from "./StudentMobileNavMenu";
import FullLogo from "@/components/logo/FullLogo";
import LogoIcon from "@/components/logo/LogoIcon";
import dynamic from "next/dynamic";
import NotificationMenu from "@/components/NotificationMenu";
import FullPageLoader from "@/components/loaders/FullPageLoader";

const SCROLL_THRESHOLD = 10;

const ThemeToggle = dynamic(
	() => import("@/components/ThemeToggleClient").then((m) => m.ThemeToggle),
	{ ssr: false }
);

const NavigationBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const { scrollY } = useScroll();
	const toggleMenu = () => setIsOpen((prev) => !prev);

	const pathname = usePathname();

	// Helper function to check if a link should be active
	const isActive = (href: string, title?: string) => {
		if (title === "Dashboard") {
			return pathname === href;
		}
		return pathname.startsWith(href);
	};

	useMotionValueEvent(scrollY, "change", (latest) => {
		setIsScrolled(latest > SCROLL_THRESHOLD);
	});
	return (
		<>
			{isLoggingOut && <FullPageLoader />}

			<nav
				className={cn(
					"fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-md transition-colors duration-300 ease-in-out py-2",
					isScrolled ? "shadow-md" : "shadow-none",
					isOpen ? "h-screen bg-background!" : "h-auto"
				)}
			>
				<div className="container flex items-center justify-between">
					<div className="min-[830px]:hidden lg:flex">
						<FullLogo className="w-[120px] lg:w-[150px]" />
					</div>
					<div className="hidden min-[830px]:flex lg:hidden">
						<LogoIcon />
					</div>

					<ul className="hidden min-[830px]:flex rounded-full items-center space-x-4">
						{studentNavLinks.map((link) => (
							<li key={link.title}>
								<Link
									href={link.href}
									className={cn(
										"flex px-4 py-2 rounded-full text-sm transition-colors duration-200",
										isActive(link.href, link.title)
											? "bg-primary text-primary-foreground dark:text-foreground"
											: "hover:bg-muted dark:hover:bg-muted-foreground/10 text-muted-foreground"
									)}
								>
									{link.title}
								</Link>
							</li>
						))}
					</ul>

					<div className="flex items-center gap-4">
						<ThemeToggle />

						<NotificationMenu />

						<StudentAvatarDropDown
							onLogoutStart={() => setIsLoggingOut(true)}
							onLogoutEnd={() => setIsLoggingOut(false)}
						/>

						<StudentMobileMenuBtn
							isOpen={isOpen}
							toggleMenu={toggleMenu}
							isScrolled={isScrolled}
						/>
					</div>
				</div>

				<AnimatePresence>
					{isOpen && (
						<StudentMobileNavMenu
							toggleMenu={toggleMenu}
							navLinks={studentNavLinks}
							onLogoutStart={() => setIsLoggingOut(true)}
							onLogoutEnd={() => setIsLoggingOut(false)}
						/>
					)}
				</AnimatePresence>
			</nav>
		</>
	);
};
export default NavigationBar;
