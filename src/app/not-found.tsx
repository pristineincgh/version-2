import NotFoundSection from "@/components/NotFoundSection";
import Image from "next/image";

const StudentNotFoundPage = () => {
	return (
		<section className="relative h-screen">
			<Image
				src="/images/not-found.jpg"
				alt="Service Cover"
				fill
				className="object-cover"
				priority
			/>
			<div className="absolute z-0 inset-0 bg-foreground/80 dark:bg-background/80" />
			<div className="container px-5 h-full flex flex-col items-center justify-center relative z-10">
				<h1 className="text-4xl sm:text-5xl font-bold text-white text-center">
					Page Not Found
				</h1>

				<div className="text-center text-muted dark:text-muted-foreground">
					<p className="text-xl">
						Sorry, the page you are looking for does not exist. Please check the
						URL and try again.
					</p>
				</div>

				<NotFoundSection />
			</div>
		</section>
	);
};
export default StudentNotFoundPage;
