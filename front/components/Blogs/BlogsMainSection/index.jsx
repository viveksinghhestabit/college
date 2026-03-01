import React, { useState } from "react";
import styles from "./BlogsMainSection.module.scss";
import Image from "next/image";
import Link from "next/link";
import { GetFirstParaFromRichText } from "@/utils/helper";
import moment from "moment";
import BlogPagination from "./BlogPagination";

const BlogsMainSection = ({ blogs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;
  const indexOfLastPage = currentPage * blogsPerPage;
  // index of first page
  const indexOfFirstPage = indexOfLastPage - blogsPerPage;
  // current blogs
  const currentBlogs = blogs?.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className={styles.blogsContainer}>
      {currentBlogs?.map((item, index) => (
        <div key={`blog-${index}`} className={`${styles.blogContainer} mb-4`}>
          <Image
            src={item?.blogPic}
            width="0"
            height="0"
            className="w-100 h-auto"
            sizes="100vw"
            alt="brand-logo"
            draggable={false}
          />
          <div className="py-4">
            <div
              className={`${styles.blogDetails} d-flex align-items-center justify-content-start gap-4 mb-4`}
            >
              <div className={styles.detailContainer}>
                <i class="far fa-calendar-check me-1" />{" "}
                {moment(item?.createdAt)?.format("LLLL")}
              </div>
              <div className={`${styles.detailContainer} text-uppercase`}>
                <i class="far fa-user me-1" /> {item?.author}
              </div>
            </div>
            <div className={`${styles.blogTitle} mb-3`}>{item?.title}</div>
            <div
              className={`${styles.blogData} mb-3`}
              dangerouslySetInnerHTML={{
                __html: GetFirstParaFromRichText(item?.body),
              }}
            ></div>
            <Link
              href={`/blogs/${item?.slug}`}
              className={`${styles.readMoreButton} btn btn-primary`}
            >
              Read more
            </Link>
          </div>
        </div>
      ))}
      {blogs.length > blogsPerPage && (
        <BlogPagination
          blogPerPage={blogsPerPage}
          toltalBlogs={blogs.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </div>
  );
};

export default BlogsMainSection;
