"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme();
	const [isHovering, setIsHovering] = useState(false);
	const [sparkles, setSparkles] = useState<
		{
			x: number;
			y: number;
			duration: number;
			delay: number;
		}[]
	>([]);

	const handleHoverStart = () => {
		setIsHovering(true);
		const newSparkles = Array.from({ length: 6 }).map(() => ({
			x: Math.random() * 40 - 20,
			y: Math.random() * 40 - 20,
			duration: 0.8 + Math.random() * 0.5,
			delay: Math.random() * 0.2,
		}));
		setSparkles(newSparkles);
	};

	const handleHoverEnd = () => {
		setIsHovering(false);
		setSparkles([]);
	};

	const toggleTheme = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};

	return (
		<div>
			<div className="hidden lg:flex space-x-2 rounded-full border bg-muted p-1">
				<Button
					size="icon"
					variant={resolvedTheme === "light" ? "secondary" : "ghost"}
					className={cn(
						"rounded-full",
						resolvedTheme === "light"
							? "bg-background shadow hover:bg-background"
							: ""
					)}
					onClick={() => setTheme("light")}
				>
					<Sun className="" />
				</Button>
				<Button
					size="icon"
					variant={resolvedTheme === "dark" ? "secondary" : "ghost"}
					className={cn(
						"rounded-full",
						resolvedTheme === "dark" && "dark:bg-foreground dark:text-muted"
					)}
					onClick={() => setTheme("dark")}
				>
					<Moon className="" />
				</Button>
			</div>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<motion.div
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onHoverStart={handleHoverStart}
							onHoverEnd={handleHoverEnd}
							className="relative lg:hidden"
						>
							<Button
								variant="outline"
								size="icon"
								onClick={toggleTheme}
								className={cn(
									"rounded-full border-2 bg-transparent text-muted-foreground hover:bg-primary/10 hover:text-primary"
								)}
								aria-label="Toggle theme"
							>
								<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
								<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

								{/* Animated stars/sparkles that appear on hover */}
								{isHovering && (
									<>
										{sparkles.map((sparkle, i) => (
											<motion.div
												key={i}
												className="absolute text-yellow-400 dark:text-blue-400"
												initial={{ opacity: 0, scale: 0 }}
												animate={{
													opacity: [0, 1, 0],
													scale: [0, 1, 0],
													x: sparkle.x,
													y: sparkle.y,
												}}
												transition={{
													duration: sparkle.duration,
													delay: sparkle.delay,
													ease: "easeOut",
												}}
											>
												<Sparkles size={8} />
											</motion.div>
										))}
									</>
								)}
							</Button>
						</motion.div>
					</TooltipTrigger>
					<TooltipContent>
						Switch to {resolvedTheme === "dark" ? "light" : "dark"} mode
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}
