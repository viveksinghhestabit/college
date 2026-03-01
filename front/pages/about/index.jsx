import AboutComponent from "@/components/About";
import SEO from "@/components/Seo";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <SEO pageTitle="ABOUT" />
      <Header />
      <AboutComponent />
      <Footer />
    </>
  );
};

export default AboutPage;
