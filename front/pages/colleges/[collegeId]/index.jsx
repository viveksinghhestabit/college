import React from "react";
import Header from "@/components/common/Header/index";
import Footer from "@/components/common/Footer";
import CollegeDetailsComponent from "@/components/CollegeDetails";
import FaqSection from "@/components/Colleges/FaqSection";

const CollegeDetailsPage = () => {
  return (
    <>
      <Header />
      <CollegeDetailsComponent />
      <FaqSection />
      <Footer />
    </>
  );
};

export default CollegeDetailsPage;
