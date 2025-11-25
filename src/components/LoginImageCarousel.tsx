"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

const slides = [
	{
		image: "/images/login/happy-kid-learning.webp",
		alt: "Happy Kid Learning",
		title: "Unlock Creativity with Live Coding Lessons!",
		description:
			"Interactive, fun, and expert-led classes to turn your child into a coding whiz! 🚀",
	},
	{
		image: "/images/login/little-boy-doing-school-online.jpg",
		alt: "Little Boy Doing School Online",
		title: "Your Coding Journey, Made Just for You!",
		description:
			"Tailored roadmaps to match your child's pace and interests. No two learners are alike! 📚✨",
	},
	{
		image: "/images/login/kids-learning.png",
		alt: "Kids Learning",
		title: "Parents, Stay in the Loop with Ease!",
		description:
			"Track progress, set goals, and celebrate milestones together. Learning is a team effort! 👨‍👩‍👧‍👦📊",
	},
	{
		image: "/images/login/kids-learning-1.png",
		alt: "Kids Learning 1",
		title: "AI-Powered Tutoring: Learn The Smart Way!",
		description:
			"Get instant help, adaptive challenges, and real-time feedback—just like a personal coach! 🤖💡",
	},
	{
		image: "/images/login/kids-learning-3.jpg",
		alt: "Kids Learning 3",
		title: "Where Kids Fall in Love with Learning!",
		description:
			"Engaging lessons that make coding exciting. Start today! 🎮🚀",
	},
];

const ImageCarousel = () => {
	return (
		<div className="rotate-45 min-w-240 min-[2000px]:w-392 h-188 min-[2000px]:h-280 relative overflow-hidden">
			<Swiper
				spaceBetween={30}
				effect={"fade"}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				modules={[Autoplay, EffectFade, Pagination]}
				className="login-carousel"
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={index}>
						<div className="relative h-full w-full">
							<div className="hidden lg:block absolute inset-0 z-10 bg-black/70" />
							<Image
								src={slide.image}
								alt={slide.alt}
								fill
								priority
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								className="object-cover object-center"
							/>

							<div className="hidden absolute w-full top-[60%] -translate-y-1/2 rounded-2xl z-20 lg:flex flex-col p-10 text-background">
								<h1 className="text-3xl min-[2000px]:text-5xl font-bold text-white">
									{slide.title}
								</h1>
								<p className="text-xl dark:text-muted-foreground max-w-lg min-[2000px]:max-w-3xl">
									{slide.description}
								</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ImageCarousel;
