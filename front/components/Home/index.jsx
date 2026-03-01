import React from "react";
import HeroSection from "./HeroSection";
import BrandsSection from "./BrandsSection";
import AboutSection from "./AboutSection";
import ExploreSection from "./ExploreSection";
import CollegesSection from "./CollegesSection";
import TestimonialsSection from "./TestimonialsSection";
import BlogsSection from "./BlogsSection";
import FormSection from "./FormSection";
import FaqSection from "../Colleges/FaqSection";

const HomeComponent = ({ showcase }) => {
  return (
    <>
      <HeroSection data={showcase} />
      {/* <BrandsSection /> */}
      <AboutSection />
      <ExploreSection />
      <CollegesSection />
      <TestimonialsSection />
      <FormSection />
      <BlogsSection />
      <FaqSection />
    </>
  );
};

export default HomeComponent;
