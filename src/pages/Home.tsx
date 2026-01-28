import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import TestimonialSection from "@/components/home/TestimonialSection";
import CTASection from "@/components/home/CTASection";
import FAQSection from "@/components/home/FAQSection";
import PricingPreview from "@/components/home/PricingPreview";
import PartnersSection from "@/components/home/PartnersSection";
import IndustriesMarquee from "./IndustriesMarquee";

const Home = () => {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      {/* <PricingPreview /> */}
      <IndustriesMarquee />
      <TestimonialSection />
      <PartnersSection />
      <FAQSection />
      <CTASection />
    </>
  );
};

export default Home;
