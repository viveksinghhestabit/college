import AllIndiaCutoffComponent from "@/components/AllIndiaCutoff";
import SEO from "@/components/Seo";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React from "react";

const AllIndiaCutoffPage = () => {
  return (
    <>
      <SEO pageTitle="All India Cut-off" />
      <Header />
      <AllIndiaCutoffComponent />
      <Footer />
    </>
  );
};

export default AllIndiaCutoffPage;
