import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [
			new URL(
				"https://storage.googleapis.com/curiosity-cove-dev-b485e.firebasestorage.app/roadmap_banners/**"
			),
			new URL(
				"https://storage.googleapis.com/curiosity-cove-prod-99217.firebasestorage.app/roadmap_banners/**"
			),
			new URL("https://images.ctfassets.net/**"),
			new URL("https://static-00.iconduck.com/**"),
			new URL("https://dummyimage.com/**"),
			new URL("https://placehold.co/**"),
		],
	},
};

export default nextConfig;
