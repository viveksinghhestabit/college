import CollegePredictorComponent from "@/components/CollegePredictor";
import SEO from "@/components/Seo";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React from "react";

const RankPredictorPage = () => {
  return (
    <>
      <SEO pageTitle="College Predictor" />
      <Header />
      <CollegePredictorComponent />
      <Footer />
    </>
  );
};

export default RankPredictorPage;
