"use client";

import { useState } from "react";
import { getAuthUser } from "@/store/useAuthStore";

const randomImages = [
	"/images/student_overview/1.jpg",
	"/images/student_overview/2.jpg",
	"/images/student_overview/3.jpg",
	"/images/student_overview/4.jpg",
	"/images/student_overview/5.jpg",
	"/images/student_overview/6.jpg",
	"/images/student_overview/7.jpg",
	"/images/student_overview/8.jpg",
	"/images/student_overview/9.jpg",
	"/images/student_overview/10.jpg",
	"/images/student_overview/11.jpg",
	"/images/student_overview/12.jpg",
	"/images/student_overview/13.jpg",
	"/images/student_overview/14.jpg",
	"/images/student_overview/15.jpg",
	"/images/student_overview/16.jpg",
	"/images/student_overview/17.jpg",
	"/images/student_overview/18.jpg",
	"/images/student_overview/19.jpg",
	"/images/student_overview/20.jpg",
	"/images/student_overview/21.jpg",
	"/images/student_overview/22.jpg",
	"/images/student_overview/23.jpg",
];

const OverviewHero = () => {
	const user = getAuthUser();

	const [randomImage] = useState(
		() => randomImages[Math.floor(Math.random() * randomImages.length)]
	);

	return (
		<section
			className="relative h-120 bg-fixed bg-no-repeat bg-cover bg-center"
			style={{ backgroundImage: `url(${randomImage})` }}
		>
			<div className="absolute z-0 inset-0 bg-foreground/80 dark:bg-background/80" />

			<div className="relative z-10 container text-white md:py-10! h-full flex flex-col justify-center space-y-7">
				<p className="text-xl md:text-4xl">Welcome Back 👋</p>
				<h2 className="text-4xl sm:text-7xl font-medium uppercase leading-5 sm:leading-7 lg:leading-8 tracking-[0.2em]">
					{user?.name}
				</h2>
			</div>
		</section>
	);
};
export default OverviewHero;
