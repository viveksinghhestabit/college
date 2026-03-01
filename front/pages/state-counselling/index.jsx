import SEO from "@/components/Seo";
import StateCounsellingComponent from "@/components/StateCounselling";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React from "react";

const StateCounsellingPage = () => {
  return (
    <>
      <SEO pageTitle="State Counselling" />
      <Header />
      <StateCounsellingComponent />
      <Footer />
    </>
  );
};

export default StateCounsellingPage;
