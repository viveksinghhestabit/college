import React, { useEffect, useState } from "react";
import BlogsSidebarSection from "./BlogsSidebarSection";
import BlogsMainSection from "./BlogsMainSection";
import BreadcrumbSection from "../About/BreadcrumbSection";
import { getBlogs } from "@/api";
import Loader from "../common/Loader";

const BlogsComponent = () => {
  const [loading, setLoading] = useState(false);
  const [blogsList, setBlogsList] = useState([]);

  useEffect(() => {
    getBlogsList();
    setLoading(true);
  }, []);

  const getBlogsList = async () => {
    try {
      const res = await getBlogs();
      setBlogsList([...res?.data?.data]);
      setLoading(false);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <>
      <BreadcrumbSection
        imgURL="/assets/images/breadcrumbs/blogs.webp"
        title="Blogs"
        subtitle="Discover expert tips and insights for your college journey.</br>Read our blog!"
      />
      <div className="container-lg">
        <div className="row py-5 p-relative">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="col-lg-8">
                <BlogsMainSection blogs={blogsList} />
              </div>
              <div className="col-lg-4 d-lg-block d-none">
                <BlogsSidebarSection blogs={blogsList} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogsComponent;
