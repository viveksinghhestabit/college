import React from "react";
import Header from "@/components/common/Header/index";
import Footer from "@/components/common/Footer";
import BlogDetailsComponent from "@/components/BlogDetailsPage";

const BlogDetailsPage = () => {
  return (
    <>
      <Header />
      <BlogDetailsComponent />
      <Footer />
    </>
  );
};

export default BlogDetailsPage;
