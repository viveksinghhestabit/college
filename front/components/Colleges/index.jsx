import React from "react";
import FaqSection from "./FaqSection";
import CollegeList from "./CollegeList";
import CounterSection from "./CounterSection";

const CollegesComponent = () => {
  return (
    <>
      <CollegeList />
      <CounterSection />
      <FaqSection />
    </>
  );
};

export default CollegesComponent;
