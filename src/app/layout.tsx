import type { Metadata } from "next";
import { Inter, Bubblegum_Sans } from "next/font/google";
import "./globals.css";
import RQueryClientProvider from "@/providers/RQueryClientProvider";
import "react-international-phone/style.css";

// Swiper
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Toaster } from "sonner";

const fontSans = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontHeading = Bubblegum_Sans({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-heading",
});

export const metadata: Metadata = {
	title: {
		template: "%s | Curiosity Cove",
		default: "Curiosity Cove",
	},
	description: "The platform for curious minds.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
			<body
				className={`font-sans antialiased ${fontSans.variable} ${fontHeading.variable}`}
			>
				<Toaster richColors />
				<RQueryClientProvider>{children}</RQueryClientProvider>
			</body>
		</html>
	);
}
