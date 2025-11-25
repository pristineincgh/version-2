import { cn } from "@/lib/utils";
import Image from "next/image";

interface HeroProps {
	title: string;
	description: string;
	iconPath: string;
	iconAlt: string;
	iconWidth?: number;
	iconHeight?: number;
	emoji: string;
	gradientFrom?: string;
	gradientTo?: string;
}

const HeroSection: React.FC<HeroProps> = ({
	title,
	description,
	iconPath,
	iconAlt,
	iconWidth = 50,
	iconHeight = 50,
	emoji,
	gradientFrom = "from-purple-600",
	gradientTo = "to-blue-600",
}) => {
	return (
		<section
			className={cn(
				"py-8 text-white overflow-hidden",
				`bg-linear-to-r ${gradientFrom} ${gradientTo}`
			)}
		>
			<div className="container relative">
				<div className="relative z-10 space-y-4">
					<h1 className="text-3xl sm:text-6xl font-bold flex justify-between md:justify-start items-center gap-6">
						<span>{title}</span>
						<div>
							<Image
								src={iconPath}
								width={iconWidth}
								height={iconHeight}
								alt={iconAlt}
							/>
						</div>
					</h1>
					<p className="md:text-xl opacity-90">{description}</p>
				</div>
				{emoji && (
					<div className="hidden md:block absolute right-8 top-4 text-8xl opacity-20">
						{emoji}
					</div>
				)}
			</div>
		</section>
	);
};

export default HeroSection;
