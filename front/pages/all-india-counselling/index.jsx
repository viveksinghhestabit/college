import AllIndiaCounsellingComponent from "@/components/AllIndiaCounselling";
import SEO from "@/components/Seo";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React from "react";

const AllIndiaCounsellingPage = () => {
  return (
    <>
      <SEO pageTitle="All India Counselling" />
      <Header />
      <AllIndiaCounsellingComponent />
      <Footer />
    </>
  );
};

export default AllIndiaCounsellingPage;
