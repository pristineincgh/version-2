interface FullPageLoaderProps {
	message?: string;
}

const FullPageLoader = ({
	message = "Logging out...",
}: FullPageLoaderProps) => {
	return (
		<div className="fixed inset-0 z-100 bg-background/80 backdrop-blur-sm flex items-center justify-center flex-col gap-4">
			<div className="flex flex-col items-center gap-4">
				<div className="loader"></div>
				<p className="text-lg font-medium text-foreground">{message}</p>
			</div>
		</div>
	);
};

export default FullPageLoader;
