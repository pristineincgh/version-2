const PublicLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className="relative h-screen bg-[url('/images/login/header-bg.jpg')] bg-cover bg-no-repeat bg-center text-background">
			<div className="absolute inset-0 bg-[url('/images/login/dark-pattern.jpg')] bg-cover bg-no-repeat bg-center mix-blend-overlay opacity-40" />

			<div className="container mx-auto h-full lg:grid lg:grid-cols-2">
				{children}
			</div>
		</section>
	);
};
export default PublicLayout;
