// import ChatFloatingButton from "@/components/shared/chat/ChatFloatingButton";
// import LoggingOutWrapper from "@/components/shared/LoggingOutWrapper";
import NavigationBar from "@/components/student/navigation/NavigationBar";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
// import SessionIdleProvider from "@/providers/SessionIdleProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Student",
};

const StudentDashboardLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="light">
			<AuthProvider>
				{/* <SessionIdleProvider> */}
				{/* <LoggingOutWrapper> */}
				<NavigationBar />

				<main className="mt-23">{children}</main>
				{/* <ChatFloatingButton /> */}
				{/* </LoggingOutWrapper> */}
				{/* </SessionIdleProvider> */}
			</AuthProvider>
		</ThemeProvider>
	);
};
export default StudentDashboardLayout;
