import LoginForm from "@/components/forms/LoginForm";
import ImageCarousel from "@/components/LoginImageCarousel";
import FullLogo from "@/components/logo/FullLogo";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
	description: "Login to your account",
};

const LoginPage = () => {
	return (
		<>
			<div className="relative z-20 p-10 grid h-full place-content-center gap-16 lg:gap-24">
				<FullLogo className="mx-auto" />

				<div className="flex flex-col gap-8">
					<div className="text-center">
						<h2 className="text-3xl font-bold dark:text-white">Welcome Back</h2>
						<p className="lg:text-lg text-muted dark:text-muted-foreground">
							Please enter your credentials to access your account.
						</p>
					</div>

					<LoginForm />
				</div>
			</div>
			<div className="hidden lg:block relative overflow-hidden">
				<div className="fixed overflow-hidden -top-20 -right-20 min-[2000px]:-right-32 w-full h-152 min-[2000px]:h-200 max-w-4xl min-[2000px]:max-w-6xl mx-auto my-8 rounded-l-full -rotate-45">
					<ImageCarousel />
				</div>
			</div>
		</>
	);
};

export default LoginPage;
