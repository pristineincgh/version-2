"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { redirectBasedOnRole } from "@/lib/auth";
import { getAuthUser } from "@/store/useAuthStore";
import { Button } from "./ui/button";

const NotFoundSection = () => {
	const router = useRouter();

	const user = getAuthUser();

	const handleGoBack = () => {
		if (user) {
			router.push(redirectBasedOnRole(user.role));
		} else {
			router.push("/auth");
		}
	};

	return (
		<div className="flex justify-center">
			<Button className="mt-8" onClick={handleGoBack}>
				<ChevronLeft className="mr-2" />
				Back to Home
			</Button>
		</div>
	);
};
export default NotFoundSection;
