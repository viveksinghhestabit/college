import React from "react";
import BreadcrumbSection from "./BreadcrumbSection";
import TopSection from "./TopSection";
import MissionSection from "./MissionSection";
import CounterSection from "../Colleges/CounterSection";
import WhoSection from "./WhoSection";
import TestimonialsSection from "../Home/TestimonialsSection";
import ContactDetails from "../College/ContactDetails";

const AboutComponent = () => {
  return (
    <div>
      <BreadcrumbSection
        imgURL="/assets/images/breadcrumbs/AboutUs.jpeg"
        title="About us"
        subtitle="
Welcome to College Veda – where passion for education meets <br>
personalized guidance, empowering each student's <br> unique journey towards success."
      />
      <TopSection />
      <MissionSection />
      <CounterSection />
      <WhoSection />
      <TestimonialsSection />
      <ContactDetails />
    </div>
  );
};

export default AboutComponent;
