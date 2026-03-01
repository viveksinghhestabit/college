import BlogsComponent from "@/components/Blogs";
import SEO from "@/components/Seo";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React from "react";

const BlogsPage = () => {
  return (
    <>
      <SEO pageTitle="Blogs" />
      <Header />
      <BlogsComponent />
      <Footer />
    </>
  );
};

export default BlogsPage;
