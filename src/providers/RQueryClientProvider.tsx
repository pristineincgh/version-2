"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type * as React from "react";

export default function RQueryClientProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 2 * 60 * 1000, // 2 mins
				gcTime: 5 * 60 * 1000, // 5 mins
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{/* <ReactQueryDevtools initialIsOpen={false}  /> */}
		</QueryClientProvider>
	);
}
