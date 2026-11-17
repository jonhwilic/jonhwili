import Hero from "@/components/Hero";
import AboutIntro from "@/components/home/AboutIntro";
import ClosingCTA from "@/components/home/ClosingCTA";
import FeaturedWork from "@/components/home/FeaturedWork";
import Testimonials from "@/components/home/Testimonials";
import WorkTogether from "@/components/home/WorkTogether";
import TechStack from "@/components/TechStack";
import WhatIDo from "@/components/WhatIDo";

const Index = () => (
	<>
		<Hero />
		<AboutIntro />
		<TechStack />
		<WhatIDo />
		<FeaturedWork />
		<Testimonials />
		<WorkTogether />
		<ClosingCTA />
	</>
);

export default Index;
