import React from "react";
import BreadcrumbSection from "../About/BreadcrumbSection";
import ContactDetails from "../College/ContactDetails";

const ContactComponent = () => {
  return (
    <>
      <BreadcrumbSection
        imgURL="/assets/images/breadcrumbs/contact-us.webp"
        title="Contact us"
        subtitle="Get personalized guidance for your college journey. <br/> Contact us today"
      />
      <div className="mt-5 pt-sm-5">
        <ContactDetails />
      </div>
    </>
  );
};

export default ContactComponent;
