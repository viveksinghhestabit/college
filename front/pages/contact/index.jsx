import ContactComponent from "@/components/Contact";
import SEO from "@/components/Seo";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React from "react";

const ContactPage = () => {
  return (
    <>
      <SEO pageTitle="Contact" />
      <Header />
      <ContactComponent />
      <Footer />
    </>
  );
};

export default ContactPage;
