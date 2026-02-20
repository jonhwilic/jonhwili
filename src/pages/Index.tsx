import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import WhatIDo from "@/components/WhatIDo";

const Index = () => {
  return (
    <>
      <Hero />
      <div className="glow-separator" />
      <TechStack />
      <div className="glow-separator" />
      <WhatIDo />
    </>
  );
};

export default Index;
