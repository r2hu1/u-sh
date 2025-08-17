import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Feature from "@/components/landing/Feature";
import Pricing from "@/components/landing/Pricing";
import Review from "@/components/landing/Review";

export default function Page() {
	return (
		<main>
			<div className="absolute top-0 z-[-2] h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
			<Hero />
			{/* <Stats />*/}
			{/* <Feature />*/}
			{/* <Pricing />*/}
			{/* <Review/>*/}
		</main>
	);
}
